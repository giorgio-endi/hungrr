import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

// 1. create a room
export async function createRoom(roomCode) {
    await setDoc(doc(db, "rooms", roomCode), {
        createdAt: Date.now()
    });
}

// 2. join a room
export async function joinRoom(roomCode, username) {
    await setDoc(doc(db, "rooms", roomCode, "users", username), {
        name: username
    });
}

// 3. save a vote
export async function saveVote(roomCode, restaurantId, username, vote) {
    await setDoc(
        doc(db, "rooms", roomCode, "votes", restaurantId),
        {
            [username]: vote
        },
        { merge: true }
    );
}