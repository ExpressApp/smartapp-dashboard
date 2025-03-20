import React, { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import Avatar from '../../avatar/Avatar'
import { openContactCard, openGroupChat } from '../../../redux/actions/dashboard'
import { getIsDisconnectedStatus, getIsFullLayoutType, getIsMinimalLayoutType, getLayoutType } from '../../../redux/selectors/ui'
import { isChatType } from '../../../helpers'
import { LAYOUT_TYPES } from '../../../constants/constants'
import { DashboardItem } from '../../../types/types'
import { ReactComponent as CorporateIcon } from '../../../assets/icons/corporate.svg'
import { ReactComponent as PrevArrowIcon } from '../../../assets/icons/prev-arrow.svg'
import { ReactComponent as NextArrowIcon } from '../../../assets/icons/next-arrow.svg'
import './RowsSlider.scss'

type TRowsSlider = {
  type: string
  items: DashboardItem[]
}

const NextArrow = ({ className, style, onClick }: any) => <NextArrowIcon className={className} style={{ ...style }} onClick={onClick} />
const PrevArrow = ({ className, style, onClick }: any) => <PrevArrowIcon className={className} style={{ ...style }} onClick={onClick} />

const SLIDES_TO_SCROLL = {
  [LAYOUT_TYPES.minimal]: 1,
  [LAYOUT_TYPES.half]: 2,
  [LAYOUT_TYPES.full]: 3,
}

const SLIDES_TO_SHOW = {
  threeColumns: 3,
  twoColumns: 2,
  oneColumn: 1,
}

const SLIDER_ROWS_COUNT = 3
const NUMBER_OF_ELEMENTS_IN_TWO_COLUMNS = 6
const NUMBER_OF_ELEMENTS_IN_ONE_COLUMN = 3

const RowsSlider = ({ type, items }: TRowsSlider) => {
  const dispatch = useDispatch()

  const layoutType = useSelector(getLayoutType)
  const isDisconnectedStatus = useSelector(getIsDisconnectedStatus)
  const isFullLayoutType = useSelector(getIsFullLayoutType)
  const isMinimalLayoutType = useSelector(getIsMinimalLayoutType)

  const [mouseDownClientX, setMouseDownClientX] = useState<number | null>(null)
  const [mouseDownClientY, setMouseDownClientY] = useState<number | null>(null)

  const numberOfItems = items.length

  const isLastItem = (itemIndex: number) => itemIndex === numberOfItems - 1
  const generateSlidesToShow = (maxSlidesToShow: number) => (numberOfItems > SLIDER_ROWS_COUNT ? maxSlidesToShow : 1)

  const generateFullscreenSlidesToShow = () => {
    if (numberOfItems > NUMBER_OF_ELEMENTS_IN_TWO_COLUMNS) return SLIDES_TO_SHOW.threeColumns
    return numberOfItems > NUMBER_OF_ELEMENTS_IN_ONE_COLUMN ? SLIDES_TO_SHOW.twoColumns : SLIDES_TO_SHOW.oneColumn
  }

  const handleMouseDown = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownClientX(clientX)
    setMouseDownClientY(clientY)
  }

  const handleItemClick = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (mouseDownClientX !== clientX || mouseDownClientY !== clientY || isDisconnectedStatus) return
    isChatType(type) ? dispatch(openGroupChat(id)) : dispatch(openContactCard(id))
  }

  const sliderSettings: Settings = {
    dots: true,
    speed: 500,
    rows: SLIDER_ROWS_COUNT,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: isFullLayoutType ? generateFullscreenSlidesToShow() : generateSlidesToShow(SLIDES_TO_SCROLL[layoutType]),
    slidesToScroll: SLIDES_TO_SCROLL[layoutType],
  }

  return (
    <Slider
      {...sliderSettings}
      className={classNames('slider', 'rows-slider', {
        'rows-slider__w-50': !isMinimalLayoutType && numberOfItems <= SLIDER_ROWS_COUNT,
      })}
    >
      {items.map(({ id, name, description, avatar }, index) => (
        <div
          key={id}
          className={classNames('rows-slider__item', {
            'rows-slider__item--is-last': isLastItem(index),
            'rows-slider__item--disabled': isDisconnectedStatus,
          })}
          onMouseDown={handleMouseDown}
          onClick={(event) => handleItemClick(event, id)}
        >
          <Avatar avatarSrc={avatar} itemType={type} itemName={name} />
          <div className="rows-slider__item--info">
            <div className="rows-slider__item--name">
              <CorporateIcon />
              <h4>{name}</h4>
            </div>
            {description && <h6>{description}</h6>}
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default RowsSlider
