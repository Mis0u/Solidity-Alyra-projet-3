import { useWeb3Contract } from "react-moralis";
import {useState, useEffect} from "react";
import {useNotification, Button, Modal} from "web3uikit";
import Proposals from "./AddProposals";
import ChooseVote from "./ChooseVote";
import {contractAddress} from "./utils/ContractAddress";

export default function WorkflowStatus() {

    const [workflowStatus, setWorkflowStatus] = useState('');
    const [messageWorkflow, setMessageWorkflow] = useState('');
    const [winningProposalId, setWinningProposalId] = useState('');

    const dispatch = useNotification();

    useEffect( () => {
        async function test() {
            await voting({
                onSuccess: (value) => {
                    handleMessageWorkflow();
                    console.log('ici',value, workflowStatus)
                    if (value !== workflowStatus){
                        setWorkflowStatus(value)
                        handleMessageWorkflow();
                    }
                },
                onError: (err) => {
                    console.log(err)
                }
            })
        }
        test();
    })


    console.log('laa', workflowStatus, messageWorkflow)

    const handleMessageWorkflow = () => {
        switch (workflowStatus.toString()){
            case '0': setMessageWorkflow('L\'admin enregistre les participant(e)s')
                break;
            case '1': setMessageWorkflow('Les propositions sont ouvertes')
                break;
            case '2': setMessageWorkflow('Les propositions sont fermées')
                break;
            case '3': setMessageWorkflow('Les votes ont commencé')
                break;
            case '4': setMessageWorkflow('Les votes sont terminés')
                break;
            case '5': setMessageWorkflow('Comptage des votes')
                break;
            default: setMessageWorkflow('Une erreur s\'est produite')

        }

        return messageWorkflow;
    }

    const handleSuccess = async function (tx, type, message, title, icon) {
           await tx;
           handleNotification(tx, type, message, title, icon)
    }

    const handleNotification = function (tx, type, message, title, icon) {
        dispatch({
            type:type,
            message: message,
            title:title,
            position:"topR",
            icon:icon,
        })
    }

    const {
        runContractFunction: voting,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "workflowStatus",
                "outputs": [
                    {
                        "internalType": "enum Voting.WorkflowStatus",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
        ],
        contractAddress: contractAddress,
        functionName: "workflowStatus",
        params: {},
    })

    const {
        runContractFunction: proposalRegistering,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "startProposalsRegistering",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "startProposalsRegistering",
        params: {},
    })

    const {
        runContractFunction: proposalRegisteringStop,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "endProposalsRegistering",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "endProposalsRegistering",
        params: {},
    })

    const {
        runContractFunction: voteRegistering,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "startVotingSession",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "startVotingSession",
        params: {},
    })

    const {
        runContractFunction: voteEnding,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "endVotingSession",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "endVotingSession",
        params: {},
    })

    const {
        runContractFunction: voteTallied,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "tallyVotes",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "tallyVotes",
        params: {},
    })

    const {
        runContractFunction: winingProposal,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [],
                "name": "winningProposalID",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
        ],
        contractAddress: contractAddress,
        functionName: "winningProposalID",
        params: {},
    })

    const {
        runContractFunction: getProposal,
    } = useWeb3Contract({
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "getOneProposal",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "voteCount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct Voting.Proposal",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            },
        ],
        contractAddress: contractAddress,
        functionName: "getOneProposal",
        params: {
            _id: winningProposalId
        },
    })

    const resetWinningProposalId = () => {
        setWinningProposalId('')
    }

    return (
        <div>
            {'0' === workflowStatus.toString() ? (
                <Button
                    text='Commencer les propositions'
                    theme='primary'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await proposalRegistering({
                            onSuccess: (val) => {
                                setWorkflowStatus('1')
                                handleMessageWorkflow();
                                console.log('valerie',val)
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
            ): ('')}
            {'1' === workflowStatus.toString() ? (
                <Button
                    text='Arrêter les propositions'
                    theme='colored'
                    color='red'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await proposalRegisteringStop({
                            onSuccess: (val) => {
                                setWorkflowStatus('2')
                                handleMessageWorkflow();
                                console.log(val)
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
            ): ('')}
            {'2' === workflowStatus.toString() ? (
                <Button
                    text='Commencer les votes'
                    theme='primary'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await voteRegistering({
                            onSuccess: (val) => {
                                setWorkflowStatus('3')
                                handleMessageWorkflow();
                                console.log(val)
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
            ): ('')}
            {'3' === workflowStatus.toString() ? (
                <Button
                    text='Terminer les votes'
                    theme='colored'
                    color='red'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await voteEnding({
                            onSuccess: (val) => {
                                setWorkflowStatus('4')
                                handleMessageWorkflow();
                                console.log(val)
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
                ): ('')}

            {'4' === workflowStatus.toString() ? (
                <Button
                    text='Comptage des votes'
                    theme='primary'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await voteTallied({
                            onSuccess: (val) => {
                                setWorkflowStatus('5')
                                handleMessageWorkflow();
                                console.log(val)
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
            ): ('')}
            {'5' === workflowStatus.toString() ? (
                <Button
                    text='Dévoiler la proposition gagnante'
                    theme='primary'
                    type='button'
                    icon='roadmap'
                    disabled={isLoading || isFetching}
                    onClick={async () =>
                        await winingProposal({
                            onSuccess: (val) => {
                                handleMessageWorkflow();
                                setWinningProposalId(parseInt(val));
                                console.log('wpid',val, winningProposalId,'parse', parseInt(val))
                            },
                            onError: (err) => {
                                console.log(err)
                            }
                        })
                    }
                />
            ): ('')}
            {'1' === workflowStatus.toString() ? (
                <Proposals/>
            ) : ('')}
            {'3' === workflowStatus.toString() ? (
                <ChooseVote/>
            ) : ('')}

            <div>
                {'' !== winningProposalId ? (
                    <Modal
                        okText="ok"
                        hasCancel={false}
                        onCloseButtonPressed={resetWinningProposalId}
                        onOk={resetWinningProposalId}
                        title='Résultat de tirage'
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: '1em',
                                textAlign: 'center'
                            }}
                        >
                            {`La proposition gagnante est celle ayant l'id numéro : ${winningProposalId}`}
                        </p>
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: '1em',
                                textAlign: 'center'
                            }}
                        >
                            Merci de votre participation !
                        </p>
                    </Modal>
                ) : ('')
                }
            </div>

            <Button
                text='Information sur le workflow'
                theme='secondary'
                type='button'
                icon='info'
                disabled={isLoading || isFetching}
                onClick={async () =>
                    await voting({
                        onSuccess: (value) => {
                            if (value !== workflowStatus) setWorkflowStatus(value)
                            handleMessageWorkflow()
                            handleSuccess(value,'info', messageWorkflow, 'Status du Workflow', 'bell')
                        },
                        onError: (err) => {
                            console.log(err)
                        }
                    })
                }
            >
                Change status
            </Button>
        </div>
    );
}
