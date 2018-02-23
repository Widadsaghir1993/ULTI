
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
    Image
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';

export default class BusinessDetail extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            selectedImage: this.props.navigation.state.params.id,
            isLoading:false
        };
        this.onLoad = this.onLoad.bind(this);

    }


    componentDidMount() {
this.setState({isLoading:true})
    }

    onLoad() {
        this.setState({isLoading:false})

    }

    render() {
        let index = 0;
        const city = [
            {key: index++, section: true, label: 'City'},
            {key: index++, label: 'Limassol'},
            {key: index++, label: 'Aya Napa'},

        ];
        let selVideo;
        return (

            <View style={{flex: 1, backgroundColor: '#edfafc'}}>
                <View style={{
                    height: 50,
                    backgroundColor: "#4faadb",
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent:'center'

                }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',marginTop:3}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: 10}}><Icon
                            name="md-arrow-back" size={30}
                            color="white"/></TouchableOpacity>




                            <Text style={{
                                color: 'white',
                                marginLeft: 10,
                                fontFamily: 'RobotoCondensed-Bold'
                            }}>Video</Text>

                    </View>

                </View>
                <Video
                    ref={(ref) => { this.video = ref }}
                    source={{uri: this.props.navigation.state.params.url}}
                    style={{width:width,height:height}}
                    paused={false}
                    repeat={false}
                    onLoad={this.onLoad}
                    resizeMode="cover"
                />

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
