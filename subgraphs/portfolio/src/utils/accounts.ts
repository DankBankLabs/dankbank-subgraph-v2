import { Account } from "../../generated/schema";

export function ensureAccountCreated(address: string): void {
  let user = Account.load(address);
  if (user == null) {
    user = new Account(address);
    user.save();
  }
}
