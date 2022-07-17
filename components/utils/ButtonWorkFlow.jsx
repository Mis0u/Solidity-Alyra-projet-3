import {useWeb3Contract} from "react-moralis";
import {Button} from "web3uikit";
import {useEffect, useState} from "react";

export default function ButtonWorkflow({ workflowName }) {
    const [buttonName, setButtonName] = useState('')

    useEffect(() => {
        handleButtonName()
        console.log('workflow',workflowName)
    },[buttonName])

    const {
        runContractFunction: voting,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": workflowName,
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: '0x8D550e2604A354A8246F6851605078A4d5d200fe',
        functionName: workflowName,
        params: {},
    })

    const handleButtonName = () => {
        switch (workflowName) {
            case 'startProposalsRegistering': setButtonName('Débuter les propositions')
                break;
            case 'endProposalsRegistering': setButtonName('Arrêter les propositions')
                break;
            case 'startVotingSession': setButtonName('Débuter les votes')
                break;
            case 'endVotingSession': setButtonName('Arrêter les votes')
                break;
            case 'tallyVotes': setButtonName('éplucher les votes')
                break;
        }

        return buttonName;
    }

    return(
        <div>
            <Button
                text={buttonName}
                theme='primary'
                type='button'
                icon='roadmap'
                onClick={async () =>
                    await voting({
                        onSuccess: (val) => {
                            handleButtonName()
                            console.log(val)
                        },
                        onError: (err) => {
                            console.log(err)
                        }
                    })
                }
            />
        </div>
    )
}
