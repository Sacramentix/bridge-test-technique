import axios from "axios";
import type { Account, AccountWithTransaction, GetAccounts, GetTransactions, Routes, Transaction } from "./type";
import { env } from "./env";

/**
 * Call the api with api key
 * @param route that we will fetch
 * @returns the data returned by the api 
 */
export async function dsagueApi(route:Routes) {
    return axios.get(env.API_ENDPOINT+route, {headers:{" X-API-KEY": env.API_KEY}}).then(r=>r.data);
}

/**
 * Get All accounts
 * @returns an array with all accounts
 * note: The api still return a links.next even if there is no more accounts.
 * So it throw an error because we get to query a ressource that doesn't exist
 */
export async function getAllAccounts():Promise<Account[]> {
    const accounts = new Map<string, Account>();
    let result: GetAccounts;
    try {
        do {
            result = await dsagueApi(result?.links?.next ?? "/accounts");
            result.accounts.forEach(a=>accounts.set(a.acc_number,a));
        } while (result?.links?.next != null);
    } catch(e) {}

    return [...accounts.values()];
}

/**
 * Get all transactions of an account
 * @param acc_number the account number
 * @returns an array with all transactions of the account
 * note: The api still return a links.next even if there is no more accounts.
 * So it throw an error because we get to query a ressource that doesn't exist
 */
export async function getAccountTransactions(acc_number:string):Promise<Transaction[]>  {
    const transactions = new Map<string, Transaction>();
    let result: GetTransactions;
    try {
        do {
            result = await dsagueApi(result?.links?.next ?? `/accounts/${acc_number}/transactions`);
            result.transactions.forEach(t=>transactions.set(t.id,t));
        } while (result?.links?.next != null);
    } catch(e) {}

    return [...transactions.values()];
}
/**
 * Get all accounts with their transactions
 * @returns an array with all accounts with their transactions
 */
export async function getAccountsWithTransactions():Promise<AccountWithTransaction[]> {
    const accounts = await getAllAccounts();
    const accountsWithTransactions = await Promise.all(
        accounts.map(async a =>
            ({
                ...a,
                transactions: await getAccountTransactions(a.acc_number)
            })
    ));
    return [...accountsWithTransactions.values()];
}