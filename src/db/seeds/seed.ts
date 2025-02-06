import Abdominals from '@/assets/images/categories/abdominals.png'
import Back from '@/assets/images/categories/back.png'
import Biceps from '@/assets/images/categories/biceps.png'
import Calves from '@/assets/images/categories/calves.png'
import Chest from '@/assets/images/categories/chest.png'
import Legs from '@/assets/images/categories/legs.png'
import Shoulders from '@/assets/images/categories/shoulders.png'
import Triceps from '@/assets/images/categories/triceps.png'

import { convertImageToBase64 } from '@/utils'
import exercises from '@/locales/en/exercises.json'

import { createExercise } from '../controllers/exercises/create-exercise'
import { createCategory } from '../controllers/categories/create-category'
import { fetchCategories } from '../controllers/categories/fetch-categories'
import { ExerciseType } from '../repositories/exercises'

const categories = [
  { name: 'abdominals', image: Abdominals },
  { name: 'back', image: Back },
  { name: 'biceps', image: Biceps },
  { name: 'calves', image: Calves },
  { name: 'chest', image: Chest },
  { name: 'legs', image: Legs },
  { name: 'shoulders', image: Shoulders },
  { name: 'triceps', image: Triceps },
]

export async function seedDatabase() {
  try {
    for (const category of categories) {
      const base64Image = await convertImageToBase64(category.image)

      await createCategory({ name: category.name, image: base64Image })
      console.log(`Categoria "${category.name}" inserida com sucesso!`)
    }

    const categoriesArray = await fetchCategories()

    for (const [key, exercise] of Object.entries(exercises)) {
      console.log(`Inserindo exercício "${exercise.title}"...`)

      await createExercise({
        id: exercise.id,
        categoryId: categoriesArray.find((category) => category.name === exercise.category).id,
        name: key,
        image: exercise.img,
        type: ExerciseType.STRENGTH,
      })
    }

    console.log('Seed do banco de dados finalizado com sucesso!')
  } catch (error) {
    console.error('Erro ao fazer o seed do banco de dados:', error)
  }
}
