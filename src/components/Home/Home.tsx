import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { StyledHome } from './Home.styles'

export const Home: React.FC = ({ children }) => {
  const theme = useColorScheme()
  return (
    <StyledHome style={{ backgroundColor: Colors[theme].background }}>
      {children}
    </StyledHome>
  )
}
