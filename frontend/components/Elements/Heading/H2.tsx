type H2Props = {
    text: string | number;
    size?: string;
};

const H2 = ({ text, size }: H2Props) => {
    return <h2 className={`text-slate-800 ${size ? "text-[" + size + "]" : "text-base"}`}>{text}</h2>;
};

export default H2;
