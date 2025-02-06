import categories from './categories.json'
import exercises from './exercises.json'
import general from './translation.json'

const translations = {
  ...categories,
  ...exercises,
  ...general,
}

export default translations
