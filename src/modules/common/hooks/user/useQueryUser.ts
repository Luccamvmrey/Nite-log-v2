import {useQuery} from "@tanstack/react-query";
import {getUserBySessionToken} from "@/modules/common/api/user/user.ts";

const useQueryUser = () => {
    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: getUserBySessionToken,
        retry: false
    });

    return {userQuery};
}

export default useQueryUser;