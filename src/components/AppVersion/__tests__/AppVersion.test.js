import * as React from 'react'
import renderer from 'react-test-renderer'

import { AppVersion } from '../AppVersion'
import Constants from 'expo-constants'
import { Text } from '../../Themed'

const mockVersion = '2.1.2'
jest.mock('expo-constants', () => ({
  manifest: {
    version: 'foo',
  },
}))

describe('AppVersion', () => {
  it('should render correctly', () => {
    const instance = renderer.create(<AppVersion />)
    expect(instance.toJSON()).toMatchSnapshot()
  })

  it('should render the correct app version', () => {
    Constants.manifest.version = mockVersion
    const instance = renderer.create(<AppVersion />).root
    expect(instance?.findByType(Text).props.children[2]).toEqual(mockVersion)
  })
})
