"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Function to create or update user in Firestore
  const createUserDocument = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // Create new user document
      try {
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          credits: 20, // Initial credits for new users
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error creating user document:", error);
      }
    }
  };

  // Add credit management functions
  const fetchUserCredits = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setCredits(userSnap.data().credits);
      return userSnap.data().credits;
    }
    return 0;
  };

  const deductCredit = async () => {
    if (!user || credits <= 0) return false;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        credits: credits - 1,
        updatedAt: new Date().toISOString(),
      });
      setCredits((prev) => prev - 1);
      return true;
    } catch (error) {
      console.error("Error deducting credit:", error);
      return false;
    }
  };

  const addCredits = async (amount) => {
    if (!user) return false;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        credits: credits + amount,
        updatedAt: new Date().toISOString(),
      });
      setCredits((prev) => prev + amount);
      return true;
    } catch (error) {
      console.error("Error adding credits:", error);
      return false;
    }
  };

  const resetCredits = async () => {
    if (!user) return false;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        credits: 0,
        updatedAt: new Date().toISOString(),
      });
      setCredits(0);
      return true;
    } catch (error) {
      console.error("Error resetting credits:", error);
      return false;
    }
  };

  // Initial auth check
  // useEffect(() => {
  //   if (pathname !== "/auth/signin" && !auth.currentUser) {
  //     router.push("/auth/signin");
  //   }
  // }, []);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await createUserDocument(user); // Create Firestore document
        await fetchUserCredits(user.uid);
        setUser(user);
        if (pathname === "/auth/signin") {
          router.push("/protected");
        }
      } else {
        setUser(null);
        setCredits(0);
        router.push("/auth/signin");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    user,
    loading,
    credits,
    signOut: handleSignOut,
    deductCredit,
    addCredits,
    resetCredits,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
