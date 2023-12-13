import React from 'react'
import SimpleSlider from '../simple-slider/SimpleSlider'
import RowsSlider from '../rows-slider/RowsSlider'
import { SECTION_TYPE } from '../../../constants/constants'
import { SectionProps } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: SectionProps) => (
  <div className="dashboard-section">
    <div className="dashboard-section__title">{name}</div>
    {type === SECTION_TYPE.services ? <SimpleSlider items={items} /> : <RowsSlider type={type} items={items} />}
  </div>
)

export default Section