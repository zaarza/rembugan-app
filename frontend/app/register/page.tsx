"use client";

import InputGroup from "@/components/InputGroup";
import { useFormik } from "formik";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import carouselData from "@/data/carousel";

interface FormInitialValues {
    name: string,
    email: string,
    password: string
};

const Register = () => {
    const form = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => formSubmit(values)
    })

    const formSubmit = (values: FormInitialValues) => {
        //  TODO: api integration
        //  TODO: set errors message from response if any
        //  TODO: redirect to login page if success register
        setTimeout(() => {
            form.setSubmitting(false)
        }, 2000)
    };

    const [activeCarousel, setActiveCarousel] = useState<number>(0);

    useEffect(() => {
        //  TODO:  check authentication, redirect to main page if has been logged in
    }, [])

    useEffect(() => {
        const automatedCarousel = setInterval(() => {
            if (activeCarousel < carouselData.length -1) {
                setActiveCarousel(activeCarousel + 1)
            } else {
                setActiveCarousel(0)
            };
        }, 5000);

        return (() => {
            clearInterval(automatedCarousel);
        })
    }, [activeCarousel, carouselData])
    
    return (
        <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
            <div className="carousel lg:max-h-screen bg-primary flex flex-col items-center px-8 py-12 gap-y-10 lg:w-full lg:order-2 justify-center">
                <img className="h-[200px]  rounded-lg shadow-lg lg:h-[350px]" src={ carouselData[activeCarousel].image } alt="carousel" />
                <div className="h-[120px] flex flex-col gap-y-4">
                    <h1 className="font-semibold text-2xl text-white text-center lg:text-3xl">{ carouselData[activeCarousel].title }</h1>
                    <h2 className="text-base text-white text-center">{ carouselData[activeCarousel].description }</h2>
                </div>
                <div className="flex gap-x-3">
                    {carouselData.map((carouselItem, index) => (
                        <button className={` rounded-full w-3 aspect-square ${activeCarousel === index ? 'bg-white' : 'bg-white/50'}`}  key={index} onClick={() => setActiveCarousel(index)} />
                    ))}
                </div>
            </div>
            
            <form className="credentials overflow-auto lg:max-h-screen flex flex-col gap-y-12 px-8 py-12 lg:w-full lg:max-w-[40%] lg:px-12" onSubmit={ form.handleSubmit } >
                <div className="header flex flex-col gap-y-2">
                    <img className="w-14" src="/assets/images/rembugan-logo.svg" alt="rembugan logo" />
                    <h1 className="font-semibold text-2xl lg:text-3xl">Welcome to Rembugan!</h1>
                    <h2 className="text-base">Create an account and get started!</h2>
                </div>

                <div className="flex flex-col gap-y-5">
                    <InputGroup name="name" type="name" formikObject={ form }/>
                    <InputGroup name="email" type="email" formikObject={ form }/>
                    <InputGroup name="password" type="password" formikObject={ form }/>
                </div>

                <button className="bg-primary py-4 px-8 rounded-lg text-white hover:brightness-95 disabled:bg-gray-400" type="submit" disabled={ form.isSubmitting }>Login</button>
                <small className="self-center text-base">Already have an account? <Link className="text-primary" href="/login">Login</Link></small>
            </form>
        </div>
    )
}

export default Register;