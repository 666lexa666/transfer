export interface TransferForm {
  country: string;
  recipientName: string;
  bank: string;
  account: string;
  currency: string;
  amount: number;
}

export interface CurrencyRate {
  code: string;
  flag: string;
  rate: number;
  name: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}