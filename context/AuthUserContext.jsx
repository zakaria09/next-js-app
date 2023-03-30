import React, { useEffect } from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '../lib/firebase';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
      <AuthContext.Provider value={{ user }}>
        {loading ? (
          <Box sx={{ display: "flex", height: '100vh', justifyContent: 'center' }}>
            {" "}
            <CircularProgress />
          </Box>
        ) : (
          children
        )}
      </AuthContext.Provider>
    );
};
