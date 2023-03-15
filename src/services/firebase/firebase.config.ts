import dotenv from 'dotenv';

dotenv.config();

export const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// TEMPORAL HASTA VERIFICAR QUE FUNCIONE EL .ENV:
// export const firebaseConfig = {
//   apiKey: 'AIzaSyCCAEEdp1iC-fcQxaQLvBxH_hmogjjvqsw',
//   authDomain: 'social-network-challenge.firebaseapp.com',
//   projectId: 'social-network-challenge',
//   storageBucket: 'social-network-challenge.appspot.com',
//   messagingSenderId: '93609149558',
//   appId: '1:93609149558:web:4795cdcbe7801e20c98b57',
// };
