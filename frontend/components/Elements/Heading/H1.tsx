type H1Props = {
    text: string;
    size?: string;
}

const H1 = ({ text, size }: H1Props) => {
    return <h1 className={`font-semibold text-slate-800 ${size ? "text-"+"["+size+"]" : "text-2xl lg:text-3xl" }`}>{ text }</h1>;
};

export default H1;
