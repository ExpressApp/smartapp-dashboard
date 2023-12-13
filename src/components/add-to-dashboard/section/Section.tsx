import React from 'react'
import ResultsList from '../results-list/ResultsList'
import { SectionProps } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: SectionProps) => (
  <div className="add-section">
    <div className="add-section__title">{name}</div>
    <ResultsList type={type} items={items} />
  </div>
)

export default Section