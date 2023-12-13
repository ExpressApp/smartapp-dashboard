import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ReactComponent as Drag } from '../../../assets/icons/drag.svg'
import { ReactComponent as Remove } from '../../../assets/icons/remove.svg'
import Avatar from '../../avatar/Avatar'
import { changeDashboardItemsOrder, removeItemFromDashboard } from '../../../redux/actions/dashboard'
import { AVATAR_SIZE } from '../../../constants/constants'
import { DashboardItem } from '../../../types/types'
import { reorderItems } from '../../../helpers'
import './ResultsList.scss'

interface ResultsListProps {
  type: string
  initialItems: DashboardItem[]
}

const ResultsList = ({ type, initialItems }: ResultsListProps) => {
  const [items, setItems] = useState(initialItems)
  const dispatch = useDispatch()

  const handleRemoveItem = (item: DashboardItem) => {
    setItems((prevItems) => prevItems.filter(({ id }) => id !== item.id))
    dispatch(removeItemFromDashboard({ entityId: item.id, entityType: type }))
  }

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const updatedItems = reorderItems(items, result.source.index, result.destination.index)

    setItems(updatedItems)
    dispatch(changeDashboardItemsOrder({ entityType: type, entities: updatedItems }))
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={type}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="drag-drop-results-list">
            {items.map((item, index: number) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="drag-drop-results-list__item"
                  >
                    <div>
                      <Drag />
                      <Avatar avatarSrc={item.avatar} itemType={type} itemName={item.name} size={AVATAR_SIZE.small} />
                      <div>{item.name}</div>
                    </div>
                    <Remove onClick={() => handleRemoveItem(item)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ResultsList