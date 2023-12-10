import { google } from 'googleapis';
import { readFileSync, writeFileSync } from 'fs';
import admin from 'firebase-admin';
import readline from 'readline';

// Load client secrets from a local file
const content = readFileSync('keys/client_secret.json');
const credentials = JSON.parse(content);

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  try {
    const token = readFileSync('keys/token.json');
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  } catch (err) {
    return getNewToken(oAuth2Client, callback);
  }
}

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert('keys/firebase_credentials.json')
});

const adminDb = admin.firestore();
adminDb.settings({ ignoreUndefinedProperties: true });

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
    
        // Store the token to disk for later program executions
        writeFileSync('keys/token.json', JSON.stringify(token));
        console.log('Token stored to', 'keys/token.json');
        callback(oAuth2Client);
      });
    });
  }
  

async function transferData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
  
    try {
      const spreadsheetId = '1gH3cC1s7ExB-B_TQCA_OxwXlHfqztmsLAPOBKt3tKyc';
      const range = 'Sheet1!A2:T';
  
      const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
      const rows = response.data.values;
  
      if (rows.length) {
        rows.forEach((row, index) => {
          const docRef = adminDb.collection('artworksData').doc(`doc_${index}`);
          const [date, month, year] = row[1].split('/').map(part => parseInt(part, 10));
          const formattedDate = new Date(year, month - 1, date);

          docRef.set({
            id: row[0],
            date: admin.firestore.Timestamp.fromDate(formattedDate),
            title: row[2],
            caption: {
               text: row[3],
               type: row[4]
            },
            medium: row[5],
            file1: {
               link: row[6],
               id: row[7],
               type: row[8]
            },
            file2: {
               link: row[9],
               type: row[10]
            },
            file3: {
               link: row[11],
               type: row[12]
            },
            tags: {
               a: row[13],
               b: row[14],
               c: row[15],
               d: row[16]
            },
            location: row[17],
            client: row[18]

          });
        });
        console.log('Data transfer to Firestore completed.');
      } else {
        console.log('No data found in the Google Sheet.');
      }
    } catch (err) {
      console.error('The API returned an error: ', err);
    }
}

// Run the script by invoking the main function
authorize(credentials, transferData);
