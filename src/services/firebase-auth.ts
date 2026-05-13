import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth } from "../config/firebase-config";

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const forgotPassword = async (email: string) => {
  return await sendPasswordResetEmail(auth, email);
};

export const updateUserProfile = async (data: {
  displayName?: string;
  photoURL?: string;
}) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, data);
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const isVerified = () => {
  const user = auth.currentUser;
  return user ? user.emailVerified : false;
};
