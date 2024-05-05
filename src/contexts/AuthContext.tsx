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

import { auth, provider, db } from "@/services/firebase";
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
      const user = result.user;
      handlePlayerSignIn(user).then(() => {
        console.log("Signed in");
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
      username: user.displayName ?? "No Name",
      id: user.uid,
      email: user.email ?? "No Email",
      lastSignedIn: new Date().toISOString(),
      metatmaskAddress: "",
      authToken: user.refreshToken,
      equippedItems: [],
      inventory: [],
      discoveredItems: []
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
