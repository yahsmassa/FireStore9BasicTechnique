import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Swal from "sweetalert2";

import {
  addDoc,
  getDocs,
  updateDoc,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";

import type {
  Query,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

// This interface is made by Web Service
// https://app.quicktype.io/
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
// Copy and Paste

export const usersRef = collection(db, "users");

export const addUserRecord = async (UserRecord: User) => {
  try {
    await addDoc(usersRef, UserRecord);
  } catch (error) {
    Swal.fire("addUserRecord", "Can't Add Record", "error");
  }
};

export const getUserRecords = async (q: Query<DocumentData>) => {
  try {
    const myQuerySnapshot = await getDocs(q);
    return myQuerySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as User
    );
  } catch (error) {
    Swal.fire("getUserRecords", "Can't Return Records", "error");
    return [];
  }
};

export const deleteAllUserRecord = async () => {
  try {
    const users = await getDocs(usersRef);
    await Promise.all(users.docs.map((doc) => deleteDoc(doc.ref)));
    Swal.fire("Firestore data", "All data is deleted");
  } catch (error) {
    Swal.fire("deleteAllUserRecord", "Something went wrong", "error");
  }
};

// this time, no use
export const deleteUserRecord = async (id: string) => {
  try {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
  } catch (error) {
    Swal.fire("deleteUserRecord", "Something went wrong", "error");
  }
};

// this time, no use
export const editUserRecord = async (editUserRecord: User, id: string) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, { ...editUserRecord });
    Swal.fire("Revised !", "The User record was successfully revised");
  } catch (error) {
    Swal.fire("¡Upps!", "Something went wrong", "error");
  }
};
