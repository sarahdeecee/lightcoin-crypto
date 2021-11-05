class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    if (this.amount >= 0) {
      console.log(`Success! deposited ${this.amount}`);
      return true;
    } else {
      console.log(`Please deposited a non-negative amount.`);
      return false;
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      console.log(`Success! Withdrew ${this.amount}`);
      return true;
    } else {
      console.log("Insufficient funds.");
      return false;
    }
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
    	balance += transaction.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW

const myAccount = new Account("snow-patrol");

console.log("Withdrawing $50.25 ...");
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Balance:', myAccount.balance);

console.log("Depositing $120.00 ...");
t2 = new Deposit(120.00, myAccount);
t2.commit();
console.log('Balance:', myAccount.balance);

console.log("Withdrawing $9.99 ...");
t3 = new Withdrawal(9.99, myAccount);
t3.commit();
console.log('Balance:', myAccount.balance);
