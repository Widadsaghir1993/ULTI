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
    Share,
    Linking
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from '../components/ImagePicker';
import u from '../util/TechWS';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';
import Drawer from 'react-native-drawer';
import Menu from '../components/Menu';

import Video from 'react-native-video';
import StaticMap from '../components/StaticMap';

export default class BusinessDetail extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            isLoading: false,
        };
    }

    static navigationOptions = {}

    componentDidMount() {
        this.setState({isLoading: true});
        u.GetCoordinates(this.props.navigation.state.params.address).then(res => {
            var tmp1 = JSON.parse(res);
            console.log('coordinate:-------------------');
            console.log(tmp1);
            this.setState({isLoading: false});
        });

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </View>
        )
    }

};
const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
        color: 'blue'
    },
    btnText: {
        color: "#FFFFFF",
        fontFamily: "RobotoCondensed-Regular",
        fontSize: 22,
        shadowColor: "black",
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.9,
        backgroundColor: "transparent"
    }
});
