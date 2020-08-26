import Transaction from '../models/Transaction';

interface TransactionsDTO {
  title:string,
  value:number,
  type: "income" | "outcome";
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const  { income, outcome } = this.transactions.reduce(
    (acumulador: Balance, transaction: Transaction ) => {
      switch (transaction.type){
        case 'income':
          acumulador.income += transaction.value;
          break;
        case 'outcome':
          acumulador.outcome += transaction.value;
          break;
        default:
          break;
      }
      return acumulador;
    },
    {
      income: 0,
      outcome:0,
      total:0
    }
    );
    return {income, outcome, total:income - outcome}
  }

  public create({title, value, type}:TransactionsDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    
      this.transactions.push(transaction);

      return transaction
  }
}

export default TransactionsRepository;
