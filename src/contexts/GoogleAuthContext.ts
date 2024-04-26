// src/contexts/GoogleAuthContext.tsx
import React, { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { app, auth } from "@/services/firebase";
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

interface GoogleAuthContextType {
    user: User | null;
    loading: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

interface GoogleAuthProviderProps {
    children: ReactNode;
}

export const GoogleAuthProvider: React.FC<{}> = () => {
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

    const signInWithEmail = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            // Attempt to sign in with Google
            const result = await signInWithEmailAndPassword(auth, email, password);
            // You can access the signed-in user via result.user
            // Google has very cool naming for their databases. Lovely for development.
            const db = getFirestore(app);
            const user = result.user;
            const docRef = await getDoc(doc(db, "users", user.uid));
            if (!docRef.exists()) {
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    displayName: user.email,
                }).catch(err => {
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
                }).catch(err => {
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
        <GoogleAuthContext.Provider value= {{ user, loading, signInWithEmail }
}>
    { children }
    < /GoogleAuthContext.Provider>
    )
;
};

export const useGoogleAuth = () => {
    const context = useContext(GoogleAuthContext);
    if (context === undefined) {
        throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
    }
    return context;
};