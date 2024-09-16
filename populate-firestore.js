const admin = require('firebase-admin');
const serviceAccount = require('');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const testData = [
  { name: 'Document 1', value: 'Test 1' },
  { name: 'Document 2', value: 'Test 2' },
  { name: 'Document 3', value: 'Test 3' },
  { name: 'Document 4', value: 'Test 4' },
  { name: 'Document 5', value: 'Test 5' }
];

async function populateFirestore() {
  const collectionName = 'items';
  
  for (const doc of testData) {
    await db.collection(collectionName).add(doc);
    console.log(`Added document: ${doc.name}`);
  }
  
  console.log('Firestore population complete!');
}

populateFirestore().then(() => process.exit());