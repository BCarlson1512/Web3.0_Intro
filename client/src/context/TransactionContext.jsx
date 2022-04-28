import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({provider, signer, transactionContract});
}

export const TransactionProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState(null);
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
        <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </TransactionContext.Provider>
    )
}