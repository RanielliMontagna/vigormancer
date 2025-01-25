import categories from './categories.json'
import general from './translation.json'
import exercises from './exercises.json'

const translations = {
  ...categories,
  ...exercises,
  ...general,
}

export default translations
