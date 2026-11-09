import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { View } from '../Themed'
import { StyledHome } from './Home.styles'

export const Home: React.FC = ({ children }) => {
  const theme = useColorScheme()
  return (
    <View
      style={{
        backgroundColor: Colors[theme].background,
        height: '100%',
        paddingTop: 25,
      }}
    >
      {children}
    </View>
  )
}
