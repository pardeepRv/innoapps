import React, { Component } from 'react'
import { View, Text, SafeAreaView, ImageBackground, FlatList, Image} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './Styles/GrnSearchResultStyle'

class GrnSearchResult extends Component {
  static navigationOptions = {
      title: 'SEARCH RESULT',
    };

  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: [
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'CLOSE FOR INVOICING'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
      {orderNo: 'CPT30000582', suppName: 'DIAMOND FLOOR COVERING INC', headerStatus: 'OPEN'},
    ]
  }

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <View>
      <View style={styles.row}>
        <View style={styles.rowSection1}>
          <Text style={styles.rowLabel}>{item.orderNo}</Text>
        </View>
        <View style={styles.rowSection2}>
          <Text style={styles.rowLabel}>{item.suppName}</Text>
        </View>
        <View style={styles.rowSection3}>
          <Text style={styles.rowLabel3}>{item.headerStatus}</Text>
        </View>
        <View style={styles.rowSection4}>
          <Image source={Images.rightArrow} style={styles.rightArrow} resizeMode='stretch' />
        </View>
      </View>
  <View style={styles.rowSeparatorLine}/>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  render () {
    return (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerSection1}>
            <Text style={styles.headerLabel}>Order No</Text>
          </View>
          <View style={styles.headerSection2}>
            <Text style={styles.headerLabel}>Supplier Name</Text>
          </View>
          <View style={styles.headerSection3}>
            <Text style={styles.headerLabel}>Header Status</Text>
          </View>
          </View>
            <View style={styles.rowSeparatorLine}/>
        </View>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrnSearchResult)
