"use client";

import { useEffect } from "react";
import RegisterForm from "@/components/Fragments/RegisterForm";

const Register = () => {
    useEffect(() => {
        //  TODO:  Check authentication, redirect to main page if has been logged in
    }, []);

    return <RegisterForm />;
};

export default Register;
