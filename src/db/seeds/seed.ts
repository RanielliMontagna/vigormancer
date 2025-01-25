import { createCategory } from '../controllers/categories/create-category'

import Abdominals from '@/assets/images/categories/abdominals.png'
import Back from '@/assets/images/categories/back.png'
import Biceps from '@/assets/images/categories/biceps.png'
import Calves from '@/assets/images/categories/calves.png'
import Chest from '@/assets/images/categories/chest.png'
import Legs from '@/assets/images/categories/legs.png'
import Shoulders from '@/assets/images/categories/shoulders.png'
import Triceps from '@/assets/images/categories/triceps.png'
import { convertImageToBase64 } from '@/utils'

const categories = [
  { name: 'Abdominals', image: Abdominals },
  { name: 'Back', image: Back },
  { name: 'Biceps', image: Biceps },
  { name: 'Calves', image: Calves },
  { name: 'Chest', image: Chest },
  { name: 'Legs', image: Legs },
  { name: 'Shoulders', image: Shoulders },
  { name: 'Triceps', image: Triceps },
]

export async function seedDatabase() {
  try {
    for (const category of categories) {
      const base64Image = await convertImageToBase64(category.image)

      await createCategory({ name: category.name, image: base64Image })
      console.log(`Categoria "${category.name}" inserida com sucesso!`)
    }
  } catch (error) {
    console.error('Erro ao fazer o seed do banco de dados:', error)
  }
}

seedDatabase().catch(console.error)
