import {useMoralis} from "react-moralis";
import AddVoter from "./AddVoter";
import GetVoter from "./GetVoter";
import WorkflowStatus from "./WorkflowStatus";
import {ConnectButton} from "web3uikit";
import {owner} from "./utils/ContractOwner";

export default function Header() {
    const { enableWeb3, account, isWeb3EnableLoading, isWeb3Enabled, Moralis } = useMoralis();

    return (
        <div className='h-screen'>
            <div className="flex justify-end mt-2 mb-4">
                <ConnectButton />
            </div>
            { account  ? (
                <div className='flex flex-col mt-5'>
                    <AddVoter/>
                    <div className='flex flex-row'>
                        <GetVoter />
                        <WorkflowStatus account={account} owner={owner}/>
                    </div>
                </div>
            ) : ('') }
        </div>
    )
}
