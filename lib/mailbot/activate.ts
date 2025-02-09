import { google } from 'googleapis';
import { db } from "@/lib/db";
import { mailbots, users } from "@/lib/db/schema";
import { eq } from 'drizzle-orm';

interface WatchResponse {
  historyId: string;
  expiration: string;
  topicName: string;
}
async function getGmailClient(userId: string) {
  // Get the user's session from NextAuth
  const result = await db.query.users.findMany(
    {
      where: eq(users.id, userId),
      with: {
        accounts: true,
      }
    }
  )
  const userResult = result[0]
  if (!userResult?.id) {
    throw Error(`No user found with id ${userId}`)
  }

  // Get the session for this user

  const accessToken = userResult.accounts[0].access_token // Assuming a user has only one account at the moment...
  if (!accessToken) {
    throw new Error('No access token found in account');
  }

  const options = {
    version: 'v1' as const,
    auth: accessToken
  }
  //TODO: add refresh token logic here... 
  //P.S. I hate refresh token logic...
  const res = google.gmail(options)
  return res
}

async function activate(mailbotId: string) {
  // Get mailbot info from database
  const result = await db.select()
    .from(mailbots)
    .where(eq(mailbots.id, mailbotId));

  if (result.length < 1) {
    throw Error(`No mailbots found with id: ${mailbotId}`)
  }

  const mailbot = result[0];
  const userId = mailbot.userId;

  try {
    const gmail = await getGmailClient(userId);

    // Set up Gmail push notifications
    const watchResponse = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        topicName: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/topics/${process.env.PUBSUB_TOPIC}`,
        labelIds: ['INBOX']
      }
    });

    // Store watch details in database
    await db
      .update(mailbots)
      .set({
        watchHistoryId: watchResponse.data.historyId,
        watchExpiration: new Date(Number(watchResponse.data.expiration)),
      })
      .where(eq(mailbots.id, mailbotId));

    return watchResponse.data;
  } catch (error) {
    console.error('Error setting up Gmail watch:', error);
    throw error;
  }
}

// Function to handle incoming email notifications
async function handleEmailNotification(historyId: string, mailbotId: string) {
  const mailbot = await db.select()
    .from(mailbots)
    .where(eq(mailbots.id, mailbotId))
    .then(results => results[0]);

  if (!mailbot?.watchHistoryId) {
    throw new Error('No watch history ID found for mailbot');
  }

  try {
    const gmail = await getGmailClient(mailbot.userId);

    // Get history of changes since last check
    const history = await gmail.users.history.list({
      userId: 'me',
      startHistoryId: mailbot.watchHistoryId,
      historyTypes: ['messageAdded']
    });

    if (!history.data.history) return; //TODO: Ahh.. this could be a problem maybe log something ?

    // Process new messages
    for (const record of history.data.history) {
      if (record.messagesAdded) {
        for (const messageAdded of record.messagesAdded) {

          if (!messageAdded?.message?.id) throw Error("Wtf no id ? Is the whole msg is missing ?") // I have no idea when would this happen...

          const messageId = messageAdded.message.id;

          const message = await gmail.users.messages.get({
            userId: 'me',
            id: messageId
          });


          //TODO:  Process Email here 
          console.log('New email received:', {
            id: message.data.id,
            threadId: message.data.threadId,
            body: message.data.payload?.body
          });
        }
      }
    }

    // Update the latest history ID
    await db
      .update(mailbots)
      .set({ watchHistoryId: historyId })
      .where(eq(mailbots.id, mailbotId));

  } catch (error) {
    console.error('Error processing email notification:', error);
    throw error;
  }
}

export { activate, handleEmailNotification };
