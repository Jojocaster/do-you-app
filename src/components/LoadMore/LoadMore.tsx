import { ActivityIndicator, StyleSheet, View } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'

export const LoadMore: React.FC<{
  canLoadMore: boolean
  isLoading: boolean
}> = ({ canLoadMore, isLoading }) => {
  const theme = useColorScheme()

  if (isLoading) {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={Colors[theme].primary} />
      </View>
    )
  }

  if (!canLoadMore) {
    return null
  }

  return null
}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
