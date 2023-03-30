import Navigation from '@/components/navigation/navigation';
import firebase_app from '@/lib/firebase';
import '@/styles/globals.scss'
import { Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import type { AppProps } from 'next/app'
import { useContext, useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css'
import { AuthContext, AuthContextProvider } from '../context/AuthUserContext';

const auth = getAuth(firebase_app);

export default function App({ Component, pageProps }: AppProps) {
  const [authUser, setAuthUser] = useState<any>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setAuthUser(user)
      else setAuthUser(null)
    })
  }, [])
  console.log('App', authUser);

  const signout = () => signOut(auth)

  return (
    <AuthContextProvider>
      <Navigation />
      {authUser && (
        <div className="fixed top-0 right-0 h-16 bg-white z-50 w-4/6 border-4 border-solid border-slate-200 rounded">
          <div className="flex justify-around  h-full ">
            <h1 className="my-auto">admin: {authUser.email}</h1>
            <div className="my-auto">
              <Button variant="contained" onClick={signout}>Sign Out</Button>
            </div>
          </div>
        </div>
      )}
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
