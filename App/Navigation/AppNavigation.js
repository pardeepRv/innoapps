import { StackNavigator } from 'react-navigation'
import GrnSearchResult from '../Containers/GrnSearchResult'
import GrnSearch from '../Containers/GrnSearch'
import GrnSettingsStack from '../Containers/GrnSettingsStack'
import GrnReceiptsStack from '../Containers/GrnReceiptsStack'
import GrnPurchaseOrderStack from '../Containers/GrnPurchaseOrderStack'
import GrnHomeStack from '../Containers/GrnHomeStack'
import PcSettingsStack from '../Containers/PcSettingsStack'
import PcRequisitionsStack from '../Containers/PcRequisitionsStack'
import PcHomeStack from '../Containers/PcHomeStack'
import GrnTab from '../Containers/GrnTab'
import Drawer from '../Containers/Drawer'
import PcTab from '../Containers/PcTab'
import GrnCameraRoll from '../Containers/GrnCameraRoll'
import GrnPurchaseOrderDetails from '../Containers/GrnPurchaseOrderDetails'
import GrnReceiptDetails from '../Containers/GrnReceiptDetails'
import GrnChangeReceipt from '../Containers/GrnChangeReceipt'
import GrnRejectReceipt from '../Containers/GrnRejectReceipt'
import GrnEditReceipt from '../Containers/GrnEditReceipt'
import PcCreateChangeOrder from '../Containers/PcCreateChangeOrder'
import PcAddOrderLine from '../Containers/PcAddOrderLine'
import PcViewRequisition from '../Containers/PcViewRequisition'
import PcRequisitionsSummary from '../Containers/PcRequisitionsSummary'
import PcSelectArea from '../Containers/PcSelectArea'
import PcEditAttribute from '../Containers/PcEditAttribute'
import PcCreateRequisition from '../Containers/PcCreateRequisition'
import PcSettings from '../Containers/PcSettings'
import PcRequisitions from '../Containers/PcRequisitions'
import PcHome from '../Containers/PcHome'
import GrnSettings from '../Containers/GrnSettings'
import GrnReceipts from '../Containers/GrnReceipts'
import GrnPurchaseOrder from '../Containers/GrnPurchaseOrder'
import GrnHome from '../Containers/GrnHome'
import Login from '../Containers/Login'
import RequisitionList from '../Containers/RequisitionList'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  GrnSearchResult: { screen: GrnSearchResult },
  GrnSearch: { screen: GrnSearch },
  GrnSettingsStack: { screen: GrnSettingsStack },
  GrnReceiptsStack: { screen: GrnReceiptsStack },
  GrnPurchaseOrderStack: { screen: GrnPurchaseOrderStack },
  GrnHomeStack: { screen: GrnHomeStack },
  PcSettingsStack: { screen: PcSettingsStack },
  PcRequisitionsStack: { screen: PcRequisitionsStack },
  PcHomeStack: { screen: PcHomeStack },
  GrnTab: { screen: GrnTab },
  Drawer: { screen: Drawer },
  PcTab: { screen: PcTab },
  GrnCameraRoll: { screen: GrnCameraRoll },
  GrnPurchaseOrderDetails: { screen: GrnPurchaseOrderDetails },
  GrnReceiptDetails: { screen: GrnReceiptDetails },
  GrnChangeReceipt: { screen: GrnChangeReceipt },
  GrnRejectReceipt: { screen: GrnRejectReceipt },
  GrnEditReceipt: { screen: GrnEditReceipt },
  PcCreateChangeOrder: { screen: PcCreateChangeOrder },
  PcAddOrderLine: { screen: PcAddOrderLine },
  PcViewRequisition: { screen: PcViewRequisition },
  PcRequisitionsSummary: { screen: PcRequisitionsSummary },
  PcSelectArea: { screen: PcSelectArea },
  PcEditAttribute: { screen: PcEditAttribute },
  PcCreateRequisition: { screen: PcCreateRequisition },
  PcSettings: { screen: PcSettings },
  PcRequisitions: { screen: PcRequisitions },
  PcHome: { screen: PcHome },
  GrnSettings: { screen: GrnSettings },
  GrnReceipts: { screen: GrnReceipts },
  GrnPurchaseOrder: { screen: GrnPurchaseOrder },
  GrnHome: { screen: GrnHome },
  Login: { screen: Login },
  RequisitionList: { screen: RequisitionList },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'Login',

  navigationOptions: {
    header: null,
    headerLeft: null,
    gesturesEnabled: false,
  },
})

export default PrimaryNav
