import { Platform, StyleSheet, Switch } from 'react-native'
import Colors from '../../constants/Colors'
import useColorScheme from '../../hooks/useColorScheme'
import { Text, View } from '../Themed'

const Beta: React.FC = ({ children }) => {
  return (
    <Text
      style={{
        fontSize: 8,
        fontWeight: 'bold',
        position: 'absolute',
        left: '102%',
        top: -2,
      }}
    >
      BETA
    </Text>
  )
}

export const SingleSetting: React.FC<{
  beta?: boolean
  disabled?: boolean
  onToggle: () => void
  value: any
}> = ({ children, beta = false, disabled = false, onToggle, value }) => {
  // scale Switch down on iOS
  const switchScale = Platform.OS === 'ios' ? 0.8 : 1
  const theme = useColorScheme()

  return (
    <View style={styles.view}>
      <View style={{ position: 'relative' }}>
        <Text>{children}</Text>
        {beta && <Beta />}
      </View>
      <Switch
        style={{ transform: [{ scale: switchScale }] }}
        disabled={disabled}
        value={value}
        trackColor={{
          true: disabled
            ? Colors[theme].switch.trackDisabled
            : Colors[theme].switch.trackActive,
          false: disabled
            ? Colors[theme].switch.trackDisabled
            : Colors[theme].switch.trackInactive,
        }}
        thumbColor={
          disabled
            ? Colors[theme].switch.thumDisabled
            : Colors[theme].switch.thumb
        }
        onValueChange={onToggle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
