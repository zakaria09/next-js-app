import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from './firebase';

const auth = getAuth(firebase_app);

export default async function siginIn(email: string, password: string) {
  let result = null,
    error = null;
  
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    error = error;
  }

  return {
    result,
    error
  };
}