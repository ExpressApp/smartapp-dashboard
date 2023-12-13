import React from 'react'
import { Header } from '@expressms/smartapp-ui'
import SyncLoader from '../sync-loader/SyncLoader'
import './Header.scss'

interface HeaderComponentProps {
  title: string
  isBack?: boolean
  additionalIcons?: React.ReactElement
  onClickBack?: () => void
}

const HeaderComponent = ({ title, isBack = false, additionalIcons, onClickBack }: HeaderComponentProps) => {
  if (additionalIcons) {
    return (
      <div>
        <div className="header">
          <div className="header__title">
            {title}
          </div>
          <div className="header__additional-icons">
            {additionalIcons}
          </div>
        </div>
        <SyncLoader />
      </div>
    )
  }

  return <Header title={title} isBack={isBack} onClickBack={onClickBack} />
}

export default HeaderComponent