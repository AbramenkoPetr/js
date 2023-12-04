import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDYtv0exNlGGU8_x6Mf32M4Y0nAQHp8nEI",
  authDomain: "abram-1312.firebaseapp.com",
  databaseURL: "https://abram-1312-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "abram-1312",
  storageBucket: "abram-1312.appspot.com",
  messagingSenderId: "178348184204",
  appId: "1:178348184204:web:14084a448f70e0271061a9",
  measurementId: "G-SEQF5MGP4S"
};

//const firebaseConfig = {
//  apiKey: "AIzaSyDpXkGiZeZ09OsUJSwbtvUzICUskpLVNwU",
//  authDomain: "gbchat9.firebaseapp.com",
//  databaseURL: "https://gbchat9-default-rtdb.europe-west1.firebasedatabase.app",
//  projectId: "gbchat9",
//  storageBucket: "gbchat9.appspot.com",
//  messagingSenderId: "403577477836",
//  appId: "1:403577477836:web:014c1812023abf4c6bc069",
//  measurementId: "G-7ZDJWBYY2T",
//};

export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
