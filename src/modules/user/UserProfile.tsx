import ProfileHeader from "@/modules/user/components/ProfileHeader.tsx";

const UserProfile = () => {
    return (
        <main className="container flex flex-col items-center h-full w-full gap-4 py-4 px-8">
            <ProfileHeader/>
            Here goes the user profile
        </main>
    );
};

export default UserProfile;