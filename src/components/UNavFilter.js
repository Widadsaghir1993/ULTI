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
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

export default class UNavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let NavBarItem=Platform.OS==='ios'?TouchableOpacity:TouchableNativeFeedback;
        return (<View style={{flex: 1}}>

            <View style={{
                height: 70,
                backgroundColor: "#4faadb",
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <View style={{flex: 1, marginTop: -10, flexDirection: 'row',alignItems:'center'}}>
                    <View style={{
                        width: 75,
                        height: 65,
                        backgroundColor: 'white',
                        marginLeft: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 3,
                        borderBottomRightRadius: 3
                    }}>
                        <Image
                            style={{width: 40, height: 60}}
                            source={require('../assets/img/logofinal.jpg')}
                        />
                    </View>

                    <Text style={{color: 'white'}}>{this.props.title}</Text>
                </View>

                <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between',paddingRight:20,paddingLeft:20}}>
                    <TouchableOpacity activeOpacity={0.7} style={{marginRight:20}} onPress={this.props.onSearch}>
                        <Icon name="md-search" size={30} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} onPress={this.props.onMenu}>
                        <Icon name="md-menu" size={30} color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>)
    }

};
