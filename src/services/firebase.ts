// firebase.ts

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaBarf3x_zHFkXU3pNcG1YtpSv26yszao",
  authDomain: "mice-in-a-maze.firebaseapp.com",
  projectId: "mice-in-a-maze",
  storageBucket: "mice-in-a-maze.appspot.com",
  messagingSenderId: "463805920666",
  appId: "1:463805920666:web:530219f5b4ae412b99f623",
  measurementId: "G-8GGDLQZE9X",
};

const app = initializeApp(firebaseConfig);

let analytics;
let auth: Auth;
let provider: GoogleAuthProvider;
if (typeof window !== "undefined" && "measurementId" in firebaseConfig) {
  analytics = getAnalytics(app);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
}

export { app, analytics, auth, provider };
