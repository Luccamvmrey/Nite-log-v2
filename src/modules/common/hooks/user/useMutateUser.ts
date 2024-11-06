import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
    addSchedule,
    addUserToAttendanceList,
    deleteSchedule,
    finishUserAttendance,
    login,
    register
} from "@/modules/common/api/user/user.ts";
import {useLocation} from "wouter";

const useMutateUser = () => {
    const queryClient = useQueryClient();
    const [, navigate] = useLocation();

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: data => {
            const user = data.data;
            queryClient.setQueryData(["user"], user);
        }
    })

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: data => {
            const user = data.data;
            localStorage.setItem("nitelog-sessionToken", user.sessionToken);
            queryClient.setQueryData(["user"], user);
        }
    })

    const addScheduleMutation = useMutation({
        mutationFn: addSchedule,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]});
        }
    })

    const deleteScheduleMutation = useMutation({
        mutationFn: deleteSchedule,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]});
        }
    })

    const addToAttendanceMutation = useMutation({
        mutationFn: addUserToAttendanceList,
        onSuccess: async () => {
            navigate("/home");
            await queryClient.invalidateQueries({queryKey: ["user"]});
        }
    })

    const finishAttendanceMutation = useMutation({
        mutationFn: finishUserAttendance,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user"]});
        }
    })

    return {
        registerMutation,
        loginMutation,
        addScheduleMutation,
        deleteScheduleMutation,
        addToAttendanceMutation,
        finishAttendanceMutation
    };
}

export default useMutateUser;