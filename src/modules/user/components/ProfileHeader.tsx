import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft} from "lucide-react";
import {useLocation} from "wouter";

const ProfileHeader = () => {
    const [, navigate] = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full flex justify-start items-center bg-surface/95">
            <Button variant="outline" size="icon" onClick={() => navigate("/home")}>
                <ArrowLeft/>
            </Button>
        </header>
    );
};

export default ProfileHeader;