import {Button, Input, Modal, useNotification} from "web3uikit";
import {useState} from "react";
import {useWeb3Contract} from "react-moralis";
import {contractAddress} from "./utils/ContractAddress";
// import { handleSuccess, handleError } from "./utils/NotificationWeb3";

export default function GetProposal() {
    const [proposalInfo, setProposalInfo] = useState(null)
    const [idProposal, setIdProposal] = useState(null)

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

    const resetProposalInfo = function () {
        setProposalInfo(null)
    }

    const handleChange = event => {
        setIdProposal(event.target.value);
    };

    const {
        runContractFunction: proposalInfoId,
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
            _id: idProposal,
        }
    })

    return (
        <div>
            <div className="get-proposal">
                <h1>Découvrez une proposition</h1>
                <Input
                    id='getProposal'
                    onChange={handleChange}
                    iconPosition="front"
                    label="Insérez l'id d'une proposition"
                    name="Test text Input"
                    prefixIcon="book"
                    type="text"
                />

                <Button
                    text='Accéder à la proposition'
                    theme='primary'
                    type='button'
                    icon='triangleUp'
                    onClick={async () =>
                        await proposalInfoId({
                            onSuccess: (msg) => {
                                setProposalInfo(msg)
                            },
                            onError: (err) => {
                                handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
                            }
                        })
                    }
                />

                <div>
                    {null !== proposalInfo ? (
                        <Modal
                            okText="OK"
                            hasCancel={false}
                            onCloseButtonPressed={resetProposalInfo}
                            onOk={resetProposalInfo}
                            title={'Information concernant la proposition'}
                        >
                            <p
                                style={{
                                    fontWeight: 600,
                                    marginRight: '1em',
                                    textAlign: 'center'
                                }}
                            >
                                {proposalInfo.description ? (`Description : ${proposalInfo.description}`) : ('Aucune description')}
                            </p>
                            <p
                                style={{
                                    fontWeight: 600,
                                    marginRight: '1em',
                                    textAlign: 'center'
                                }}
                            >
                                {proposalInfo.voteCount ? (`Nombre de vote reçu : ${parseInt(proposalInfo.voteCount)}`) : ('Cette adresse n\'a pas voté')}
                            </p>
                        </Modal>
                    ) : ('')
                    }
                </div>
            </div>
        </div>
    )
}
