import { useState, useEffect, useContext } from "react";
import { getUserDocsByUserId } from "../services/firebase";
import UserContext from "../context/user";

export default function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext); //get the login user

    useEffect(() => {
        async function getUserObjByUserId() {
            const [response] = await getUserDocsByUserId(user.uid);
            setActiveUser({ ...response }); // pass the user response to the state of activeUser
        }
        if (user && user.uid) {
            getUserObjByUserId();
        }
    }, [user]);

    return { user: activeUser }; // return activeUser as user to the hook when called
}
