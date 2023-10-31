import './global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link
                    rel='preconnect'
                    href='https://fonts.googleapis.com'
                />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin='anonymous'
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'
                    rel='stylesheet'
                />
            </head>
            <body
                className='font-poppins bg-primary/5 max-w-screen-xl mx-auto'
                id='body'
            >
                {children}
            </body>
        </html>
    );
}
