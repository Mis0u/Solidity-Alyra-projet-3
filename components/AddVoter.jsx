import {useMoralis, useWeb3Contract } from "react-moralis";
import { Button, Input, Table, useNotification} from 'web3uikit';
import {useEffect, useState} from "react";
import {contractAddress} from "./utils/ContractAddress";

export default function AddVoter() {
    const [address, setAddress] = useState('');
    const [arrayAddress, setArrayAddress] = useState([]);
    const { account, enableWeb3, isWeb3Enabled } = useMoralis();

    const owner = '0x3e7729aBcE92aA0d91C7aF994ebb2461d2ea2dF2';

    const dispatch = useNotification();

    const handleSuccess = async function (tx, type, message, title, icon) {
        await tx;
        handleNotificationSuccess(tx, type, message, title, icon)
    }

    const handleError = async function (tx, message, title, icon) {
        await tx;
        handleNotificationError(tx, message, title, icon)
    }

    const handleNotificationSuccess = function (tx, type, message, title, icon) {
        dispatch({
            type:type,
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

    useEffect(() => {
        setArrayAddress(arrayAddress)
    },[arrayAddress])

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
                "name": "addVoter",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
        ],
        contractAddress: contractAddress,
        functionName: "addVoter",
        params: {
            _addr: address,
        }
    })

    const handleChange = event => {
        setAddress(event.target.value);
    };


    return (
        <div>

            {account.toLocaleLowerCase() === owner.toLocaleLowerCase() ? (
                <Input
                    id='addVoter'
                    onChange={handleChange}
                    iconPosition="front"
                    label="Insérez une adresse"
                    name="Test text Input"
                    prefixIcon="eth"
                    type="text"
                />
            ): ('')}
            { account.toLocaleLowerCase() === owner.toLocaleLowerCase() ? (
                <Button
                    text='Ajouter le voter'
                    theme='primary'
                    type='button'
                    icon='arrowCircleDown'
                    onClick={async () =>
                        await voting({
                            onSuccess: (mess) => {
                                setArrayAddress((prevArray) =>[...prevArray, address])
                                handleSuccess(mess, 'info', `L\'adresse ${address} a bien été ajouté`, 'Ajout d\'une nouvelle adresse', 'bell')
                            },
                            onError: (err) => {
                                handleError(err, `${err.error ? err.error.message : err}`, 'Erreur', 'xCircle')
                            }
                        })
                    }
                />
            ) : ('') }
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={
                    arrayAddress.map((value) => (
                        [
                            value
                        ]
                    ))

                }
                header={['Adresse Enregistrée']}
                isColumnSortable={[
                    false,
                ]}
                noPagination
                pageSize={30}
            />
        </div>
    );
}
