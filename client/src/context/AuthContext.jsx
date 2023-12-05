import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const updateAuth = (loggedUser) => {
        setUser(loggedUser);
        localStorage.removeItem("user");
    }

    const editUserDetails = (updatedUser) => {

        setUser((prevUser) => {
            return {
                ...prevUser,
                name: updatedUser?.name,
                profileImg: updatedUser?.profileImg
            }
        })
    }

    return (
        <AuthContext.Provider value={{user, updateAuth, editUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}
