
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
    Linking
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
import u from '../util/TechWS';
import Spinner from 'react-native-loading-spinner-overlay';

export default class OfferDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,


        };
        // if you want to listen on navigator events, set this up
        this.handleClick = this.handleClick.bind(this);
        this.handleMap = this.handleMap.bind(this);
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
    handleClick = (url) => {
        console.log(url);
        Linking.openURL(url);
    };

    handleMap = (address) => {
        u.GetCoordinates(address).then(response => {
            var res = JSON.parse(response);
            console.log(res.results[0].geometry.location);

            Linking.openURL('geo:' + res.results[0].geometry.location.lat + ',' + res.results[0].geometry.location.lng);

        });

    };
    componentDidMount() {
        this.setState({isLoading: true});
        u.GetOfferDet(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Offers:-------------------');
            console.log(tmp[0]);
            this.setState({
                items: tmp[0],
                isLoading: false

            });
        });

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
                        }}>Offer Detail</Text>

                    </View>

                </View>
                <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center'}}>


                    <Image
                        style={{
                            width: width - 20,
                            height: 180,

                        }}
                        source={{uri: this.state.items.imagename != '' ? 'http://www.ulti.online/new_admin/images/' + this.state.items.imagename : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                        resizeMode={'cover'}
                    >

                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                         marginLeft:width/2+20,

                        }}>
                            <View style={{
                                backgroundColor: '#368ccf',
                                width: 85,
                                height: 85,
                                transform: [{rotate: '45deg'}],

                                }}>
                            </View>
                            <View style={{
                                backgroundColor: '#368ccf',
                                width: 85,
                                height: 85,
                                marginTop: -85,
                                alignItems: 'center',
                                justifyContent: 'center',

                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: "white",
                                    fontFamily: 'RobotoCondensed-Regular',
                                }}>{this.state.items.remark}</Text>

                            </View>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 50,
                            position: 'absolute',

                            left: 0,

                            height:50
                        }}>
                            <View style={{
                                backgroundColor: '#f5161d',
                                width: 30,
                                height: 30,
                                transform: [{rotate: '45deg'}]
                            }}>
                            </View>
                            <View style={{
                                backgroundColor: '#f5161d',
                                width: 30,
                                height: 30,
                                marginTop: -30,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    color: "white",
                                    fontFamily: 'RobotoCondensed-Bold',
                                }}>HOT</Text>

                            </View>
                        </View>
                    </Image>

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
                        <Text>{this.state.items.name}</Text>

                        {/*<View style={{*/}
                            {/*width: 60,*/}
                            {/*height: 20,*/}
                            {/*borderRadius: 10,*/}
                            {/*alignItems: 'center',*/}
                            {/*padding: 3,*/}
                            {/*flexDirection: 'row',*/}
                            {/*backgroundColor: '#454545',*/}
                            {/*justifyContent: 'center'*/}

                        {/*}}>*/}
                            {/*<Text style={{*/}
                                {/*color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,*/}

                            {/*}}>{this.state.items.name}</Text>*/}
                        {/*</View>*/}
                    </View>

                    <Text style={{justifyContent: 'flex-start', padding: 10, paddingTop: 0, fontSize: 10,marginTop:10,marginBottom:10}}>Google
                        {this.state.items.description}</Text>



                    {/*<View style={{*/}
                        {/*height: 55, borderColor: 'rgba(0,0,0,0.3)',*/}
                        {/*borderTopWidth: 1,*/}
                        {/*borderBottomWidth: 1,*/}
                        {/*justifyContent: 'space-around',*/}
                        {/*flex: 1,*/}
                        {/*alignItems:'center',*/}
                        {/*flexDirection: 'row',*/}

                    {/*}}>*/}

                        {/*<View style={{*/}
                            {/*backgroundColor: 'transparent',*/}
                            {/*height: 25,*/}
                            {/*width: width-20,*/}
                            {/*justifyContent: 'space-around',*/}
                            {/*flexDirection: 'row'*/}
                        {/*}}>*/}
                            {/*{this.state.items.tel != '' && this.state.items.tel != 0 ? <TouchableOpacity activeOpacity={0.6}*/}
                                                                               {/*onPress={()=>this.handleClick('tel:' + this.state.items.tel.replace('+', '00'))}>*/}
                                {/*<Icon name="md-call" size={25} color="#4faadb"/>*/}
                            {/*</TouchableOpacity> : null}*/}

                            {/*{this.state.items.address != '' ? <TouchableOpacity activeOpacity={0.6}*/}
                                                                  {/*onPress={()=>this.handleMap(this.state.items.adress)}>*/}

                                {/*<Icon name="ios-navigate" size={25} color="#4faadb"/>*/}
                            {/*</TouchableOpacity> : null}*/}
                            {/*{this.state.items.email != '' ? <TouchableOpacity activeOpacity={0.6}*/}
                                                                 {/*onPress={()=>this.handleClick('mailto:' + this.state.items.email)}>*/}
                                {/*<Icon name="md-mail-open" size={25} color="#4faadb"/>*/}
                            {/*</TouchableOpacity> : null}*/}
                            {/*{this.state.items.website != '' ? <TouchableOpacity activeOpacity={0.6}*/}
                                                                   {/*onPress={()=>this.handleClick(this.state.items.website.indexOf('h') == 1 ? this.state.items.website : 'http://' + this.state.items.website)}>*/}
                                {/*<Icon name="ios-globe" size={25} color="#4faadb"/>*/}
                            {/*</TouchableOpacity> : null}*/}


                        {/*</View>*/}
                    {/*</View>*/}


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
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Send To Friend</Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity activeOpacity={0.6} style={{*/}
                                {/*width: width / 2 - 80,*/}
                                {/*height: 40,*/}
                                {/*borderRadius: 10,*/}
                                {/*alignItems: 'center',*/}
                                {/*padding: 3,*/}
                                {/*flexDirection: 'row',*/}
                                {/*backgroundColor: '#368ed1',*/}
                                {/*justifyContent: 'center'*/}

                            {/*}}>*/}
                                {/*<Text style={{*/}
                                    {/*color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,*/}

                                {/*}}>Download</Text>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity activeOpacity={0.6} style={{
                                width: width / 2 - 80,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Add To Favorites</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
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
/**
 * Created by aidin on 3/9/17.
 */
