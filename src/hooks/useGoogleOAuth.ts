import { signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider, app } from '@/services/firebase';
import { doc, setDoc, getFirestore, getDoc, updateDoc } from "firebase/firestore";

const signIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log('Signed in user:', result.user);

        // Google has very cool naming for their databases. Lovely for development.
        const db = getFirestore(app);
        const user = result.user;
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (!docRef) {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.displayName,
            }).catch(err => {
                console.log(err);
            });
            console.log("User not found. Setting new user in the firestore")
        }
        console.log("User found. No need to set a doc")

    } catch (error) {
        // Handle errors here, such as displaying a notification
        console.error(error);
    }
};

const signInWithEmail = async (email: string, password: string) => {
    try {
        // Attempt to sign in with Google
        const result = await signInWithEmailAndPassword(auth, email, password);
        // You can access the signed-in user via result.user
        console.log('Signed in user:', result.user);

        // Google has very cool naming for their databases. Lovely for development.
        const db = getFirestore(app);
        const user = result.user;
        console.log(user);
        const docRef = await getDoc(doc(db, "users", user.uid));
        if (!docRef.exists()) {
            console.log("User not found. Setting new user in the firestore")
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.email,
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log("User found. Updating new user in the firestore");
            await updateDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.email,
            }).catch(err => {
                console.log(err);
            });
        }

    } catch (error) {
        console.error(error);
    }
};

const logOut = async () => {
    try {
        await signOut(auth);
        // You can access the signed-in user via result.user
        console.log("Signed out user");
    } catch (error) {
        console.error(error);
    }
};

const linkMetaMaskToGoogleAccount = async (googleUID: string, account: string, signature: string, message: string) => {
    const db = getFirestore(app);
    const userDocRef = doc(db, 'users', googleUID);

    try {
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            console.log("No such document!");
            return;
        }

        await updateDoc(userDocRef, {
            walletAddress: account,
            signature: signature,
            message: message,
        });

        console.log("Document updated with MetaMask account details");

    } catch (error) {
        console.error("Error updating document:", error);
    }
};

export { signIn, logOut, linkMetaMaskToGoogleAccount, signInWithEmail };
