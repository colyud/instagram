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

export async function getUserFollowingPhotos(userId, followingUserIds) {
    const result = await firebase.firestore().collection("photos").where("userId", "in", followingUserIds).get();

    const userFollowedPhotos = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    })); // return all the photos of the user we follow to

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserDocsByUserId(photo.userId);
            const username = user[0].username;
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails; // userFollowedPhotos + username and is we like to each photo
}
