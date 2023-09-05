import {Component} from 'react'

import {v4} from 'uuid'

import MoneyDet from '../MoneyDetails'

import Card from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    balance: 0,
    amount: '',
    title: '',
    list: [],
    type: transactionTypeOptions[0].optionId,
  }

  change = event => {
    const {amount, income, title, balance, expenses, list, type} = this.state

    this.setState({type: event.target.value})
    console.log(event.value)
  }

  add = event => {
    event.preventDefault()
    const {amount, income, title, balance, expenses, list, type} = this.state

    const newdet = {
      id: v4(),
      income,
      expenses,
      balance,
      type,
      title,
      amount,
    }

    if (type === 'INCOME') {
      this.setState(prev => ({
        income: prev.income + parseInt(amount),
      }))
      this.setState(prev => ({
        balance: prev.balance + parseInt(amount),
      }))
    } else {
      this.setState(prev => ({
        expenses: prev.expenses + parseInt(amount),
      }))

      this.setState(prev => ({
        balance: prev.balance - parseInt(amount),
      }))
    }

    this.setState(prev => ({
      list: [...prev.list, newdet],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  title = event => {
    this.setState({title: event.target.value})
  }

  amount = event => {
    this.setState({amount: event.target.value})
  }

  del = (id, amount, type) => {
    const {list, income, balance, expenses} = this.state

    const filt = list.filter(each => each.id !== id)

    if (type === 'INCOME') {
      this.setState(prev => ({
        balance: prev.balance - parseInt(amount),
      }))
      this.setState(prev => ({
        income: prev.income - parseInt(amount),
      }))
    } else {
      this.setState(prev => ({
        balance: prev.balance - parseInt(amount),
      }))
      this.setState(prev => ({
        expenses: prev.expenses - parseInt(amount),
      }))
    }

    if (type === 'EXPENSES' && income > 0 && balance > 0) {
      this.setState(prev => ({
        expenses: prev.expenses - parseInt(amount),
      }))
      this.setState(prev => ({
        balance: prev.balance + parseInt(amount),
      }))
    } else if (expenses < 0 || expenses === 0) {
      this.setState({expenses: 0})
      this.setState({balance: 0})
    }
    if (type === 'EXPENSES' && balance < 0) {
      this.setState(prev => ({
        balance: prev.balance + parseInt(amount),
      }))
    }

    this.setState({list: filt})
  }

  render() {
    const {expenses, income, balance, amount, type, title, list} = this.state

    return (
      <div className="main">
        <div className="header">
          <h1 className="h1">Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDet inc={income} exp={expenses} bln={balance} />

        <div className="forms">
          <form onSubmit={this.add} className="formdiv">
            <h1 className="h1">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              value={title}
              placeholder="TITLE"
              onChange={this.title}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              value={amount}
              id="amount"
              placeholder="AMOUNT"
              onChange={this.amount}
            />
            <label htmlFor="type">TYPE</label>
            <select value={type} id="type" onChange={this.change}>
              {transactionTypeOptions.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>

          <ul className="unorder">
            <h1 className="h1">History</h1>

            <li className="li">
              <p className="cell">Title</p>
              <p className="cell">Amount</p>
              <p className="cell">Type</p>
            </li>
            {list.map(each => (
              <Card profile={each} key={each.id} click={this.del} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager

