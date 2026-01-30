export enum Month {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December"
}

export interface ItemModel {
  itemName: string;
  quantity: number;
  amount: string;
  purchaseDate: string;
  month: Month;
  remarks: string;
}
