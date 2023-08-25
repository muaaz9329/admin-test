"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthError, User, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { fireAuth, firestore } from "@/lib/firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";

export type AppUser = {
  userId: string;
  email: string;
  role: "admin" | "user";
  displayName?: string;
  photoURL?: string;
};

type AuthContextType = {
  authUser: User | null | undefined;
  authLoading: boolean;
  authError: AuthError | Error | undefined;
  isLoggedIn: boolean;
  userData: AppUser | null;

  signOutUser: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  authLoading: false,
  authError: undefined,
  isLoggedIn: false,
  userData: null,
  signOutUser: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

/**
 * AuthContextProvider is a wrapper component that provides auth context to all the components
 * inside it.
 */
export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  // these values update when user logs in or out
  const [user, loading, error] = useAuthState(fireAuth);

  // any user with correct email and password can be considered logged in by fireauth(I don't know yet to control this from rules in firestore)
  // but we want to restrict access to admin panel to only users with role "admin"
  // so we are using this state to check if user is logged in and has role "admin"
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // there maybe an error while logging in user or getting user document from firestore
  // we are storing that error in this state and displaying it to user
  const [authError, setAuthError] = useState<AuthError | Error | undefined>(
    undefined
  );

  // we are using this state to display loading indicator while logging in user
  // or getting user document from firestore
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // we are storing user data in this state. We are getting user data from firestore
  // and storing it in this state. it maybe useless but I am keeping it for now
  const [userData, setUserData] = useState<AppUser | null>(null);

  // logout user
  const signOutUser = async () => {
    await signOut(fireAuth);
  };

  // updating authError state when error changes
  useEffect(() => {
    setAuthError(error);
    // it means that there was an error while logging in. updating authloading for login error
    if (error) setAuthLoading(loading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  // setting the authLoading state to true only when loading becomes true and it becomes true when user is trying to login .
  // we'll set it to false customly below after authorizing user or when there is an error while signing in which is implemented in error useEffect
  useEffect(() => {
    if (loading) setAuthLoading(true);
    else setAuthLoading(false);
  }, [loading]);

  // checking if user exists and if user has role "admin"
  useEffect(() => {
    if (!user) setIsLoggedIn(false);

    // if user exists, we are taking user id and getting user from users collection that
    // has the same id. We are checking user role and only allowing users with role "admin"
    // to access admin panel
    if (user) {
      const userId = user.uid;

      const docRef = doc(firestore, "users", userId);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();

            if (userData?.role === "admin") {
              /* 
                if user exists and user has role "admin", we are setting isLoggedIn to true
                and setting userData state with user data from firestore.
                authError is set to undefined because there is no error
              */
              setIsLoggedIn(true);
              setUserData(userData as AppUser);
            } else {
              /*
                if user exists but user does not have role "admin", we are setting isLoggedIn to false
                and setting authError state with custom error code auth/not-admin
                We are also signing out user because user is not admin
              */
              setIsLoggedIn(false);

              // sign out user if user is not admin
              signOutUser().then(() => {});

              // updating authError with custom error code auth/not-admin
              setAuthError({
                code: "auth/not-admin",
                message: "You are not authorized to access this page",
              } as AuthError);
            }

            // setting authLoading to false because we are done with authorizing user
            setAuthLoading(false);
          }
        })
        .catch((e) => {
          console.log({ e });

          // setting authError state with error if there is an error while getting user document from firestore
          setAuthError(e);

          // setting authLoading to false because we are done with authorizing user
          setAuthLoading(false);

          // sign out user if there is an error while getting user document from firestore
          signOutUser().then(() => {});
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        authUser: user,
        authLoading,
        authError,
        isLoggedIn: isLoggedIn,
        userData,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
