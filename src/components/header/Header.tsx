import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Header as SUIHeader } from '@expressms/smartapp-ui'
import SyncLoader from '../sync-loader/SyncLoader'
import { getPlatform } from '../../redux/selectors/ui'
import { TEXT_SIZE } from '../../constants/constants'
import './Header.scss'

type THeader = {
  title: string
  isBack?: boolean
  textSize?: TEXT_SIZE
  additionalIcons?: TAdditionalIcon[]
  onClickBack?: () => void
}

type TAdditionalIcon = { icon: ReactElement; onClick: () => void }

const Header = ({ title, isBack = false, textSize, additionalIcons, onClickBack }: THeader) => {
  const platform = useSelector(getPlatform)

  return (
    <div>
      <SUIHeader platform={platform} isBack={isBack} textSize={textSize} title={title} customIcon={additionalIcons} onClickBack={onClickBack} />
      <SyncLoader />
    </div>
  )
}

export default Header
