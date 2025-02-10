import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDO0Cr6C2Rjymy8Rywzu0Nv1KoRGv9ljs",
  authDomain: "task-management-c0a33.firebaseapp.com",
  projectId: "task-management-c0a33",
  storageBucket: "task-management-c0a33.firebasestorage.app",
  messagingSenderId: "413866506090",
  appId: "1:413866506090:web:15c85ba72e1790c943d713",
  measurementId: "G-MBGVEDV2PY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// authentication
export const auth = getAuth(app);