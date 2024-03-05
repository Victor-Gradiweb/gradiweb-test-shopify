import { $Q } from '../utils/query-selector'
import { createInterception } from '../utils/script-defer'
import { toggleDataActive } from '../utils/toggle-dataset'
import { isRegisteredUser } from './news-letters'

export const headerFooterDefer = () => {
  const formNewLetter = $Q('#NewsletterForm--footer')

  toggleDataActive('#burger-nav-js', '#nav-list-js')

  if (formNewLetter) {
    createInterception(formNewLetter, () => isRegisteredUser())
  }
}
