import { db } from "./firebase";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
} from "firebase/firestore";

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