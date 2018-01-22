import { createFormGenerator } from '../../utils'
import store from '../..'
import TextInput from '../text-input'

export default createFormGenerator(
  { text: TextInput, number: TextInput },
  store
)
