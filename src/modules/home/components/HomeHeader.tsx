import {Button} from "@/components/ui/button.tsx";
import {CircleUserRound} from "lucide-react";
import {useLocation} from "wouter";

const HomeHeader = () => {
    const [, navigate] = useLocation();

    return (
        <header className="sticky top-0 z-50 w-full flex justify-end items-center bg-surface/95">
            <Button variant="outline" size="icon" onClick={() => navigate("/user")}>
                <CircleUserRound className=""/>
            </Button>
        </header>
    );
};

export default HomeHeader;