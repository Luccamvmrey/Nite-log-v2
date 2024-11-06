import Schedule from "@/modules/common/models/Schedule.ts";

type User = {
    id: string;
    username: string;
    email: string;
    salt: string;
    hashedPassword: string;
    sessionToken: string | null;
    hierarchyId: number;
    isOnAttendance: boolean;
    schedules?: Schedule[];
}

export type UserRegister = {
    username: string;
    email: string;
    password: string;
}

export type UserLogin = {
    email: string;
    password: string;
}

export type UserAddSchedule = {
    user: Partial<User>;
    schedule: Partial<Schedule>;
}

export type UserUpdateSchedule = UserAddSchedule;
export type UserDeleteSchedule = {
    user: Partial<User>;
    scheduleId: string;
};

export type AddToAttendance = {
    userId: number;
    meetingCode: number;
}

export default User;