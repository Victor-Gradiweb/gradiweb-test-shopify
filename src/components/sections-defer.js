import { openAccordion } from '../utils/accordion'
import { $Q } from '../utils/query-selector'
import { createInterception } from '../utils/script-defer'
import { initVideoFrame } from './video-frame'

export const sectionsLoadDefer = () => {
  const accordions = $Q('.accordions')
  const videoModal = $Q('.video__button')

  if (accordions) createInterception(accordions, () => openAccordion())
  if (videoModal) createInterception(videoModal, () => initVideoFrame())
}
