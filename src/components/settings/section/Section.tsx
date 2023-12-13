import React from 'react'
import { isEmpty } from 'lodash'
import ResultsList from '../results-list/ResultsList'
import { MAX_SECTION_ITEMS } from '../../../constants/constants'
import { SectionProps } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: SectionProps) => (
  <div className="settings-section">
    <div className="settings-section__title">
      <div>{name}</div>
      <div>{items.length}/{MAX_SECTION_ITEMS}</div>
    </div>
    {!isEmpty(items) && <ResultsList type={type} initialItems={items} />}
  </div>
)

export default Section