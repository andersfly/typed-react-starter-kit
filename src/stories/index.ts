import {root as reducer} from './reducers'
import {root as saga} from './sagas'
import {getRoutes} from './routes'

export const register = () => {
  return {saga, reducer, getRoutes}
}
