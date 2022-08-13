import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {

    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
            </Head>
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.1/css/bootstrap.min.css" /> */}
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document