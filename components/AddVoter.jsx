import {useMoralis, useWeb3Contract } from "react-moralis";
import { Button, Input, Table, useNotification} from 'web3uikit';
import {useEffect, useState} from "react";
import {contractAddress} from "./utils/ContractAddress";
import {owner} from "./utils/ContractOwner";

export default function AddVoter() {
    const [address, setAddress] = useState('');
    const [arrayAddress, setArrayAddress] = useState([]);
    const { account } = useMoralis();

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
            <div className="flex flex-row justify-between">
                <div className="input-add-voter mr-2">
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
                </div>
                <div className="btn-add-voter ml-2">
                    { account.toLocaleLowerCase() === owner.toLocaleLowerCase() ? (
                        <Button
                            text='Ajouter le voter'
                            theme='primary'
                            type='button'
                            size='large'
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
                </div>
            </div>
            <div className="table mt-5 mb-5 w-full">
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
        </div>
    );
}
