import React from 'react'
import ResultsList from '../results-list/ResultsList'
import { TSection } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: TSection) => (
  <div className="add-section">
    <div className="add-section__title">{name}</div>
    <ResultsList entityType={type} items={items} />
  </div>
)

export default Section
