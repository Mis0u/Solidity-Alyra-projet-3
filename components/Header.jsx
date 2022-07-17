import {useMoralis} from "react-moralis";
import {useEffect, useState} from "react";
import AddVoter from "./AddVoter";
import GetVoter from "./GetVoter";
import WorkflowStatus from "./WorkflowStatus";

export default function Header() {
    const { enableWeb3, account, isWeb3EnableLoading, isWeb3Enabled, Moralis } = useMoralis();

    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window != 'undefined') {
            if (window.localStorage.getItem('status')) {
                enableWeb3();
            }
        }
    },[isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged(account => {
            if (null === account) {
                window.localStorage.removeItem('status');
                deactivateWeb3();
            }
        }, [])
    })

    return (
        <div>
            { account  ? (
                <div>
                    <p title={account}>
                        {`${account.slice(0,8)}...${account.slice(account.length - 4)}`}
                    </p>
                    <AddVoter/>

                    <GetVoter />
                    <WorkflowStatus/>
                </div>
            ) : (
                <div>
                    <button
                        onClick={async () => {
                            await enableWeb3();
                            window.localStorage.setItem('status', 'connected');
                        }}
                        disabled={isWeb3EnableLoading}
                    >
                        Connect
                    </button>
                </div>
            ) }
        </div>
    )
}
