import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDpZTqHRJrRLLR-D-t4LI5kFH5VIGkmXm4",
  authDomain: "netflix-clone-251ba.firebaseapp.com",
  projectId: "netflix-clone-251ba",
  storageBucket: "netflix-clone-251ba.appspot.com",
  messagingSenderId: "565720411831",
  appId: "1:565720411831:web:dd7c3ba9fe0618435c6732"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}
const logout = ()=>{
    signOut(auth);
}
export{auth, db, login, signup, logout}