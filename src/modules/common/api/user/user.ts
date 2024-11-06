import {
    AddToAttendance,
    UserAddSchedule,
    UserDeleteSchedule,
    UserLogin,
    UserRegister
} from "@/modules/common/models/User.ts";
import niteApi from "@/modules/common/api";

const register = async ({username, email, password}: UserRegister) => {
    return await niteApi.post("/auth/signup",
        {username, email, password}
    )
}

const login = async ({email, password}: UserLogin) => {
    return await niteApi.post("/auth/login",
        {email, password}
    )
}

const getUserBySessionToken = async () => {
    const sessionToken = localStorage.getItem("nitelog-sessionToken");
    if (!sessionToken) {
        return null;
    }
    return await niteApi.get(`/users/session/${sessionToken}`);
}

const addSchedule = async ({user, schedule}: UserAddSchedule) => {
    return await niteApi.post(`/users/${user.id}/schedules`, {
        schedule: schedule
    });
}

const deleteSchedule = async ({user, scheduleId}: UserDeleteSchedule) => {
    return await niteApi.delete(`users/${user.id}/schedules/${scheduleId}`);
}

const addUserToAttendanceList = async ({meetingCode, userId}: AddToAttendance) => {
    return await niteApi.post(`/meetings/user`, {
        date: new Date(),
        meetingCode,
        userId
    });
}

const finishUserAttendance = async (userId: number) => {
    return await niteApi.post(`/meetings/user/finish`, {
        date: new Date(),
        userId
    });
}

export {
    register,
    login,
    getUserBySessionToken,
    addSchedule,
    deleteSchedule,
    addUserToAttendanceList,
    finishUserAttendance
}