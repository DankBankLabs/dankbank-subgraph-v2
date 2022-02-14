import { BigInt } from "@graphprotocol/graph-ts";

import { TransactionType } from "./constants";
import { Transaction } from "../../generated/schema";

export function createTransaction(
    id: string,
    userAddress: string,
    tokenAddress: string,
    amount: BigInt,
    outputAmount: BigInt[],
    transactionType: TransactionType,
    timestamp: BigInt
  ): Transaction {
  
    if (outputAmount.length < 1) {
      throw new TypeError("`outputAmount` cannot be empty");
    }
  
    let txn = new Transaction(id);
    txn.timestamp = timestamp;
    txn.inAmount = amount;
    txn.user = userAddress;
    txn.token = tokenAddress;
    txn.outAmount = outputAmount;
    txn.transactionType = transactionType.toString();
    return txn;
  }