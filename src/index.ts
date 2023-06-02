import { inspect } from "node:util";
import { getAllAccounts, getAccountsWithTransactions } from "./dsague/api";

const main = async () => {
  console.log(
    "getAllAccounts : ",
    await getAllAccounts()
  );
  console.log(
    "getAccountsWithTransactions : ",
    // We can use inspect to print to the result object deeply (without [Object] in transactions)
    inspect(await getAccountsWithTransactions(), false, null, true)  
  );
};

main();
