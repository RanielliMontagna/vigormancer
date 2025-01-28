import { FC } from 'react'
import { Dimensions, View } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { H3, P } from '../ui/typography/typography'

interface EmptyStateProps {
  svgImage: FC<SvgProps>
  title: string
  subtitle: string
}

export function EmptyState({ title, subtitle, svgImage: Image }: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center">
      {Image && (
        <Image
          width={Dimensions.get('window').width * 0.5}
          height={Dimensions.get('window').width * 0.6}
        />
      )}
      <H3>{title}</H3>
      <P className="text-muted-foreground text-sm">{subtitle}</P>
    </View>
  )
}
