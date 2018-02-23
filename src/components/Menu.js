import React, {Component} from 'react';

import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    Dimensions,
    Image,
    Button
} from 'react-native';
import {TabNavigator} from 'react-navigation';
import store from 'react-native-simple-store';
const LoginManager = require('react-native').NativeModules.FBLoginManager;

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
           userLog:false
        };
        this.goToMenu = this.goToMenu.bind(this);
        this._Logout = this._Logout.bind(this)

    }

    goToMenu(menu) {
        this.props.closeMenu();
        this.props.navigation.navigate(menu);
    }
    _Logout(){

        store.delete('profile');
        LoginManager.logOut();

        this.props.navigation.navigate('Login')


    }

    componentDidMount(){

        store.get('profile').then(profile => {
            if(profile && profile.Token){
                console.log('+++++Toooken++++')
                console.log(profile.Token)
                this.setState({userLog: true});
            }
        })
    }
    render() {

        return (
            <ScrollView style={{flex: 1, flexDirection: 'column', backgroundColor: '#4faadb'}}>
                <View style={{
                    height: 70, borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontFamily: 'RobotoCondensed-Bold', color: 'white', fontSize: 18}}>MENU</Text>
                </View>
                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>this.goToMenu('Home')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>this.goToMenu('businessList')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND A BUSINESS</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>this.goToMenu('Favorite')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND SPECIAL OFFERS</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>this.goToMenu('Likes')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND A POINT OF
                        INTEREST</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=>this.props.navigation.navigate('Catalogue', {id: 0})}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND A CATALOGUE</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=> this.goToMenu('FindMenu')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND AN EVENT</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={()=> this.goToMenu('GasStation')}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND A GAS STATION</Text>
                </TouchableOpacity>


                {/*<TouchableOpacity activeOpacity={0.6} style={{*/}
                    {/*borderBottomWidth: 1,*/}
                    {/*borderBottomColor: 'white',*/}
                    {/*height: 50,*/}
                    {/*justifyContent: 'center',*/}
                    {/*alignItems: 'center'*/}
                {/*}} onPress={()=> this.goToMenu('Pharmacies')}>*/}
                    {/*<Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>FIND A PHARMACY</Text>*/}
                {/*</TouchableOpacity>*/}

                <TouchableOpacity activeOpacity={0.6} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: 'white',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} onPress={this._Logout}>
                    <Text style={{fontFamily: 'RobotoCondensed-Regular', color: 'white'}}>{this.state.userLog == true?'LOG OUT':'LOG IN'}</Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    }
})