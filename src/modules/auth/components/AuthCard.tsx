import React from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

type AuthCardProps = {
    isLogin: boolean;
    toggleForm: () => void;
    children: React.ReactNode;
}

const AuthCard = ({isLogin, toggleForm, children}: AuthCardProps) => {
    const cardTitle = isLogin ? "Entre em sua conta" : "Crie uma conta";
    const toggleButtonText = isLogin ? "Criar conta" : "Já tem uma conta?";
    const submitButtonText = isLogin ? "Entrar" : "Cadastrar";

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>Bem-vindo ao Nite!</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="justify-between">
                <Button
                    className="bg-transparent text-xs"
                    variant="link"
                    onClick={toggleForm}
                >
                    {toggleButtonText}
                </Button>
                <Button
                    form={isLogin ? "login-form" : "signup-form"}
                    type="submit"
                    variant="outline"
                >
                    {submitButtonText}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AuthCard;