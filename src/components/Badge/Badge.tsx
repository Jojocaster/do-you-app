import { StyleProp, ViewStyle } from 'react-native'
import { Text, View } from '../Themed'

export const Badge: React.FC<{
  backgroundColor: string
  color?: string
  children: string
  fontSize?: number
  style?: StyleProp<ViewStyle>
}> = ({ backgroundColor, color, children, style, fontSize }) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          paddingVertical: 4,
          paddingHorizontal: 6,
          borderRadius: 4,
        },
        style,
      ]}
    >
      <Text style={{ color, fontSize }}>{children}</Text>
    </View>
  )
}
