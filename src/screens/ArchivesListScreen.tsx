import React from 'react'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { ArchivesList } from '../components/ArchivesList/ArchivesList'
import { Button2 } from '../components/Button2/Button2'
import { Heading } from '../components/Heading/Heading'
import { View } from '../components/Themed'
import { ARCHIVES_URL } from '../constants/Endpoints'
import Space from '../constants/Space'

export default function ArchivesListScreen({
  navigation,
}: RootTabScreenProps<'ArchivesList'>) {
  const onPress = async () => {
    try {
      const response = await fetch(`${ARCHIVES_URL}/shows/random/`)
      const data = await response.json()

      if (data) {
        navigation.navigate('Root', {
          screen: 'Archives',
          params: {
            //@ts-ignore
            screen: 'ArchiveDetails',
            params: {
              track: data,
            },
          },
        })
      }
    } catch (e) {}
  }

  return (
    <View style={styles.view}>
      <Heading style={{ marginBottom: 10, fontSize: 32 }}>Archives</Heading>

      <ArchivesList />

      <View style={styles.button}>
        <Button2
          elevated
          variant="md"
          icon="shuffle-variant"
          onPress={onPress}
          iconSize={14}
        >
          Random
        </Button2>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    flex: 1,
    paddingHorizontal: Space.viewPadding,
    paddingTop: Space.viewPaddingVertical,
    position: 'relative',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
})
