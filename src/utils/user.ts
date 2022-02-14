import { Account } from "../../generated/schema";

export function ensureUserCreated(address: string): void {
    let user = Account.load(address);
    if (user == null) {
        user = new Account(address);
        user.save();
    }
}
