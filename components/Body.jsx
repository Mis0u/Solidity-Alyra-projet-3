import {useMoralis} from "react-moralis";
import AddVoter from "./AddVoter";
import GetVoter from "./GetVoter";
import WorkflowStatus from "./WorkflowStatus";
import {ConnectButton} from "web3uikit";
import {owner} from "./utils/ContractOwner";

export default function Body() {
    const { account } = useMoralis();

    return (
        <div className='h-screen flex flex-col items-center	 justify-center'>
            <div className={account ? (
                "flex justify-center items-center mb-4"
            ) : ('flex justify-center items-center h-screen')}>
                <ConnectButton />
            </div>
            { account  ? (
                <div className='flex flex-col mt-5'>
                    <AddVoter/>
                    <div className='flex flex-col items-center justify-center'>
                        <GetVoter />
                        <WorkflowStatus account={account} owner={owner}/>
                    </div>
                </div>
            ) : ('') }
        </div>
    )
}
