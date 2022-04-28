import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [formData, setFormData] = useState({addressTo: '', amount: '', message: '', keyword: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name] : e.target.value}));
    }

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install metamask");

        const accounts = await ethereum.request({method: 'eth_accounts'});
        
        try {
            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                // get all transactions 
            } else {
                console.log("no accounts found")
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const {addressTo, amount, keyword, message} = formData;
            const transactionContract = getEthereumContract();
            const parsedAmt = ethers.utils.parseEther(amount);

            await ethereum.request({method: 'eth_sendTransaction',
                params: [{
                    from: connectedAccount, 
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmt._hex, // dec to hex
                    }]
                });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmt, message, keyword);
            setIsLoading(true);
            console.log(`Loading... ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success... ${transactionHash.hash}`);
            
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (err) {
            console.error(err.message);
            throw new Error("No Ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    }

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, handleChange, formData, setFormData, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}