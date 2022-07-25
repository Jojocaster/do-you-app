import { BlurView } from 'expo-blur'
import { Image, ImageBackground } from 'react-native'
import { RootTabScreenProps } from '../../types'
import { MIXCLOUD_IMAGE_ENDPOINT } from '../components/Archive/Archive.constants'
import { Text, View } from '../components/Themed'

export default function ArchiveDetailsScreen({
  route,
}: RootTabScreenProps<'ArchiveDetails'>) {
  const { track } = route.params
  console.log(`${MIXCLOUD_IMAGE_ENDPOINT}/${track.picture_url}`)
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <View
        style={{
          height: '50%',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          blurRadius={20}
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            height: '200%',
            width: '200%',
          }}
          source={{ uri: `${MIXCLOUD_IMAGE_ENDPOINT}${track.picture_url}` }}
        />
        {/* <BlurView intensity={40} style={{ height: '100%', width: '100%' }}>
          <Text>yo</Text>
        </BlurView> */}
      </View>
    </View>
  )
}
