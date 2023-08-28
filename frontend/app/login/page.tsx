"use client";

import InputGroup from "@/components/InputGroup";
import { useFormik } from "formik";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import carouselData from "@/data/carousel";
import Carousel from "@/components/Carousel";

interface FormInitialValues {
    email: string,
    password: string
};

const Login = () => {
    const form = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => formSubmit(values)
    })

    const formSubmit = (values: FormInitialValues) => {
        //  TODO: api integration
        //  TODO: set errors message from response if any
        //  TODO: redirect to main page
        setTimeout(() => {
            form.setSubmitting(false)
        }, 2000)
    };

    useEffect(() => {
        //  TODO:  check authentication, redirect to main page if has been logged in
    }, [])
    
    return (
        <div className="flex flex-col lg:flex-row w-full lg:h-screen">
            <Carousel data={ carouselData }/>
            
            <form className="credentials flex flex-col gap-y-12 px-8 py-12 lg:w-full lg:max-w-[40%] lg:px-12 justify-center" onSubmit={ form.handleSubmit } >
                <div className="header flex flex-col gap-y-2">
                    <img className="w-14" src="/assets/images/rembugan-logo.svg" alt="rembugan logo" />
                    <h1 className="font-semibold text-2xl lg:text-3xl">Welcome to Rembugan!</h1>
                    <h2 className="text-base">Login into your account</h2>
                </div>

                <div className="flex flex-col gap-y-5">
                    <InputGroup name="email" type="email" formikObject={ form }/>
                    <InputGroup name="password" type="password" formikObject={ form }/>
                </div>

                <button className="bg-primary py-4 px-8 rounded-lg text-white hover:brightness-95 disabled:bg-gray-400" type="submit" disabled={ form.isSubmitting }>Login</button>
                <small className="self-center text-base">Doesn't have an account? <Link className="text-primary" href="/register">Register</Link></small>
            </form>
        </div>
    )
}

export default Login;