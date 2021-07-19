import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserDocsByUserId, getUserFollowedPhotos } from "../services/firebase";

export default function useFollowedUsersPhotos() {
    const [photos, setPhotos] = useState(null);
    const { user } = useContext(UserContext); // return the login user

    const userId = user ? user.uid : ""; //get the uid of the login user

    useEffect(() => {
        async function getTimelinePhotos() {
            const followingUserIds = await getUserDocsByUserId(userId); // return the user document in firebase collection of the login user (array of 1 user obj)

            if (followingUserIds && followingUserIds.length > 0) {
                const followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following); // return all the photos +name of all the user we follow to
                followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // sort by photo date
                setPhotos(followedUserPhotos);
            } else setPhotos(null);
        }
        getTimelinePhotos();
    }, [userId]);

    return { photos };
}
