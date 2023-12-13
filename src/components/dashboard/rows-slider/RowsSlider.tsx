import React from 'react'
import Slider from 'react-slick'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { ReactComponent as Corporate } from '../../../assets/icons/corporate.svg'
import { ReactComponent as Prev } from '../../../assets/icons/prev-arrow.svg'
import { ReactComponent as Next } from '../../../assets/icons/next-arrow.svg'
import Avatar from '../../avatar/Avatar'
import { openContactCard, openGroupChat } from '../../../redux/actions/dashboard'
import { DashboardItem } from '../../../types/types'
import { SECTION_TYPE, SLIDER_ROWS_COUNT } from '../../../constants/constants'
import './RowsSlider.scss'

interface RowsSliderProps {
  type: string
  items: DashboardItem[]
}

const NextArrow = ({ className, style, onClick }: any) => <Next className={className} style={{ ...style }} onClick={onClick} />
const PrevArrow = ({ className, style, onClick }: any) => <Prev className={className} style={{ ...style }} onClick={onClick} />

const RowsSlider = ({ type, items  }: RowsSliderProps) => {
  const dispatch = useDispatch()

  const sliderSettings = {
    dots: true,
    speed: 500,
    rows: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: items.length > SLIDER_ROWS_COUNT ? 2 : 1,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  }

  const handleItemClick = (id: string) => {
    type === SECTION_TYPE.chats ? dispatch(openGroupChat(id)) : dispatch(openContactCard(id))
  }

  const isLastItem = (itemIndex: number) => itemIndex === items.length - 1

  return (
    <Slider {...sliderSettings} className="slider rows-slider">
      {items.map(({ id, name, description, avatar }, index) => (
        <div key={id} className="rows-slider__item" onClick={() => handleItemClick(id)}>
          <Avatar avatarSrc={avatar} itemType={type} itemName={name} />
          <div
            className={classNames({
              'rows-slider__item--info': true,
              'rows-slider__item--info__is-last': isLastItem(index),
            })}
          >
            <div className="rows-slider__item--name">
              <Corporate />
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