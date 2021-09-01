import { StyleSheet, PixelRatio } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF'
},
avatarContainer: {
  borderColor: '#9B9B9B',
  borderWidth: 1 / PixelRatio.get(),
  justifyContent: 'center',
  alignItems: 'center'
},
avatar: {
  borderRadius: 75,
  width: 150,
  height: 150
}
})
