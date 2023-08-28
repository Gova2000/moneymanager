// Write your code here

import './index.css'

const Card = props => {
  const {profile, click} = props
  const {amount, title, type, id} = profile

  const Del = () => {
    click(id, amount, type)
  }

  return (
    <>
      <li className="ll">
        <p className="cell1">{title}</p>

        <p className="cell1">Rs {amount}</p>

        <p className="cell1">{type}</p>
        <button className="bt" data-testid="delete" type="button" onClick={Del}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
            alt="delete"
            className="im"
          />
        </button>
      </li>
    </>
  )
}

export default Card
