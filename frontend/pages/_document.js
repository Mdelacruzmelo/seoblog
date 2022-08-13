import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {

    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            </Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document