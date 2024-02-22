import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA7wTAVl42cojAHPwdS7jPvDj1hRkCsvXk',
  authDomain: 'nwitter-reloaded-820c3.firebaseapp.com',
  projectId: 'nwitter-reloaded-820c3',
  storageBucket: 'nwitter-reloaded-820c3.appspot.com',
  messagingSenderId: '747849105093',
  appId: '1:747849105093:web:0a95ae28445cf7bd72faac',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
