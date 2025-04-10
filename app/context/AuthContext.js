"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

/**
 * Authentication Context
 *
 * Provides authentication state and credit management functionality throughout the application.
 * Handles user authentication, credit system, and Firestore document management.
 *
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - Current authenticated user object
 * @property {boolean} loading - Authentication loading state
 * @property {number} credits - User's current credit balance
 * @property {Function} signOut - Function to sign out user
 * @property {Function} deductCredit - Function to deduct one credit
 * @property {Function} addCredits - Function to add credits
 * @property {Function} resetCredits - Function to reset credits to zero
 */
const AuthContext = createContext({});

/**
 * Authentication Provider Component
 *
 * Wraps the application and provides authentication context.
 * Manages:
 * - User authentication state
 * - Credit system
 * - Firestore document creation/updates
 * - Navigation based on auth state
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Creates or verifies user document in Firestore
   * Initializes new users with 20 credits
   *
   * @param {Object} user - Firebase auth user object
   * */
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

  /**
   * Fetches user's credit balance from Firestore
   *
   * @param {string} userId - Firebase user UID
   * @returns {Promise<number>} User's credit balance
   */
  const fetchUserCredits = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setCredits(userSnap.data().credits);
      return userSnap.data().credits;
    }
    return 0;
  };

  /**
   * Deducts one credit from user's balance
   * Updates both local state and Firestore
   *
   * @returns {Promise<boolean>} Success status
   */
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

  /**
   * Adds specified amount of credits to user's balance
   *
   * @param {number} amount - Number of credits to add
   * @returns {Promise<boolean>} Success status
   */
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

  /**
   * Resets user's credits to zero
   *
   * @returns {Promise<boolean>} Success status
   */
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

  /**
   * Firebase auth state listener
   * Handles:
   * - User document creation
   * - Credit fetching
   * - Navigation
   * - Loading state
   */
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

  /**
   * Handles user sign out
   * Signs out from Firebase and redirects to signin page
   */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Context value containing all auth and credit functionality
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

/**
 * Custom hook to use auth context
 *
 * @returns {AuthContextType} Auth context value
 * @throws {Error} When used outside of AuthProvider
 */
export const useAuth = () => useContext(AuthContext);
