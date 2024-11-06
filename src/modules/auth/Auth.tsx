import AuthCard from "@/modules/auth/components/AuthCard.tsx";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Loader} from "lucide-react";
import Login, {loginFormValues} from "@/modules/auth/components/Login.tsx";
import Signup, {signupFormValues} from "@/modules/auth/components/Signup.tsx";
import useMutateUser from "@/modules/common/hooks/user/useMutateUser.ts";
import {useLocation} from "wouter";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [, navigate] = useLocation();

    const {registerMutation, loginMutation} = useMutateUser();
    const {userQuery} = useQueryUser();

    const handleLogin = async ({email, password}: loginFormValues) => {
        if (!email || !password) {
            toast("Preencha todos os campos.");
            return;
        }
        loginMutation.mutate({email, password});
    }

    const handleSignup = async ({username, email, password}: signupFormValues) => {
        if (!username || !email || !password) {
            toast("Preencha todos os campos.");
            return;
        }
        registerMutation.mutate({username, email, password});
    }

    useEffect(() => {
        if (registerMutation.isError) {
            toast(registerMutation.error.message);
        }
        if (loginMutation.isError) {
            toast(loginMutation.error.message);
        }
    }, [registerMutation, loginMutation]);

    useEffect(() => {
        if (userQuery.data) {
            navigate("/home");
        }
    }, [userQuery]);

    return (
        <main className="container flex flex-col justify-center items-center h-full py-4 px-8">
            <AuthCard
                isLogin={isLogin}
                toggleForm={() => setIsLogin(prev => !prev)}
            >
                {isLogin && <Login handleLogin={handleLogin}/>}
                {!isLogin && <Signup handleSignup={handleSignup}/>}
            </AuthCard>
            {registerMutation.isPending || loginMutation.isPending &&
                <Loader className="absolute size-4"/>
            }
        </main>
    );
};

export default Auth;