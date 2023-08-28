// Write your code here
import './index.css'

const MoneyDet = props => {
  const {inc, exp, bln} = props

  return (
    <div className="mai">
      <div className="money bln">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="col">
          <p className="p">Your Balance</p>
          <p data-testid="balanceAmount" className="p1">
            Rs {bln}
          </p>
        </div>
      </div>
      <div className="money inc">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="col">
          <p className="p">Your Income</p>
          <p data-testid="incomeAmount" className="p1">
            Rs {inc}
          </p>
        </div>
      </div>
      <div className="money exp">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png "
          alt="expenses"
        />
        <div className="col">
          <p className="p">Your Expenses</p>
          <p data-testid="expensesAmount" className="p1">
            Rs {exp}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDet
