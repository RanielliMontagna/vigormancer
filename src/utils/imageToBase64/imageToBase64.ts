import { Asset } from 'expo-asset'
import * as FileSystem from 'expo-file-system'

export async function convertImageToBase64(image: any): Promise<string> {
  try {
    // Carregar o asset e obter a URI local
    const asset = Asset.fromModule(image)
    await asset.downloadAsync() // Necessário para garantir que a imagem foi baixada

    // Ler a imagem como base64
    const base64Image = await FileSystem.readAsStringAsync(asset.localUri!, {
      encoding: FileSystem.EncodingType.Base64,
    })

    return `data:image/png;base64,${base64Image}`
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error)
    return ''
  }
}
