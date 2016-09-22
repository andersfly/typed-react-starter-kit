import ReactDOM from 'react-dom'
import {Dictionary, Domain} from './types'
import {configureStore, configureRouter} from './configure'
import {register as storiesRegister} from './stories'

const domains: Dictionary<Domain> = {
  'stories': storiesRegister()
}
const store = configureStore(domains);
const router = configureRouter(store, domains, '/stories')

ReactDOM.render(router, document.getElementById('app-container'))
