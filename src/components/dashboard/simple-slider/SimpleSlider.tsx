import React, { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import Avatar from '../../avatar/Avatar'
import { openSmartApp } from '../../../redux/actions/dashboard'
import { getIsDisconnectedStatus, getLayoutType } from '../../../redux/selectors/ui'
import { SECTION_TYPE, LAYOUT_TYPES } from '../../../constants/constants'
import { DashboardItem } from '../../../types/types'
import './SimpleSlider.scss'

type TSimpleSlider = {
  items: DashboardItem[]
}

const MAX_SLIDES_TO_SHOW = {
  [LAYOUT_TYPES.minimal]: 3,
  [LAYOUT_TYPES.half]: 6,
  [LAYOUT_TYPES.full]: 9,
}

const SimpleSlider = ({ items }: TSimpleSlider) => {
  const dispatch = useDispatch()

  const isDisconnectedStatus = useSelector(getIsDisconnectedStatus)
  const layoutType = useSelector(getLayoutType)

  const numberOfItems = items.length

  const [mouseDownClientX, setMouseDownClientX] = useState<number | null>(null)
  const [mouseDownClientY, setMouseDownClientY] = useState<number | null>(null)

  const generateSlidesToShow = (maxSlidesToShow: number) => (numberOfItems > maxSlidesToShow ? maxSlidesToShow : numberOfItems)

  const sliderSettings: Settings = {
    arrows: false,
    dots: true,
    speed: 500,
    slidesToShow: generateSlidesToShow(MAX_SLIDES_TO_SHOW[layoutType]),
    slidesToScroll: MAX_SLIDES_TO_SHOW[layoutType],
  }

  const handleMouseDown = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownClientX(clientX)
    setMouseDownClientY(clientY)
  }

  const handleOpenSmartApp = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement>, appId?: string) => {
    if (mouseDownClientX !== clientX || mouseDownClientY !== clientY || !appId || isDisconnectedStatus) return
    dispatch(openSmartApp(appId))
  }

  return (
    <Slider {...sliderSettings} className={classNames('slider', 'simple-slider')}>
      {items.map(({ id, appId, name, avatar }) => (
        <div
          key={id}
          className={classNames('simple-slider__item', { 'simple-slider__item--disabled': isDisconnectedStatus })}
          onMouseDown={handleMouseDown}
          onClick={(event) => handleOpenSmartApp(event, appId)}
        >
          <Avatar avatarSrc={avatar} itemType={SECTION_TYPE.services} />
          <h5>{name}</h5>
        </div>
      ))}
    </Slider>
  )
}

export default SimpleSlider
