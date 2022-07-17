import { useWeb3ExecuteFunction, useWeb3Contract} from "react-moralis";
import {useEffect, useState} from "react";
import {Button, Input, Modal, useNotification} from "web3uikit";
import {contractAddress} from "./utils/ContractAddress";

export default function GetVoter() {
    const [address, setAddress] = useState('');
    const [voterInfo, setVoterInfo] = useState(null);

    const dispatch = useNotification();

    const handleError = async function (tx, message, title, icon) {
        await tx;
        handleNotificationError(tx, message, title, icon)
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

    const resetVoterInfo = function () {
        setVoterInfo(null)
    }

    const {
        runContractFunction: voting,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
            abi: [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_addr",
                            "type": "address"
                        }
                    ],
                    "name": "getVoter",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "bool",
                                    "name": "isRegistered",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "bool",
                                    "name": "hasVoted",
                                    "type": "bool"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "votedProposalId",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Voting.Voter",
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
        functionName: "getVoter",
        params: {
            _addr: address,
        }
    })

    const handleChange = event => {
        setAddress(event.target.value);
    };

    return (
        <div>
            <Input
                id='getVoter'
                onChange={handleChange}
                iconPosition="front"
                label="Insérez une adresse"
                name="Test text Input"
                prefixIcon="eth"
                type="text"
            />

            <Button
                text='Renseignement sur cette adresse'
                theme='primary'
                type='button'
                icon='triangleUp'
                onClick={async () =>
                    await voting({
                        onSuccess: (mess) => {
                            setVoterInfo(mess)
                        },
                        onError: (err) => {
                            handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
                        }
                    })
                }
            />
            <div>
                {null !== voterInfo ? (
                    <Modal
                        okText="OK"
                        hasCancel={false}
                        onCloseButtonPressed={resetVoterInfo}
                        onOk={resetVoterInfo}
                        title={`Information concernant l\'adresse ${address}`}
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: '1em',
                                textAlign: 'center'
                            }}
                        >
                            {!voterInfo.isRegistered ? ('Cette adresse n\'est pas enregistrée') : ('Cette adresse est enregistrée')}
                        </p>
                        <p
                            style={{
                                fontWeight: 600,
                                marginRight: '1em',
                                textAlign: 'center'
                            }}
                        >
                            {voterInfo.hasVoted ? ('Cette adresse a voté') : ('Cette adresse n\'a pas voté')}
                        </p>
                        {voterInfo.hasVoted ?? (
                            <p>
                                {`ID de la proposition: ${voterInfo.votedProposalId}`}
                            </p>
                        )}
                    </Modal>
                ) : ('')
                }
            </div>
        </div>
    );
}
