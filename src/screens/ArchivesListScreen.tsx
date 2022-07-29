import * as React from 'react'
import { StyleSheet } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { Archives } from '../components/Archives/Archives'
import { Heading } from '../components/Heading/Heading'
import { View } from '../components/Themed'
import Space from '../constants/Space'

export default function ArchivesListScreen({
  navigation,
}: RootTabScreenProps<'ArchivesList'>) {
  return (
    <View style={styles.view}>
      <Heading style={{ marginBottom: 10, fontSize: 32 }}>Archives</Heading>
      {/* <Button2 variant="sm" icon="filter-outline" onPress={() => {}}>
        Filters
      </Button2> */}
      <Archives />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    height: '100%',
    flex: 1,
    paddingHorizontal: Space.viewPadding,
    paddingTop: Space.viewPaddingVertical,
  },
})
