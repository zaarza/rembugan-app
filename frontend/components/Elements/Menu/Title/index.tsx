type TitleProps = {
    text: string;
};

const Title = ({ text }: TitleProps) => {
    return <h1 className="text-xl font-semibold text-slate-800">{text}</h1>;
};

export default Title;
