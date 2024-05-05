import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, getDocs, addDoc, collection } from "firebase/firestore";

import sha256 from "crypto-js/sha256";

const firebaseConfig = {
  apiKey: "AIzaSyAgEuQwdK9L8Ch-DlbamBDRtk-Nq7LXHqg",
  authDomain: "cybersecurity-as-1714925604532.firebaseapp.com",
  databaseURL:
    "https://cybersecurity-as-1714925604532-default-rtdb.firebaseio.com",
  projectId: "cybersecurity-as-1714925604532",
  storageBucket: "cybersecurity-as-1714925604532.appspot.com",
  messagingSenderId: "645428823224",
  appId: "1:645428823224:web:a316fab1b9e77ecc18a04d",
  measurementId: "G-JDQ4FYNSZT",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(firebaseApp);

//check if the username exists in the database
export const checkIfUsernameExists = async (newUsername) => {
  let doesExist = false;
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const { username } = doc.data();
      if (newUsername === username) {
        doesExist = true;
      }
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
  return doesExist;
};

export const signUpUser = async (userData) => {
  const { username, password } = userData;
  const passwordHash = sha256(password).toString();
  try {
    const docRef = await addDoc(collection(db, "cyber_assignment"), {
      username,
      password: passwordHash,
      passwordChanges: 0,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
