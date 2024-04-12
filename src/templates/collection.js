import '../scss/collection.scss'
import { defaultSortBy } from '../components/sort-by'
import { toggleDataActive } from '../utils/toggle-dataset'
import { rangeFilters } from '../components/filters-range'

defaultSortBy()
rangeFilters()

toggleDataActive(
  '#filter-open-js',
  '#filter',
  {
    overlay: true,
    closeSelector: '.filter-close-js'
  }
)
