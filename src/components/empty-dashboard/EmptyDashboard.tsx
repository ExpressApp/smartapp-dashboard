import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES_PATH } from '../../constants/constants'
import './EmptyDashboard.scss'

const EmptyDashboard = () => (
  <div className="empty-dashboard">
    <div className="empty-dashboard__text">Ваш дашборд пуст</div>
    <Link className="empty-dashboard__link" to={`/${ROUTES_PATH.add}`}>Перейти к добавлению</Link>
  </div>
)

export default EmptyDashboard