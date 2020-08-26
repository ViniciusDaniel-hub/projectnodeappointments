import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: "income" | "outcome"  
};

class CreateTransactionService {
  private transactionRepository: TransactionsRepository;

  constructor(transactionsRepository : TransactionsRepository) {
    this.transactionRepository = transactionsRepository;
  }

  

  public execute({title, value, type}: Request): Transaction {
    const { total } = this.transactionRepository.getBalance();
    if(type === 'outcome' && total < value ) {
      throw new Error('Saldo insuficiente.');
    }
    const transaction = this.transactionRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  };
};

  export default CreateTransactionService; 

