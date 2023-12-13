import React from 'react'
import classNames from 'classnames'
import { Avatar } from '@expressms/smartapp-ui'
import { ReactComponent as Service } from '../../assets/icons/service.svg'
import { AVATAR_SIZE, SECTION_TYPE } from '../../constants/constants'
import './Avatar.scss'

interface AvatarComponentProps {
  avatarSrc: string | null
  itemType: string
  itemName?: string
  size?: AVATAR_SIZE
}

const AvatarComponent = ({ avatarSrc, itemType, itemName = '', size = AVATAR_SIZE.normal }: AvatarComponentProps) => {
  const isSmallAvatar = size === AVATAR_SIZE.small
  const isServiceType = itemType === SECTION_TYPE.services

  const getClassName = () => classNames({ 'avatar': true, 'avatar__service': isServiceType, 'avatar__small': isSmallAvatar })

  if (avatarSrc) {
    return <img className={getClassName()} src={avatarSrc} alt="" />
  }

  return isServiceType ? <Service className={getClassName()} /> : <Avatar username={itemName} widthHeight={isSmallAvatar ? 32 : 44} />
}

export default AvatarComponent