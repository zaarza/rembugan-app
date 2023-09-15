import React from "react";

type H1Props = {
    text: string;
}

const H1 = ({ text }: H1Props) => {
    return <h1 className="font-semibold text-slate-800 text-2xl lg:text-3xl">{ text }</h1>;
};

export default H1;
