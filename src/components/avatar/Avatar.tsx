import React from 'react'
import classNames from 'classnames'
import { Avatar as SUIAvatar } from '@expressms/smartapp-ui'
import { isServiceType } from '../../helpers'
import { AVATAR_SIZE, AVATAR_SIZE_VALUE } from '../../constants/constants'
import { ReactComponent as ServiceIcon } from '../../assets/icons/service.svg'
import './Avatar.scss'

type TAvatar = {
  avatarSrc: string | null
  itemType: string
  itemName?: string
  size?: AVATAR_SIZE
}

const Avatar = ({ avatarSrc, itemType, itemName = '', size = AVATAR_SIZE.normal }: TAvatar) => {
  const isSmallAvatar = size === AVATAR_SIZE.small

  const generateClassName = () => classNames('avatar', { avatar__small: isSmallAvatar })

  if (isServiceType(itemType))
    return avatarSrc ? <img className={generateClassName()} src={avatarSrc} alt="" /> : <ServiceIcon className={generateClassName()} />

  return <SUIAvatar avatar={avatarSrc} username={itemName} size={AVATAR_SIZE_VALUE[size]} />
}

export default Avatar
