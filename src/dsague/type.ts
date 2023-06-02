export type Currency = "EUR" | "USD";

export type PageParams = `?page=${string}`;

export type AccountsRoute = `/accounts${PageParams | ""}`;

export type TransactionsRoute = `/accounts/${string}/transactions${PageParams | ""}`;

export type Routes = "/health" | "/applications" | AccountsRoute | TransactionsRoute

export type Account = {
    acc_number: string;
    amount: number;
    currency: Currency;
}

export type GetAccounts = {
    accounts: Account[],
    links: { self: AccountsRoute , next?: AccountsRoute }
}

export type TransactionSign = "CDT" | "DBT";

export type Transaction = {
    id: string,
    label: string,
    sign: TransactionSign,
    amount: number,
    currency: Currency
  }

export type GetTransactions = {
    transactions: Transaction[],
    links: { self: TransactionsRoute , next?: TransactionsRoute }
}

export type GetAccountsAggregate = Account & {
    transactions: Transaction[];
}