import { useEffect, useState } from "react";

export const useAuth = ()=>{
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("TOKEN");

    useEffect(() => {
        if(token){
            fetch("/api/user/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                if(data.hasError){
                    // localStorage.removeItem("TOKEN");
                }else{
                    setUser(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [token]);

    return { user };
}