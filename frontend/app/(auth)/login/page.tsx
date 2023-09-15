"use client";

import LoginForm from "@/components/Fragments/LoginForm";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
        // TODO: Navigate to main page if has been logged in
    }, [])
    
    return <LoginForm />
}

export default Login;