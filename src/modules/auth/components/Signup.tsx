import React, {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

export type signupFormValues = {
    username: string;
    email: string;
    password: string;
}

const initialValues: signupFormValues = {
    username: "",
    email: "",
    password: "",
};

type SignupProps = {
    handleSignup: (formValues: signupFormValues) => void;
};

const Signup = ({handleSignup}: SignupProps) => {
    const [formValues, setFormValues] = useState<signupFormValues>(initialValues);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSignup(formValues);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [event.target.name]: event.target.value});
    }

    return (
        <form id="signup-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input
                    id="username"
                    type="username"
                    name="username"
                    value={formValues.username}
                    onChange={handleChange}
                />
            </div>

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

export default Signup;