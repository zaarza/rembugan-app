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
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/assets/favicons/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/assets/favicons/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/assets/favicons/favicon-16x16.png'
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
