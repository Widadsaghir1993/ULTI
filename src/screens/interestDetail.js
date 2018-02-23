
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
// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar';
import ImagePicker from '../components/ImagePicker';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

export default class InterestDetail extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up

    }

    static navigationOptions = {
        tabBar: {
            label: 'Profile',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ()=><Icon name="md-heart-outline" size={30} color="#FFF"/>
            ,
        },
    }
    // onNavigatorEvent(event) {
    //     if (event.id === 'menu') {
    //         this.props.navigator.toggleDrawer({
    //             side: 'left',
    //             animated: true
    //         });
    //     }
    // }

    componentDidMount() {
        // alert(this.props.navigation.state.params.id);
        // iconsLoaded.then(() => {
        //     this.props.navigator.setButtons({
        //         leftButtons: [{
        //             id: 'menu',
        //             icon: iconsMap['md-menu'],
        //         }],
        //         animated: false
        //     });
        // });
    }


    render() {
        let index = 0;
        const city = [
            {key: index++, section: true, label: 'City'},
            {key: index++, label: 'Limassol'},
            {key: index++, label: 'Aya Napa'},

        ];

        return (

            <View style={{flex: 1, backgroundColor: '#edfafc'}}>
                <View style={{
                    height: 50,
                    backgroundColor: "#4faadb",
                    alignItems: 'center',
                    flexDirection: 'row',

                }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: 10}}><Icon
                            name="md-arrow-back" size={30}
                            color="white"/></TouchableOpacity>

                        <Text style={{
                            color: 'white',
                            marginLeft: 10,
                            fontFamily: 'RobotoCondensed-Bold'
                        }}>Interest Detail</Text>

                    </View>

                </View>
                <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center'}}>

                    <Image
                        style={{
                            width: width - 20,
                            height: 180,

                        }}
                        source={require('../assets/img/interest-listing-page_09.gif')}
                        resizeMode={'cover'}
                    />

                </View>


                <ScrollView style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>

                    <View style={{
                        flex: 1,
                        height: 30,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 10,
                        paddingBottom: 0,
                        paddingTop: 5
                    }}>
                        <Text>Church Name</Text>

                        <View style={{
                            width: 60,
                            height: 20,
                            borderRadius: 10,
                            alignItems: 'center',
                            padding: 3,
                            flexDirection: 'row',
                            backgroundColor: '#454545',
                            justifyContent: 'center'

                        }}>
                            <Text style={{
                                color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                            }}>Newyork</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',marginLeft:10}}>
                        <FontAwsome name="map-marker" size={16} color="#454545" style={{marginTop:2}}/>
                        <Text
                            style={{
                                fontFamily: 'RobotoCondensed-Light',
                                fontSize: 8,

                                marginTop: 5,
                                marginLeft:5,
                                color:'black'
                            }}>Google
                            is an
                            American multinational technology company specializing </Text>
                    </View>
                    <Text style={{justifyContent: 'flex-start', padding: 10, paddingTop: 0, fontSize: 10,marginTop:10,marginBottom:10}}>Google
                        is an
                        American multinational technology company specializing in
                        Internet-related
                        services and products. These include online advertising
                        technologies,
                        search, cloud computing, software, and hardware.
                        Internet-related
                        services and products. These include online advertising
                        Internet-related
                        services and products. These include online advertisingInternet-related
                        services and products. These include online advertising
                        Internet-related
                        services and products. These include online advertising</Text>



                    <View style={{
                        height: 55, borderColor: 'rgba(0,0,0,0.3)',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        justifyContent: 'space-around',
                        flex: 1,
                        alignItems:'center'
                    }}>
                        <View style={{
                            width: width / 2 ,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>

                            <Icon name="md-call" size={20} color="#4faadb"/>

                            <Icon name="md-mail-open" size={20} color="#4faadb"/>
                            <Icon name="ios-globe" size={20} color="#4faadb"/>
                        </View>
                    </View>


                    <View style={{
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderBottomWidth: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: height / 7,
                        padding: 5,
                        width:width

                    }}>


                        <View style={{flexDirection: 'row', justifyContent: 'space-around',alignItems:'center',flex:1}}>
                            <TouchableOpacity activeOpacity={0.6} style={{
                                width: width / 2 - 80,
                                height: 50,
                                borderRadius: 15,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Download</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6} style={{
                                width: width / 2 - 80,
                                height: 50,
                                borderRadius: 15,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: '#368ed1',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Send To Friend</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>

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
/**
 * Created by aidin on 3/9/17.
 */
