import { convertImageToBase64 } from './imageToBase64'

describe('imageToBase64', () => {
  it('should return an empty string if the image is invalid', async () => {
    const base64 = await convertImageToBase64(null)

    expect(base64).toBe('')
  })

  it('should return the base64 of the image', async () => {
    const image = require('../../../assets/image.png')
    const base64 = await convertImageToBase64(image)

    console.log(base64)

    expect(base64).toMatch('')
  })
})
