import React from 'react'
import { isEmpty } from 'lodash'
import ResultsList from '../results-list/ResultsList'
import { MAX_SECTION_ITEMS } from '../../../constants/constants'
import { TSection } from '../../../types/types'
import './Section.scss'

const Section = ({ name, type, items }: TSection) => (
  <div className="settings-section">
    <div className="settings-section__title">
      <div>{name}</div>
      <div>
        {items.length}/{MAX_SECTION_ITEMS}
      </div>
    </div>
    {!isEmpty(items) && <ResultsList entityType={type} initialItems={items} />}
  </div>
)

export default Section
