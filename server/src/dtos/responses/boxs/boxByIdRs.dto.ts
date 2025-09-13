export default interface BoxByIdRs {
    profileName: string;
    proviceName: string;
    countyName: string;
    baseIncome: number;
    financialBurden: FinancialBurden | null;
    financialRemaining: FinancialRemaining | null;
}

export interface FinancialBurden {
    amount: number;
    financialItems: FinanceialItem[]
}

export interface FinancialRemaining {
    amount: number;
    financialItems: FinanceialItem[]
}

export interface FinanceialItem {
    id: number;
    itemName: string;
    amount: number;
    photoCoverUrl: string;
}