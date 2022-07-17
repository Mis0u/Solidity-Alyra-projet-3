import '../styles/globals.css'
import {MoralisProvider} from "react-moralis";
import {NotificationProvider} from "web3uikit";

function MyApp({ Component, pageProps }) {
    return (
        <NotificationProvider>
            <MoralisProvider serverUrl="https://e9wi7t68l0yn.usemoralis.com:2053/server" appId="Kz51Yh0jtA16EExcIDGupfeb5BZnbfPCyPhARWRj">
                <Component {...pageProps} />
            </MoralisProvider>
        </NotificationProvider>
  )
}

export default MyApp
