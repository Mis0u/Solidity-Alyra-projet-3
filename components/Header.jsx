import {useMoralis} from "react-moralis";
import {useEffect, useState} from "react";
import AddVoter from "./AddVoter";
import GetVoter from "./GetVoter";
import WorkflowStatus from "./WorkflowStatus";
import {ConnectButton} from "web3uikit";

export default function Header() {
    const { enableWeb3, account, isWeb3EnableLoading, isWeb3Enabled, Moralis } = useMoralis();
    const owner="0x3e7729aBcE92aA0d91C7aF994ebb2461d2ea2dF2";

    return (
        <div>
            <ConnectButton />
            { account  ? (
                <div>
                    <AddVoter/>
                    <GetVoter />
                    <WorkflowStatus account={account} owner={owner}/>
                </div>
            ) : ('') }
        </div>
    )
}
