import { useWeb3Contract } from "react-moralis";
import {useState, useEffect} from "react";
import {useNotification, Button, Modal} from "web3uikit";
import AddProposals from "./AddProposals";
import ChooseVote from "./ChooseVote";
import {contractAddress} from "./utils/ContractAddress";
import GetProposal from "./GetProposal";

export default function WorkflowStatus({account, owner}) {

    const [workflowStatus, setWorkflowStatus] = useState('');
    const [messageWorkflow, setMessageWorkflow] = useState('');
    const [winningProposalId, setWinningProposalId] = useState('');

    useEffect( () => {
        async function onChangeMessageWorflow() {
            await voting({
                onSuccess: (value) => {
                    handleMessageWorkflow();
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
        onChangeMessageWorflow();
    })


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

    const dispatch = useNotification();

    const handleSuccess = async function (tx, message, title, icon) {
        await tx;
        handleNotificationSuccess(tx, message, title, icon)
    }

    const handleError = async function (tx, message, title, icon) {
        await tx;
        handleNotificationError(tx, message, title, icon)
    }

    const handleNotificationSuccess = function (tx, message, title, icon) {
        dispatch({
            type:'info',
            message: message,
            title:title,
            position:"topR",
            icon:icon,
        })
    }

    const handleNotificationError = function (tx, message, title, icon) {
        dispatch({
            type:'error',
            message: message,
            title:title,
            position:"topR",
            icon:icon,
            iconColor:'red'
        })
    }

    const {
        runContractFunction: voting,
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
            }
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
                        "internalType": "uint128",
                        "name": "",
                        "type": "uint128"
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
        <div className='flex flex-col justify-center items-center w-full'>
            <div className={`mt-5 mb-5 flex flex-${'3' === workflowStatus.toString() ? 'col' : 'row'} justify-between w-full`}>
                {'1' === workflowStatus.toString() ? (
                    <AddProposals/>
                ) : ('')}
                {'3' === workflowStatus.toString() ? (
                    <div className="mt-5 mb-5">
                        <ChooseVote/>
                    </div>
                ) : ('')}
                {'3' === workflowStatus.toString() ? (
                    <GetProposal/>
                ) : ('')}
            </div>
            <div className="flex flex-row justify-between w-full">
                {account.toLocaleLowerCase() === owner.toLocaleLowerCase() ? (
                    <div className='button-workflow mr-3'>
                        {'0' === workflowStatus.toString() ? (
                            <Button
                                text='Commencer les propositions'
                                theme='primary'
                                type='button'
                                icon='roadmap'
                                size='large'
                                onClick={async () =>
                                    await proposalRegistering({
                                        onSuccess: (val) => {
                                            setWorkflowStatus('1')
                                            handleMessageWorkflow();
                                            handleSuccess(val, 'Les propositions vont débuter', `Changement de workflow`, 'bell')
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
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
                                size='large'
                                onClick={async () =>
                                    await proposalRegisteringStop({
                                        onSuccess: (val) => {
                                            setWorkflowStatus('2')
                                            handleMessageWorkflow();
                                            handleSuccess(val, 'Les propositions vont s\'arrêter', `Changement de workflow`, 'bell')
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
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
                                size='large'
                                onClick={async () =>
                                    await voteRegistering({
                                        onSuccess: (val) => {
                                            setWorkflowStatus('3')
                                            handleMessageWorkflow();
                                            handleSuccess(val, 'Les votes vont commencer', `Changement de workflow`, 'bell')
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
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
                                size='large'
                                onClick={async () =>
                                    await voteEnding({
                                        onSuccess: (val) => {
                                            setWorkflowStatus('4')
                                            handleMessageWorkflow();
                                            handleSuccess(val, 'Les votes vont s\'arrêter', `Changement de workflow`, 'bell')
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
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
                                size='large'
                                onClick={async () =>
                                    await voteTallied({
                                        onSuccess: (val) => {
                                            setWorkflowStatus('5')
                                            handleMessageWorkflow();
                                            handleSuccess(val, 'Comptage des votes', `Changement de workflow`, 'bell')
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
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
                                size='large'
                                onClick={async () =>
                                    await winingProposal({
                                        onSuccess: (val) => {
                                            handleMessageWorkflow();
                                            setWinningProposalId(parseInt(val));
                                        },
                                        onError: (err) => {
                                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
                                            console.log(err)
                                        }
                                    })
                                }
                            />
                        ): ('')}
                    </div>
                ) : ('')}
                <div className="btn-status-workflow">
                    <Button
                        text='Information sur le workflow'
                        theme='secondary'
                        type='button'
                        icon='info'
                        size='large'
                        onClick={async () =>
                            await voting({
                                onSuccess: (value) => {
                                    if (value !== workflowStatus) setWorkflowStatus(value)
                                    handleMessageWorkflow()
                                    handleSuccess(value,messageWorkflow, 'Status du Workflow', 'bell')
                                },
                                onError: (err) => {
                                    console.log(err)
                                }
                            })
                        }
                    />
                </div>
            </div>
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
        </div>
    );
}
