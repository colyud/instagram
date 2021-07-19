import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await firebase.firestore().collection("users").where("username", "==", username).get();

    return result.docs.map((user) => user.data().length > 0);
}

export async function getUserDocsByUserId(userId) {
    const result = await firebase.firestore().collection("users").where("userId", "==", userId).get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user; // return user docs in firebase collection
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
    const result = await firebase.firestore().collection("photos").where("userId", "in", followingUserIds).get();

    const userFollowedPhotos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    console.log(userFollowedPhotos);
    return userFollowedPhotos;
}
