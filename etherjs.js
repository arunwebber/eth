const ethers = require('ethers');

// Replace with your Infura project ID
const infuraProjectId = '';

// Initialize the provider with Infura URL
const infuraUrl = `https://mainnet.infura.io/v3/${infuraProjectId}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

// 1. Check if a wallet address is valid
function isValidAddress(address) {
    return ethers.utils.isAddress(address);
}

// 2. Create a new wallet
function createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
}

// 3. Get the latest 1000 Ethereum transactions sorted by ether quantity
async function getLatestTransactions() {
    const latestBlockNumber = await provider.getBlockNumber();
    const startBlock = Math.max(latestBlockNumber - 1000, 0);

    const transactions = [];
    for (let i = startBlock; i <= latestBlockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i);
        transactions.push(...block.transactions);
    }

    const formattedTransactions = transactions.map(tx => ({
        transactionHash: tx.hash,
        sender: tx.from,
        receiver: tx.to,
        amount: ethers.utils.formatEther(tx.value),
        blockNumber: tx.blockNumber
    }));

    const sortedTransactions = formattedTransactions.sort((a, b) => b.amount - a.amount);
    return sortedTransactions;
}

// Example usage
const walletAddress = '0xYourWalletAddressHere';
const isAddressValid = isValidAddress(walletAddress);
console.log(`Is ${walletAddress} a valid Ethereum address? ${isAddressValid}`);

const newWallet = createWallet();
console.log('New Wallet Address:', newWallet.address);
console.log('New Wallet Private Key:', newWallet.privateKey);

getLatestTransactions().then(transactions => {
    console.log('Latest Ethereum Transactions:');
    console.log(transactions);
});
