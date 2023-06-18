// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  setDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_API_KEY,
  authDomain: "mdb-server-42526.firebaseapp.com",
  projectId: "mdb-server-42526",
  storageBucket: "mdb-server-42526.appspot.com",
  messagingSenderId: "607762293979",
  appId: "1:607762293979:web:02185ec1c402d76c2f98fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
// Create a reference to the watchlist collection
export const WatchlistDb = collection(db, "watchlist");

// Function to get the watchlist from the database
export const getDbCollection = async (setItem) => {
  try {
    const data = await getDocs(WatchlistDb);
    const filteredData = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("watchlist data",filteredData);
    setItem(filteredData);
  } catch (err) {
    console.log(err);
  }
};

// Function to delete an item from the watchlist
export const deleteDbItem = async (id) => {
  const itemDoc = doc(db, "watchlist", id);
  await deleteDoc(itemDoc);
};

// Function to add an item to the watchlist
export const addDbItem = async (movie) => {
  await addDoc(WatchlistDb, {
    ...movie,
    movie_id: movie.id,
  });
};


