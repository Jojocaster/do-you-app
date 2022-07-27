import { ActivityIndicator, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

export const LoadMore: React.FC<{
  canLoadMore: boolean
  loadMore: () => void
  isLoading: boolean
}> = ({ canLoadMore, isLoading, loadMore }) => {
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

  return (
    <TouchableOpacity onPress={loadMore}>
      <View
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors[theme].primary,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}
        >
          Load more
        </Text>
      </View>
    </TouchableOpacity>
  )
}
