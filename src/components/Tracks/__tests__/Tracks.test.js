import * as React from 'react'
import renderer from 'react-test-renderer'
import { Tracks } from '../Tracks'
import { act, fireEvent, render } from '@testing-library/react-native'
import { StatusType } from '../../Status/Status.types'
import { configureStore } from '@reduxjs/toolkit'
import { reducers, store } from '../../../store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Track } from '../../Track/Track'
import { useIsFocused } from '@react-navigation/native'
import { fetchTracksInfo } from '../../../store/slices/tracksInfoSlice'

const mockStore = {
  settings: {
    darkTheme: false,
  },
  tracksInfo: { loading: true, tracks: [] },
  show: {
    status: StatusType.OFF,
  },
}

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn((cb) => cb(mockStore)),
}))

jest.mock('../../../hooks/useColorScheme', () => jest.fn(() => 'dark'))
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(() => true),
}))

describe('<Tracks />', () => {
  it('should render', () => {
    const tree = renderer.create(<Tracks />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should display a loader if loading = true', () => {
    const instance = renderer.create(<Tracks />).root
    expect(instance.findByProps({ testID: 'loader' })).toBeDefined()
  })

  describe('getTracks()', () => {
    const dispatchMock = jest.fn()
    useDispatch.mockImplementation(() => dispatchMock)

    describe('when lastUpdated is not defined', () => {
      it('should fetch tracks when focused', () => {
        act(() => {
          const instance = renderer.create(<Tracks />)
        })

        expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function))
      })
    })

    describe('when lastUpdated is defined', () => {
      it('should request tracks if lastUpdated was more than 1 minute ago', () => {
        const currentTimestamp = new Date().getTime()
        const oneMinuteAgo = currentTimestamp - 1000 * 60

        useSelector.mockImplementation((cb) =>
          cb({
            ...mockStore,
            tracksInfo: {
              loading: false,
              tracks: [],
              lastUpdated: oneMinuteAgo,
            },
          })
        )

        act(() => {
          const instance = renderer.create(<Tracks />)
        })
        expect(dispatchMock).toHaveBeenCalled()
      })

      it('should restart the timeout and NOT request tracks if lastUpdated was less than a minute ago', () => {
        dispatchMock.mockClear()
        const currentTimestamp = new Date().getTime()
        const spy = jest.spyOn(window, 'setTimeout')

        useSelector.mockImplementation((cb) =>
          cb({
            ...mockStore,
            tracksInfo: {
              loading: false,
              tracks: [],
              lastUpdated: currentTimestamp,
            },
          })
        )

        act(() => {
          const instance = renderer.create(<Tracks />)
        })
        expect(dispatchMock).not.toHaveBeenCalled()
        expect(spy).toHaveBeenCalled()
      })
    })
  })

  it('should display `no tracks` if loading = false & tracks.length = empty', () => {
    useSelector.mockImplementation((cb) =>
      cb({ ...mockStore, tracksInfo: { loading: false, tracks: [] } })
    )
    const instance = renderer.create(<Tracks />).root
    expect(instance.findAllByProps({ testID: 'loader' }).length).toEqual(0)
    expect(instance.findByProps({ testID: 'noTracks' })).toBeDefined()
  })

  it('should display `no tracks` if loading = false & tracks.length = empty', () => {
    useSelector.mockImplementation((cb) =>
      cb({ ...mockStore, tracksInfo: { loading: false, tracks: [] } })
    )
    const instance = renderer.create(<Tracks />).root
    expect(instance.findAllByProps({ testID: 'loader' }).length).toEqual(0)
    expect(instance.findByProps({ testID: 'noTracks' })).toBeDefined()
  })

  it('should display a list of tracks if defined', () => {
    useSelector.mockImplementation((cb) =>
      cb({
        ...mockStore,
        tracksInfo: {
          loading: false,
          tracks: [
            {
              title: 'foo',
              artist: 'bar',
              played_datetime: '2022-05-09 19:01:43+0100',
            },
          ],
        },
      })
    )
    const instance = renderer.create(<Tracks />).root
    expect(instance.findAllByProps({ testID: 'loader' }).length).toEqual(0)
    expect(instance.findAllByProps({ testID: 'noTracks' }).length).toEqual(0)
    expect(instance.findAllByType(Track).length).toBe(1)
  })
})
