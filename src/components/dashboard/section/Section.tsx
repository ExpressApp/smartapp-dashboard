import React from 'react'
import classNames from 'classnames'
import SimpleSlider from '../simple-slider/SimpleSlider'
import RowsSlider from '../rows-slider/RowsSlider'
import { isServiceType } from '../../../helpers'
import { TSection } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: TSection) => (
  <div className={classNames('dashboard-section', `dashboard-section__${type}`)}>
    <div className="dashboard-section__title">{name}</div>
    {isServiceType(type) ? <SimpleSlider items={items} /> : <RowsSlider type={type} items={items} />}
  </div>
)

export default Section
