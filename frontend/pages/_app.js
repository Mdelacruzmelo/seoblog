import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/styles.css'

const App = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App