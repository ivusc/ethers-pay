interface ITransaction {
  sender: string;
  receiver: string;
  amount: number;
  message: string;
  dateTime: Date;
  id: number;
}