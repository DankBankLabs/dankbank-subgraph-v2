# Dank Bank Market Subgraph v2

This subgraph dynamically tracks events emitted from the Dank Bank Market smart contract and Meme ERC20 contracts.

## Subgraphs
Markets: https://thegraph.com/hosted-service/subgraph/dankbanklabs/markets-v2?query=Liquidity%20Pools

Portfolio: https://thegraph.com/hosted-service/subgraph/dankbanklabs/portfolio-v1

## Unit Testing

While we wait for true unit testing to be developed for [TheGraph](www.thegraph.com) this system provides a good environment for running a local version of the governance contracts on Ganache-cli, with a local dockerized subgraph that can be called from the tests.

### Test folder Structure

Inside the test folder are:

    - queries.ts    // The Subgraph queries that are called by the test
    - test.ts       // The actual tests
    - types.ts      // Types for the code
    - utils.ts      // Utils for managing a local subgraph node
    - YAML.ts       // Template for generated YAML file

### Getting started

Download `ganache-cli`. Ganache is a command line tool to simulate a blockchain for local testing. We're going to use it to test the subgraph on. To making testing easier, ganache creates a blockchain where a number of accounts have ETH that you can use. By default these acccounts are generated with a random mnemonic but you can also reuse a mnemonic which is recommended for testing and touched on below.

`yarn global add ganache-cli`

Now download the dependencies for this repository.

`yarn`

Next create the subgraph for either `mainnet`, `goerli`, `matic`, `mumbai` or `localhost` with the following command (see `package.json` for all the options).

`yarn prepare:goerli`

Templates for the subgraph mainfest are found in the following files:

- ./maticSubgraph.template.yaml
- ./subgraph.template.yaml

The schemas are found in the folder:

- ./schemas/

Variables to be used for the generation of the manifest are found in the folder:

- ./templates/

After, generate the types for the schema and contract ABIs. The graph cli generates this code to make interacting with entities and contracts as easy as possible. You'll need to run this command after making changes to either the ABIs or the schema.graphql.

`yarn codegen`

Lastly, build the graph. It is recommended to run this after making changes to the handlers because you'll catch syntax errors quicker than if you were to run the tests.

`yarn build`

### Unit Tests

#### Dependencies

1. [ganache-cli](https://www.npmjs.com/package/ganache-cli)
2. [docker](https://formulae.brew.sh/formula/docker)
3. [hardhat](https://hardhat.org/getting-started/)

Start `ganache-cli` in one terminal window. Copy the `mnemonic` that is generated. In the future you can start ganache with `ganache-cli --mnemonic "twelve words including quotes"` to start ganache.

Edit the `.env` file to hold your `mnemonic`. A sample `sample.env` is included.

In a new terminal window, navigate to `/docker`. Once `ganache-cli` is running, start the graph node with `docker-compose up` command.

In another terminal window, run the command `yarn test`. This should start the test files which should:

    1) Compile the smart contracts
    2) Deploy the smart contracts to `ganache-cli`
    3) Generate a new YAML file using the addresses of the deployed contracts
    4) Run `codegen` to generate the Graph node artifacts
    5) Run `build` to build the Assembly script wasm code
    6) Deploy the built subgraph to the local node
    7) Start running actual tests, waiting for the subgraph to synch, performing a query returning the result.
    8) Remove the local subgraph to start fresh.

Whew! Thats a lot. There might be some tweaks to get it started, but once it's running it seems pretty reliable, and it's been a lifesaver!
-dennison

## Deploying

Run the following commands:

If you haven't authenticated with Graph yet

```
$ graph auth --product hosted-service <ACCESS_TOKEN>

$ yarn deploy
```

If you need to deploy to a different subgraph

```
$ graph deploy --product hosted-service dankbanklabs/<SUBGRAPH NAME>

```

## Queries

Check out the [querying api](https://thegraph.com/docs/graphql-api). These queries can be used locally or in our Graph Explorer playground found [here](https://thegraph.com/legacy-explorer/subgraph/dankbanklabs/dank-bank-market).

## Resources

For more information on using the legacy explorer see these [docs](https://thegraph.com/docs/developer/deploy-subgraph-hosted)

## Debugging

1. Visit https://graphiql-online.com/
2. Enter https://api.thegraph.com/index-node/graphql as the endpoint
3. Query (where `"QmPrr..."` is the Subgraph's ID)

```graphql
{
  indexingStatuses(subgraphs: ["QmPrr..."]) {
    subgraph
    synced
    health
    entityCount
    fatalError {
      handler
      message
      deterministic
      block {
        hash
        number
      }
    }
    chains {
      chainHeadBlock {
        number
      }
      earliestBlock {
        number
      }
      latestBlock {
        number
      }
    }
  }
}
```

## Notes:

- The BatchAuction.sol contract has been modified to allow testing, hence the contract should only be used for testing purposes:
  - validation for `startTime` was removed in `initAuction` to allow setting to 0.
  - validation for `endTime` was removed in `finalize`.
- The ERC721TokenVault.sol contract has been modified to allow testing, hence the contract should only be used for testing purposes:
  - `_sendWETH` was removed in `bid()` to allow local testing without WETH contract deployed.
  - validation for `auctionEnd` was removed in `end()`.
