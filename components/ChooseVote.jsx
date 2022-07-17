import {Button, Input, useNotification} from "web3uikit";
import {useWeb3Contract} from "react-moralis";
import {useState, useEffect} from "react";
import {contractAddress} from "./utils/ContractAddress";


export default function ChooseVote() {
    const [vote, setVote] = useState('')

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
        setVote(event.target.value);
    };

    const {
        runContractFunction: voting,
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
                "name": "setVote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "setVote",
        params: {
            _id: vote,
        }
    })

    return (
        <div>
            <div className="add-vote">
                <Input
                    id='getVoter'
                    onChange={handleChange}
                    iconPosition="front"
                    label="Insérez l'id de la proposition"
                    name="Test text Input"
                    prefixIcon="list"
                    type="text"
                />

                <Button
                    text='Voter pour cette proposition'
                    theme='primary'
                    type='button'
                    icon='triangleUp'
                    onClick={async () =>
                        await voting({
                            onSuccess: (msg) => {
                                handleSuccess(msg, 'Votre vote a bien été soumis', 'Information', 'check')
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
