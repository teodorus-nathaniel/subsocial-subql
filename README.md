# Subsocial Subql
This project is made using Subquery's starter template.
This project is used to index subsocial blockchain (defaults to soonsocial (subsocial's testnet)), to calculate each users' reputation.

# Public Server
Currently there is 2 server running for indexing both mainnet and testnet. These servers are not reliable as I maybe will shut it down.
1. [http://108.136.47.177:3000/](http://108.136.47.177:3000/) which indexes testnet (from block 369,000)
2. [http://108.136.230.159:3000/](http://108.136.230.159:3000/) which indexes mainnet (from block 655,000)

# Change to index mainnet
To change the defaults to index mainnet instead of testnet, you have to:
1. open [project.yaml](project.yaml)
2. change the network => chainId to `0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8`
3. change the network => endpoint to `wss://rpc.subsocial.network`

# How to run
1. yarn
2. yarn codegen
3. yarn build
4. yarn start:docker

Note: step 4, sometimes will fail to run, you need to check the docker logs. Usually the error is just the gql server can't listen to the indexer, so just wait until the indexer starting to fetches block and rerun step 4 to relaunch the gql server.
