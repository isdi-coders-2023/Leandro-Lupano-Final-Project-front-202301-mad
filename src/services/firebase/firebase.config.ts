import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export async function firebaseUrl(fileName: string, filePicture: File) {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const pictureName: string = `${fileName}.png`;

  const fileUserPicture = filePicture;

  const storageRef = ref(storage, pictureName);

  await uploadBytes(storageRef, fileUserPicture);

  const urlUserPicture = await getDownloadURL(storageRef);

  return urlUserPicture;
}
