import React from 'react'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../avatar/Avatar'
import { addItemToDashboard, removeItemFromDashboard } from '../../../redux/actions/dashboard'
import { getIsDisconnectedStatus } from '../../../redux/selectors/ui'
import { isChatType, isContactType, isServiceType } from '../../../helpers'
import { AVATAR_SIZE } from '../../../constants/constants'
import { DashboardItem } from '../../../types/types'
import { ReactComponent as CorporateIcon } from '../../../assets/icons/corporate.svg'
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg'
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg'
import './ResultsList.scss'

type TResultsList = {
  entityType: string
  items: DashboardItem[]
}

const ResultsList = ({ entityType, items }: TResultsList) => {
  const dispatch = useDispatch()
  const isDisconnectedStatus = useSelector(getIsDisconnectedStatus)

  const handleAddItem = (entity: DashboardItem) => {
    if (isDisconnectedStatus) return
    dispatch(addItemToDashboard({ entity, entityType }))
  }

  const handleRemoveItem = (entityId: string) => {
    if (isDisconnectedStatus) return
    dispatch(removeItemFromDashboard({ entityId, entityType }))
  }

  return (
    <div className="results-list">
      {items.map((item) => {
        const { id, name, avatar, description, isAlreadyAdded } = item

        return (
          <div key={id} className={classNames('results-list__item', { 'results-list__item--disabled': isDisconnectedStatus })}>
            <Avatar avatarSrc={avatar} itemType={entityType} itemName={name} size={AVATAR_SIZE.small} />
            {isServiceType(entityType) ? (
              <div className="results-list__item--name">{name}</div>
            ) : (
              <div className={classNames('results-list__item--common-info', { 'results-list__item--centered-info': isChatType(entityType) })}>
                <CorporateIcon />
                <div>
                  <div className="results-list__item--name">{name}</div>
                  {isContactType(entityType) && <div className="results-list__item--description">{description}</div>}
                </div>
              </div>
            )}
            {isAlreadyAdded ? <DeleteIcon onClick={() => handleRemoveItem(id)} /> : <PlusIcon onClick={() => handleAddItem(item)} />}
          </div>
        )
      })}
    </div>
  )
}

export default ResultsList
