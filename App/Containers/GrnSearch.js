import React, { Component } from 'react'
import { ScrollView, Text, View, TextInput, Image, KeyboardAvoidingView} from 'react-native'
import { Container, Content, Picker, DatePicker } from 'native-base';
const Item = Picker.Item;
import { connect } from 'react-redux'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/GrnSearchStyle'

class GrnSearch extends Component {

  static navigationOptions = {
      title: 'SEARCH CRITERIA',
    };

  constructor (props) {
    super(props)
    this.state = {
      selectedBusinessUnit: undefined,
            results: {
                  items: []
      },
      deliveryDate: new Date(),

    }
      this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({
        deliveryDate: newDate,
    });
  }

    onbusinessUnitValueChange (value: string) {
         this.setState({
        selectedBusinessUnit : value
      });
    }




  render () {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
      <View style={styles.line}/>
      <View style={styles.textBox}>
          <TextInput
                  style={styles.input}
                  value={this.state.value}
                  placeholder= 'Enter PO Number'
                  onChangeText={text=>this.setState({value:text})}
                  marginTop={15}
                  marginBottom={15}
                  fontSize={12}
                  underlineColorAndroid='transparent'
          />
    </View>
    <View style={styles.titleBox}>
      <Text style={styles.title}>ADDITIONAL PARAMETERS</Text>
        <View style={styles.line}/>
    </View>

    <View style={styles.textBox}>
        <TextInput
                style={styles.input}
                value={this.state.value}
                placeholder= 'ENTER SUPPLIER (VENDOR) NO./CODE'
                marginTop={15}
                marginBottom={15}
                fontSize={12}
                underlineColorAndroid='transparent'
        />
  </View>

  <View style={styles.textBox}>
      <TextInput
              style={styles.input}
              value={this.state.value}
              placeholder= 'ENTER DELIVERY LOCATION'
              onChangeText={text=>this.setState({value:text})}
              marginTop={15}
              marginBottom={15}
              fontSize={12}
              underlineColorAndroid='transparent'
      />
</View>

<View style={styles.box}>
      <View style={styles.boxView} >
        <Text style = {styles.question}>BUSINESS UNIT</Text>
        <Container style={styles.pickerContainer}>
                       <Content>
                           <Picker
                           style={styles.picker}
                           textStyle={styles.answer}

                               mode="dropdown"
                               selectedValue={this.state.selectedBusinessUnit}
                               onValueChange={this.onbusinessUnitValueChange.bind(this)}>
                               <Item label="Camden Development Inc" value="key0" />
                               <Item label="ABC Inc" value="key1" />
                          </Picker>
                       </Content>
                   </Container>
        <Image
        source ={Images.redArrow}
        style = {styles.arrow}/>
      </View>
</View>

<View style={styles.box}>
      <View style={styles.boxView} >
        <Text style = {styles.question}>DELIVERY DATE</Text>
        <Container style={styles.pickerContainer}>
         <Content style={styles.datePicker}>
        <DatePicker
                    textStyle={styles.dateAnswer}
                      placeHolderText= 'SELECT'
                        locale={"en"}
                        modalTransparent={true}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderTextStyle={styles.datePlaceHolder}
                        onDateChange={this.setDate}
                        />
                        </Content>
                   </Container>
        <Image
        source = {Images.redArrow}
        style = {styles.arrow}/>
      </View>
    </View>

      </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrnSearch)
