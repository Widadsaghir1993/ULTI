import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Dimensions, Platform} from "react-native";
var {height, width} = Dimensions.get('window');
import t from 'tcomb-form-native';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';

import u from '../util/TechWS';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //value: {Username: 'aidin', Password: '12345'},
            isLoading: false,
        };

    }

    componentWillMount() {
        this.setState({isLoading: true});

        store.get('profile').then(profile => {
            if(profile && profile.Token){
                console.log('+++++Toooken++++')
                console.log(profile.Token)
                this.setState({isLoading: false});
                this.props.navigation.navigate('Home', {Token: profile.Token})
            }else{
                this.setState({isLoading: false});
                this.props.navigation.navigate('Login')

            }
        })
    }

    render() {

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C1F1F9'}}>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </View>
        );
    }
}
