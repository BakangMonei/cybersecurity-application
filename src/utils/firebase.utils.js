import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, addDoc, query, where, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgEuQwdK9L8Ch-DlbamBDRtk-Nq7LXHqg",
  authDomain: "cybersecurity-as-1714925604532.firebaseapp.com",
  databaseURL: "https://cybersecurity-as-1714925604532-default-rtdb.firebaseio.com",
  projectId: "cybersecurity-as-1714925604532",
  storageBucket: "cybersecurity-as-1714925604532.appspot.com",
  messagingSenderId: "645428823224",
  appId: "1:645428823224:web:a316fab1b9e77ecc18a04d",
  measurementId: "G-JDQ4FYNSZT",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(firebaseApp);

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP in Firestore
const storeOTP = async (uid, otp) => {
  try {
    await setDoc(doc(db, "otp", uid), { otp, createdAt: new Date() });
  } catch (error) {
    console.error("Error storing OTP: ", error);
  }
};

export const signUpUser = async (userData) => {
  const { email, username, password } = userData;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    await setDoc(doc(db, "users", user.uid), { email, username, uid: user.uid });
    return user.uid;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");
      await sendEmailVerification(user);
      return;
    }

    const otp = generateOTP();
    await storeOTP(user.uid, otp);

    // Here you can send the OTP to the user's email using a Cloud Function

    return user;
  } catch (error) {
    console.error("Error logging in: ", error);
  }
};

export const verifyOTP = async (uid, inputOtp) => {
  try {
    const docRef = doc(db, "otp", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { otp } = docSnap.data();
      if (otp === inputOtp) {
        await deleteDoc(docRef); // Delete OTP after verification
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error verifying OTP: ", error);
  }
};

export const checkIfEmailExists = async (newEmail) => {
  let doesExist = false;
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const { email } = doc.data();
      if (newEmail === email) {
        doesExist = true;
      }
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
  return doesExist;
};
