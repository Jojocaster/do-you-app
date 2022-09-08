import { RootTabScreenProps } from '../../types'
import { Filters } from '../components/Filters/Filters'
import { Heading } from '../components/Heading/Heading'
import { View } from '../components/Themed'
import Space from '../constants/Space'

export default function ArchivesFiltersScreen({
  navigation,
}: RootTabScreenProps<'ArchivesFilters'>) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Space.viewPadding,
        paddingTop: Space.viewPaddingVertical,
      }}
    >
      <Heading style={{ marginBottom: 10, fontSize: 32 }}>Shows</Heading>

      <Filters />
    </View>
  )
}
