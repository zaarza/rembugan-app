type TAuthTitle = {
    title: string;
    subtitle: string;
};

const AuthTitle = (props: TAuthTitle) => {
    const { title, subtitle } = props;

    return (
        <div className='header flex flex-col gap-y-2'>
            <img
                className='w-14'
                src='/assets/images/rembugan-logo.svg'
                alt='rembugan logo'
            />
            <h1 className='font-semibold text-slate-800 text-2xl lg:text-3xl'>{title}</h1>
            <h2 className='text-slate-800 text-base'>{subtitle}</h2>
        </div>
    );
};

export default AuthTitle;
