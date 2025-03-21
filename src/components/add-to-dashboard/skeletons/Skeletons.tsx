import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Skeleton } from '@expressms/smartapp-ui'
import { getTheme } from '../../../redux/selectors/ui'
import {
  CIRCLE_SKELETON_SIZE,
  CONTACTS_SECTION_INDEX,
  NUMBER_OF_CONTACTS_SKELETONS,
  NUMBER_OF_SKELETONS,
  SKELETON_HEIGHT,
} from '../../../constants/constants'
import './Skeletons.scss'

const Skeletons = () => {
  const skeletonsRef = useRef<HTMLDivElement>(null)
  const theme = useSelector(getTheme)

  return (
    <div className="skeletons">
      {[NUMBER_OF_SKELETONS, NUMBER_OF_SKELETONS, NUMBER_OF_CONTACTS_SKELETONS].map((length, sectionIndex) => (
        <div key={sectionIndex} ref={skeletonsRef} className="skeletons__section">
          <Skeleton className="skeletons__section--title" theme={theme} containerRef={skeletonsRef} height={SKELETON_HEIGHT} />
          <div className="skeletons__section--items">
            {Array.from({ length }).map((_, itemIndex) =>
              sectionIndex === CONTACTS_SECTION_INDEX ? (
                <div key={itemIndex} className="skeletons__section--items__item">
                  <Skeleton theme={theme} containerRef={skeletonsRef} width={CIRCLE_SKELETON_SIZE} height={CIRCLE_SKELETON_SIZE} circle />
                  <div className="skeletons__section--items__item--info">
                    {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, infoItemIndex) => (
                      <Skeleton key={infoItemIndex} theme={theme} containerRef={skeletonsRef} height={SKELETON_HEIGHT} />
                    ))}
                  </div>
                </div>
              ) : (
                <div key={itemIndex} className="skeletons__section--items__item">
                  <Skeleton theme={theme} containerRef={skeletonsRef} width={CIRCLE_SKELETON_SIZE} height={CIRCLE_SKELETON_SIZE} circle />
                  <Skeleton theme={theme} containerRef={skeletonsRef} height={SKELETON_HEIGHT} />
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Skeletons
