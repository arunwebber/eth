# eth
# Make API server using two libraries.

## 1. ethers.js

1. returning boolean of wallet address is valid.
2. creating wallet
3. Get latest 1000 transaction of etherium, return the result sorted by etherium quantity.
datas
- Transaction hash,
- sender address
- receiver address
- amount of ether transferred
- block number

## 2.  cctx

1. get the list of coin which is tradable on Binance.
2. Get the list of each coin’s average price(**Average price of 100 recent transactions)**

   # to get this working.
   go to infura and create a project then replace project id by creating a new project.
   const infuraProjectId = '';
   Line number 4
   then node ether.js

   and node cctx.js

   it will give appropriate output to the console.
