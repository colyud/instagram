import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getUserDocsByUserId, getUserFollowingPhotos } from "../services/firebase";

export default function useFollowedUsersPhotos() {
    const [photos, setPhotos] = useState(null);
    const { user } = useContext(UserContext); // return the login user

    const userId = user ? user.uid : ""; //get the uid of the login user

    useEffect(() => {
        async function getTimelinePhotos() {
            const userDocs = await getUserDocsByUserId(userId); // return the user document in firebase collection of the login user (array of 1 user obj)

            if (userDocs && userDocs.length > 0) {
                const followingUserIds = userDocs[0].following;
                const followingUserPhotos = await getUserFollowingPhotos(userId, followingUserIds); // return all the photos +name of all the user we follow to
                followingUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated); // sort by photo date
                setPhotos(followingUserPhotos);
            } else setPhotos(null);
        }
        getTimelinePhotos();
    }, [userId]);

    return { photos };
}
