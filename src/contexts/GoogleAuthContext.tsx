// src/contexts/GoogleAuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { app, auth, provider } from "@/services/firebase";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface GoogleAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  signIn: () => {};
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(
  undefined
);

interface GoogleAuthProviderProps {
  children: ReactNode;
}

export const GoogleAuthProvider: React.FC<GoogleAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        // Attempt to sign in with Google
        const result = await signInWithEmailAndPassword(auth, email, password);
        // You can access the signed-in user via result.user
        // Google has very cool naming for their databases. Lovely for development.
        const db = getFirestore(app);
        const user = result.user;
        const docRef = await getDoc(doc(db, "users", user.uid));
        console.log(user);
        if (!docRef.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.email,
          }).catch((err) => {
            console.log(err);
          });
          const userData = docRef.data();
          setUser({
            ...user,
            displayName: userData?.displayName, // Set from Firestore document
            // Include any other user properties you need from Firestore
          });
        } else {
          await updateDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.email,
          }).catch((err) => {
            console.log(err);
          });
          const userData = docRef.data();
          setUser({
            ...user,
            displayName: userData.displayName, // Set from Firestore document
            // Include any other user properties you need from Firestore
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Google has very cool naming for their databases. Lovely for development.
      const db = getFirestore(app);
      const user = result.user;
      const docRef = await getDoc(doc(db, "users", user.uid));
      if (!docRef) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.displayName,
        }).catch((err: any) => {
          console.log(err);
        });
        console.log("User not found. Setting new user in the firestore");
      }
      console.log("User found. No need to set a doc");
    } catch (error) {
      // Handle errors here, such as displaying a notification
      console.error(error);
    }
  };

  const createUser = useCallback(async (email: any, password: any) => {
    setLoading(true);
    try {
      // Attempt to sign in with Google
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // You can access the signed-in user via result.user
      // Google has very cool naming for their databases. Lovely for development.
      const db = getFirestore(app);
      const user = result.user;
      const docRef = await getDoc(doc(db, "users", user.uid));
      console.log(user);
      if (!docRef.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.email,
        }).catch((err) => {
          console.log(err);
        });

        const userData = docRef.data();
        setUser({
          ...user,
          displayName: userData?.displayName, // Set from Firestore document
          // Include any other user properties you need from Firestore
        });
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          email: user.email,
          displayName: user.email,
        }).catch((err) => {
          console.log(err);
        });
        const userData = docRef.data();
        setUser({
          ...user,
          displayName: userData.displayName, // Set from Firestore document
          // Include any other user properties you need from Firestore
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GoogleAuthContext.Provider
      value={{ user, loading, signInWithEmail, createUser, signIn }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
  }
  return context;
};
