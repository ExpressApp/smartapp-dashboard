import React from 'react'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'
import { resetNotification } from '../../redux/actions/ui'
import './Notification.scss'

interface NotificationProps {
  isOpen: boolean
  type: string
}

const Notification = ({ isOpen, type }: NotificationProps) => {
  const dispatch = useDispatch()

  return (
    <Popup open={isOpen} onClose={() => dispatch(resetNotification())}>
      <div>{`Вы добавили максимальное количество ${type}`}</div>
    </Popup>
  )
}

export default Notification