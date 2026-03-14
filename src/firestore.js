import { db, auth, storage } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// -------------------- ROOM FUNCTIONS --------------------

// create a room
export async function createRoom(roomCode, location, hostName) {
  const roomRef = doc(db, "rooms", roomCode);

  await setDoc(roomRef, {
    code: roomCode,
    location: location,
    host: hostName,
    status: "waiting",
    users: [],
    createdAt: Date.now(),
  });
}

// join a room
export async function joinRoom(roomCode, username) {
  const roomRef = doc(db, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    throw new Error("Room does not exist");
  }

  await updateDoc(roomRef, {
    users: arrayUnion(username),
  });
}

// listen to room changes in real time
export function subscribeToRoom(roomCode, callback) {
  const roomRef = doc(db, "rooms", roomCode);

  return onSnapshot(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      callback(null);
    }
  });
}

// host starts swiping
export async function startSwiping(roomCode) {
  const roomRef = doc(db, "rooms", roomCode);

  await updateDoc(roomRef, {
    status: "swiping",
  });
}

// save a vote
export async function saveVote(roomCode, restaurantId, username, vote) {
  await setDoc(
    doc(db, "rooms", roomCode, "votes", restaurantId),
    {
      [username]: vote,
    },
    { merge: true }
  );
}

// -------------------- AUTH + PROFILE FUNCTIONS --------------------

// demo helper: turn username into login email
function usernameToEmail(username) {
  return `${username.trim().toLowerCase()}@hungrr.app`;
}

export async function signUpUser(username, password) {
  const cleanUsername = username.trim().toLowerCase();
  const email = usernameToEmail(cleanUsername);

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await setDoc(doc(db, "profiles", userCredential.user.uid), {
    uid: userCredential.user.uid,
    username: cleanUsername,
    favouriteFood: "",
    cravingStyle: "",
    budget: "",
    bio: "",
    photoURL: "",
    createdAt: Date.now(),
  });

  return userCredential.user;
}

export async function signInUser(username, password) {
  const email = usernameToEmail(username);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signOutUser() {
  await signOut(auth);
}

export async function getUserProfile(uid) {
  const profileRef = doc(db, "profiles", uid);
  const profileSnap = await getDoc(profileRef);

  if (!profileSnap.exists()) {
    return null;
  }

  return profileSnap.data();
}

export async function saveUserProfile(uid, profileData) {
  const profileRef = doc(db, "profiles", uid);

  await setDoc(
    profileRef,
    {
      ...profileData,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
}

export async function uploadProfilePicture(uid, file) {
  const storageRef = ref(storage, `profilePictures/${uid}/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  await updateDoc(doc(db, "profiles", uid), {
    photoURL: downloadURL,
    updatedAt: Date.now(),
  });

  return downloadURL;
}
