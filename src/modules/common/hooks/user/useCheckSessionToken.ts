import {useLocation} from "wouter";
import {useEffect} from "react";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";

const useCheckSessionToken = () => {
    const [, navigate] = useLocation();
    const {userQuery} = useQueryUser();

    useEffect(() => {
        if (!userQuery.data) {
            navigate("/");
        }
    }, [userQuery]);
}

export default useCheckSessionToken;