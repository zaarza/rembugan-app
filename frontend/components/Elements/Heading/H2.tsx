import React from "react";

type H2Props = {
    text: string;
};

const H2 = ({ text }: H2Props) => {
    return <h2 className="text-base text-slate-800">{text}</h2>;
};

export default H2;
