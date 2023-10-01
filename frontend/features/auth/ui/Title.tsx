type TitleProps = {
    subtitle: string;
}

const Title = ({ subtitle }: TitleProps) => {
    return (
        <div className="header flex flex-col gap-y-2">
            <img className="w-14" src="/assets/images/rembugan-logo.svg" alt="rembugan logo" />
            <h1 className="font-semibold text-slate-800 text-2xl lg:text-3xl">Welcome to Rembugan!</h1>
            <h2 className="text-slate-800 text-base">{subtitle}</h2>
        </div>
    );
};

export default Title;
