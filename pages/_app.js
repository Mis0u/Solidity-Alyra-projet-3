import '../styles/globals.css'
import {MoralisProvider} from "react-moralis";
import {NotificationProvider} from "web3uikit";

function MyApp({ Component, pageProps }) {

    return (
        <NotificationProvider>
            <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER} appId={process.env.NEXT_PUBLIC_MORALIS_ID}>
                <Component {...pageProps} />
            </MoralisProvider>
        </NotificationProvider>
  )
}

export default MyApp
