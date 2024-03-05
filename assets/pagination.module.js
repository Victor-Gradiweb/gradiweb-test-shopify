import './pagination.scss'
import { initPagination } from './pagination.core'
import { infinityScroll } from './pagination-infinity.submodule'

/**
 * modules required: [buttonLoadMore || infinityScroll]
 * modules optionals (import "./component-card-product.module";)
 */
initPagination({
  modules: [infinityScroll]
})
