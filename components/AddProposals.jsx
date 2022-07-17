import {Button, Input, useNotification} from "web3uikit";
import {useState} from "react";
import {useWeb3Contract} from "react-moralis";
import {contractAddress} from "./utils/ContractAddress";
// import { handleSuccess, handleError } from "./utils/NotificationWeb3";

export default function AddProposals() {
    const [proposal, setProposal] = useState('')

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

    const handleChange = event => {
        setProposal(event.target.value);
    };

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
                        "internalType": "string",
                        "name": "_desc",
                        "type": "string"
                    }
                ],
                "name": "addProposal",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "addProposal",
        params: {
            _desc: proposal,
        }
    })

    return (
        <div>
            <div className="add-proposal">
                <Input
                    id='getVoter'
                    onChange={handleChange}
                    iconPosition="front"
                    label="Insérez votre proposition"
                    name="Test text Input"
                    prefixIcon="book"
                    type="text"
                />

                <Button
                    text='Ajouter la proposition'
                    theme='primary'
                    type='button'
                    icon='triangleUp'
                    onClick={async () =>
                        await voting({
                            onSuccess: (msg) => {
                                handleSuccess(msg, 'Votre proposition a bien été  soumise', 'Information', 'check')
                            },
                            onError: (err) => {
                                handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
                                console.log(err)
                            }
                        })
                    }
                />
            </div>
        </div>
    )
}
