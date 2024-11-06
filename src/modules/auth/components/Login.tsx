import React, {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

export type loginFormValues = {
    email: string;
    password: string;
};

const initialValues: loginFormValues = {
    email: "",
    password: "",
};

type LoginProps = {
    handleLogin: (formValues: loginFormValues) => void;
};

const Login = ({handleLogin}: LoginProps) => {
    const [formValues, setFormValues] = useState<loginFormValues>(initialValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleLogin(formValues);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    }

    return (
        <form id="login-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    value={formValues.password}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
};

export default Login;