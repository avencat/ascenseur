import { createRef } from 'react'
import { Keyboard } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createRef<NavigationContainerRef>()

export function navigate(name: string, params?: object) {
  Keyboard.dismiss()
  navigationRef.current?.navigate(name, params)
}
