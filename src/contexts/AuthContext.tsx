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

import { app, auth, provider, db } from "@/services/firebase";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Player } from "@/types/Player";

interface AuthContextType {
  user: User | null;
  player: Player | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  createUser: (email: string, password: string) => Promise<void>;
  signIn: () => {};
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface GoogleAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<GoogleAuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
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

        const user = result.user;
        const docRef = await getDoc(doc(db, "players", user.uid));
        console.log(user);
        if (!docRef.exists()) {
          await setDoc(doc(db, "players", user.uid), {
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
          await updateDoc(doc(db, "players", user.uid), {
            email: user.email,
            displayName: user.email,
          }).catch((err) => {
            console.log(err);
          });

          const userData = docRef.data();
          setUser({
            ...user,
            displayName: userData.displayName,
            // Set from Firestore document
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
      const user = result.user;
      const docRef = await getDoc(doc(db, "players/", user.uid));
      const playerData: Player = {
        username: user.displayName ?? "No Name", // Use "No Name" if displayName is null
        email: user.email ?? "No Email",         // Use "No Email" if email is null
        lastSignedIn: new Date().toISOString(), // Current time as ISO string
        metatmaskAddress: "",                   // Empty string for now
        authToken: "",                          // Empty string for now
        equippedItems: [],                      // Empty array
        inventory: []                           // Empty array
      };

      if (!docRef.exists()) {
        console.log("User not found. Setting new user in the firestore");
        await setDoc(doc(db, "players", user.uid), playerData).catch((err: any) => {
          console.log(err);
        });
      }
      else {
        console.log(docRef.data());
        await updateDoc(doc(db, "players", user.uid), playerData).catch((err) => {
          console.log(err);
        });
        setPlayer({
          ...playerData,
        });
      }
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
      const docRef = await getDoc(doc(db, "players", user.uid));
      console.log(user);
      if (!docRef.exists()) {
        await setDoc(doc(db, "players", user.uid), {
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
        await updateDoc(doc(db, "players", user.uid), {
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
    <AuthContext.Provider
      value={{ player, user, loading, signInWithEmail, createUser, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
  }
  return context;
};
