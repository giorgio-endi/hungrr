import { db, auth, storage } from "./firebase";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    arrayUnion,
    collection,
    getDocs,
    addDoc,
    query,
    orderBy,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// -------------------- ROOM FUNCTIONS --------------------

export async function createRoom(roomCode, location, hostName) {
    const roomRef = doc(db, "rooms", roomCode);

    await setDoc(roomRef, {
        code: roomCode,
        location: location,
        host: hostName,
        status: "waiting",
        users: [hostName],
        createdAt: Date.now(),
    });
}

export async function joinRoom(roomCode, username) {
    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
        throw new Error("Room does not exist");
    }

    const roomData = roomSnap.data();
    const existingUsers = roomData.users || [];

    if (existingUsers.includes(username)) {
        return;
    }

    await updateDoc(roomRef, {
        users: arrayUnion(username),
    });
}

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

export async function startSwiping(roomCode) {
    const roomRef = doc(db, "rooms", roomCode);

    await updateDoc(roomRef, {
        status: "swiping",
    });
}

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
    const storageRef = ref(
        storage,
        `profilePictures/${uid}/${Date.now()}-${file.name}`
    );

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "profiles", uid), {
        photoURL: downloadURL,
        updatedAt: Date.now(),
    });

    return downloadURL;
}

// -------------------- REALTIME PROFILES --------------------

export function subscribeToProfilesExceptCurrentUser(currentUid, callback) {
    const profilesRef = collection(db, "profiles");

    return onSnapshot(profilesRef, (snapshot) => {
        const profiles = [];

        snapshot.forEach((docSnap) => {
            const data = docSnap.data();

            if (data.uid !== currentUid) {
                profiles.push(data);
            }
        });

        callback(profiles);
    });
}

// -------------------- DATING / MATCHES --------------------

export async function createMatch(currentUserProfile, otherUserProfile) {
    const matchId = [currentUserProfile.uid, otherUserProfile.uid].sort().join("_");

    await setDoc(
        doc(db, "matches", matchId),
        {
            id: matchId,
            userIds: [currentUserProfile.uid, otherUserProfile.uid],
            users: {
                [currentUserProfile.uid]: {
                    uid: currentUserProfile.uid,
                    username: currentUserProfile.username || "",
                    photoURL: currentUserProfile.photoURL || "",
                    favouriteFood: currentUserProfile.favouriteFood || "",
                    cravingStyle: currentUserProfile.cravingStyle || "",
                    bio: currentUserProfile.bio || "",
                },
                [otherUserProfile.uid]: {
                    uid: otherUserProfile.uid,
                    username: otherUserProfile.username || "",
                    photoURL: otherUserProfile.photoURL || "",
                    favouriteFood: otherUserProfile.favouriteFood || "",
                    cravingStyle: otherUserProfile.cravingStyle || "",
                    bio: otherUserProfile.bio || "",
                },
            },
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
        { merge: true }
    );

    return matchId;
}

export async function getUserMatches(currentUid) {
    const matchesRef = collection(db, "matches");
    const snapshot = await getDocs(matchesRef);

    const results = [];

    snapshot.forEach((docSnap) => {
        const data = docSnap.data();

        if (!data.userIds?.includes(currentUid)) {
            return;
        }

        const otherUid = data.userIds.find((uid) => uid !== currentUid);
        const otherUser = data.users?.[otherUid];

        if (otherUser) {
            results.push({
                id: data.id,
                ...otherUser,
            });
        }
    });

    return results;
}

export async function sendMessage(matchId, senderUid, text) {
    const messagesRef = collection(db, "matches", matchId, "messages");

    await addDoc(messagesRef, {
        senderUid,
        text,
        createdAt: Date.now(),
    });

    await updateDoc(doc(db, "matches", matchId), {
        updatedAt: Date.now(),
    });
}

export function subscribeToMessages(matchId, callback) {
    const messagesRef = collection(db, "matches", matchId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    return onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }));
        callback(msgs);
    });
}