import {Button} from "web3uikit";
import {useWeb3Contract} from "react-moralis";
import {useEffect, useState} from "react";
import ButtonWorkflow from "./utils/ButtonWorkFlow";

export default function ChangeWorkflow({ workflowStatus }) {
    const [workflowName, setWorkflowName] = useState('');

    useEffect(() => {
        handleWorkflowName()
    }, [workflowStatus])

    const handleWorkflowName =  () => {
        switch (workflowStatus.toString()) {
            case '0': setWorkflowName('startProposalsRegistering')
                break;
            case '1': setWorkflowName('endProposalsRegistering')
                break;
            case '2': setWorkflowName('startVotingSession')
                break;
            case '3': setWorkflowName('endVotingSession')
                break;
            case '4': setWorkflowName('tallyVotes')
                break;
        }

        return workflowName;
    }

    console.log('button', workflowStatus);

    return <ButtonWorkflow workflowName={workflowName}  />

}
