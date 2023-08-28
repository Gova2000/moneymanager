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
    amount: 0,
    title: '',
    list: [],
    type: '',
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

    if (type === 'Income') {
      this.setState(prev => ({income: prev.income + amount}))
      this.setState(prev => ({balance: prev.balance + amount}))
    } else {
      this.setState(prev => ({expenses: prev.expenses + amount}))

      this.setState(prev => ({balance: prev.balance - amount}))
    }

    this.setState(prev => ({
      list: [...prev.list, newdet],
      title: '',
      amount: '',
    }))
  }

  title = event => {
    this.setState({title: event.target.value})
  }

  amount = event => {
    this.setState({amount: event.target.value})
  }

  del = (id, amount) => {
    const {list} = this.state
    const filt = list.filter(each => each.id !== id)

    this.setState(prev => ({balance: prev.balance + amount}))
    this.setState(prev => ({expenses: prev.expenses - amount}))

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
          <form onSubmit={this.add}>
            <div className="formdiv">
              <h1 className="h1">Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                value={title}
                placeholder="TITLE"
                onChange={this.title}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                value={amount}
                id="amount"
                placeholder="AMOUNT"
                onChange={this.amount}
              />
              <label htmlFor="type">TYPE</label>
              <select id="type" onChange={this.change}>
                {transactionTypeOptions.map(each => (
                  <option key={each.optionId} value={each.displayText}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </div>
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
