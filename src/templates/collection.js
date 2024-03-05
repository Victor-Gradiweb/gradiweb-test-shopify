import '../scss/collection.scss'
import { defaultSortBy } from '../components/sort-by'
import { toggleDataActive } from '../utils/toggle-dataset'
import { rangeFilters } from '../components/filters-range'

defaultSortBy()
rangeFilters()

toggleDataActive(
  '#filter-open',
  '#filter',
  {
    overlay: true
  }
)

toggleDataActive(
  '.filter-form__name svg',
  '#filter',
  {
    overlay: true
  }
)
