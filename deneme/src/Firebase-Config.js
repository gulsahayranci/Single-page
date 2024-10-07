import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDm8czqiAFSynFngNM2yxNya2DMOQxXuHo",
  authDomain: "fir-a836a.firebaseapp.com",
  projectId: "fir-a836a",
  storageBucket: "fir-a836a.appspot.com",
  messagingSenderId: "329948122291",
  appId: "1:329948122291:web:28b0b0c95131167265b4c6"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export {
  database,
  storage,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};