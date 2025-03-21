import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import classNames from 'classnames'
import Avatar from '../../avatar/Avatar'
import { changeDashboardItemsOrder, removeItemFromDashboard } from '../../../redux/actions/dashboard'
import { getIsDisconnectedStatus } from '../../../redux/selectors/ui'
import { reorderItems } from '../../../helpers'
import { AVATAR_SIZE } from '../../../constants/constants'
import { DashboardItem } from '../../../types/types'
import { ReactComponent as DragIcon } from '../../../assets/icons/drag.svg'
import { ReactComponent as RemoveIcon } from '../../../assets/icons/remove.svg'
import './ResultsList.scss'

type TResultsList = {
  entityType: string
  initialItems: DashboardItem[]
}

const ResultsList = ({ entityType, initialItems }: TResultsList) => {
  const [items, setItems] = useState(initialItems)
  const dispatch = useDispatch()
  const isDisconnectedStatus = useSelector(getIsDisconnectedStatus)

  const handleRemoveItem = (entityId: string) => {
    if (isDisconnectedStatus) return
    setItems((prevItems) => prevItems.filter(({ id }) => id !== entityId))
    dispatch(removeItemFromDashboard({ entityId, entityType }))
  }

  const handleOnDragEnd = ({ source: { index: startIndex }, destination }: DropResult) => {
    if (!destination) return

    const { index: endIndex } = destination
    const entities = reorderItems({ items, startIndex, endIndex })

    setItems(entities)
    dispatch(changeDashboardItemsOrder({ entityType, entities }))
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={entityType} isDropDisabled={isDisconnectedStatus}>
        {({ droppableProps, innerRef: droppableInnerRef, placeholder }) => (
          <div {...droppableProps} ref={droppableInnerRef} className="drag-drop-results-list">
            {items.map(({ id, name, avatar }, index) => (
              <Draggable key={id} draggableId={id} index={index} isDragDisabled={isDisconnectedStatus}>
                {({ draggableProps, dragHandleProps, innerRef: draggableInnerRef }) => (
                  <div
                    {...draggableProps}
                    {...dragHandleProps}
                    ref={draggableInnerRef}
                    className={classNames('drag-drop-results-list__item', { 'drag-drop-results-list__item--disabled': isDisconnectedStatus })}
                  >
                    <div>
                      <DragIcon />
                      <Avatar avatarSrc={avatar} itemType={entityType} itemName={name} size={AVATAR_SIZE.small} />
                      <div className="drag-drop-results-list__item--name">{name}</div>
                    </div>
                    <RemoveIcon onClick={() => handleRemoveItem(id)} />
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ResultsList
