import { render } from '@testing-library/react-native'

import { ExerciseCard } from './exerciseCard'

const mockProps = {
  id: '1',
  workoutId: '1',
  categoryId: '1',
  categoryName: 'Chest',
  exerciseId: 1,
  exerciseName: 'Bench Press',
  repetitions: 10,
  sets: 3,
  weight: 60,
  rest: 60,
  updatedAt: '2021-09-01T00:00:00.000Z',
  createdAt: '2021-09-01T00:00:00.000Z',
}

describe('ExerciseCard', () => {
  it('should render correctly', () => {
    const { toJSON } = render(<ExerciseCard {...mockProps} />)

    expect(toJSON()).toBeDefined()
  })
})
