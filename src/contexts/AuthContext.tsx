// src/contexts/GoogleAuthContext.tsx
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";

import { app, auth, provider, db } from "@/services/firebase";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Player } from "@/types/Player";

interface AuthContextType {
  user: User | null;
  player: Player | null;
  loading: boolean;
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

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // Google has very cool naming for their databases. Lovely for development.
      const user = result.user;
      handlePlayerSignIn(user).then(() => {
        console.log("user signed in");
      }).catch(console.error);
    }
    catch (error) {
      console.error(error);
    }
  };


  async function handlePlayerSignIn(user: any): Promise<void> {
    const playerRef = doc(db, "players", user.uid);
    const docRef = await getDoc(playerRef);

    const playerData: Player = {
      username: user.displayName ?? "No Name", // Use "No Name" if displayName is null
      email: user.email ?? "No Email",         // Use "No Email" if email is null
      lastSignedIn: new Date().toISOString(), // Current time as ISO string
      metatmaskAddress: "",                   // Empty string for now
      authToken: user.refreshToken,           // Storing Firebase Auth token
      equippedItems: [],                      // Initially empty
      inventory: []                           // Initially empty
    };
    if (!docRef.exists()) {
      console.log("User not found. Setting new user in Firestore");
      await setDoc(playerRef, playerData).catch(console.error);
    } else {
      console.log("Updating existing user data");
      await updateDoc(playerRef, playerData).catch(console.error);
    }
    setPlayer(playerData);
  }


  return (
    <AuthContext.Provider
      value={{ player, user, loading, signIn }}
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
