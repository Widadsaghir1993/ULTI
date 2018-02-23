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
    WebView,
    Linking,
    Share
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
import store from 'react-native-simple-store';

export default class ShopDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            addFav: false


        };
        // if you want to listen on navigator events, set this up
        this.handleClick = this.handleClick.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this._shareText = this._shareText.bind(this);
        this.addWatch = this.addWatch.bind(this);
        this.onMenuClicked = this.onMenuClicked.bind(this);


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
        u.GetShopDet(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('shop det:-------------------');
            console.log(tmp[0]);
            this.setState({
                items: tmp[0],
                isLoading: false

            });
        });
        store.get('profile').then(profile => {
            if (profile && profile.Token) {
                u.CheckWatchList(profile.Token, this.props.navigation.state.params.id).then(res=> {
                    console.log('fav:***********');
                    console.log(res);
                    if (res == 'false') {
                        this.setState({addFav: false})
                    } else {
                        this.setState({addFav: true})

                    }
                })
            }
        })
    }

    addWatch() {
        this.setState({isLoading:true})
        store.get('profile').then(profile => {
            if (profile && profile.Token) {
                u.AddWatchList('1', profile.Token, this.state.items.ID).then(res=> {
                    console.log(res)
                    if (res == 'inserted') {
                        this.setState({
                            addFav:true,
                            isLoading: false
                        })

                    }else {
                        this.setState({
                            addFav:false,
                            isLoading: false
                        })
                    }
                })
            } else {
                alert('Please Login')
            }
        })
    }

    _shareText(item) {
        Share.share({
            message: item.name + ', ' + item.address,
            url: item.website,
            title: item.name
        }, {
            dialogTitle: item.name,
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    onMenuClicked() {
        this._drawer.open();
    }
    render() {
        let index = 0;
        const city = [
            {key: index++, section: true, label: 'City'},
            {key: index++, label: 'Limassol'},
            {key: index++, label: 'Aya Napa'},

        ];

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="static"
                content={<Menu navigation={this.props.navigation} closeMenu={()=>this._drawer.close()}/>}
                tapToClose={true}
                openDrawerOffset={80}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                side='right'
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
                    main: {paddingLeft: 0}
                }}
                tweenHandler={(ratio) => ({
                    main: {opacity: (2 - ratio) / 2}
                })}>
            <View style={{flex: 1, backgroundColor: '#edfafc'}}>
                <View style={{
                    height: 50,
                    backgroundColor: "#4faadb",
                    alignItems: 'center',
                    flexDirection: 'row',

                }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: 10}}><Icon
                            name="md-arrow-back" size={30}
                            color="white"/></TouchableOpacity>
                        <View style={{width: width - 70, justifyContent: 'center', alignSelf: 'center'}}>
                        <Text style={{
                            color: 'white',
                            marginLeft: 10,
                            fontFamily: 'RobotoCondensed-Bold'
                        }}>Shop Detail</Text>
                            </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.onMenuClicked}>
                            <Icon name="md-menu" size={30} color="white"/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{width: width, height: 200, justifyContent: 'center', alignItems: 'center'}}>


                    <Image
                        style={{
                            width: width - 20,
                            height: 180,

                        }}
                        source={{uri: this.state.items.logoname != '' ? 'http://www.ulti.online/new_admin/images/' + this.state.items.logoname : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                        resizeMode={'cover'}
                    >

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
                        paddingTop: 0
                    }}>
                        <Text style={{
                            color: 'rgba(0,0,0,0.8)',
                            fontWeight: 'bold',
                            fontSize: 17
                        }}>{this.state.items.name}</Text>

                    </View>

                    <WebView
                        ref={'webview'}
                        automaticallyAdjustContentInsets={false}
                        style={{width: width, height: 150}}
                        source={{html: '<p style="color:rgba(0,0,0,0.8);padding-left:10px;font-size:14px">' + this.state.items.open + '</p>'}}/>


                    <View style={{
                        height: 55, borderColor: 'rgba(0,0,0,0.3)',
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        justifyContent: 'space-around',
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',

                    }}>

                        <View style={{
                            backgroundColor: 'transparent',
                            height: 25,
                            width: width - 20,
                            justifyContent: 'space-around',
                            flexDirection: 'row'
                        }}>
                            {this.state.items.tel != '' && this.state.items.tel != 0 ?
                                <TouchableOpacity activeOpacity={0.6}
                                                  onPress={()=>this.handleClick('tel:' + this.state.items.tel.replace('+', '00'))}>
                                    <Icon name="md-call" size={25} color="#4faadb"/>
                                </TouchableOpacity> : null}

                            {this.state.items.address != '' ? <TouchableOpacity activeOpacity={0.6}
                                                                                onPress={()=>this.handleMap(this.state.items.adress)}>

                                <Icon name="ios-navigate" size={25} color="#4faadb"/>
                            </TouchableOpacity> : null}
                            {this.state.items.email != '' ? <TouchableOpacity activeOpacity={0.6}
                                                                              onPress={()=>this.handleClick('mailto:' + this.state.items.email)}>
                                <Icon name="md-mail-open" size={25} color="#4faadb"/>
                            </TouchableOpacity> : null}
                            {this.state.items.website != '' ? <TouchableOpacity activeOpacity={0.6}
                                                                                onPress={()=>this.handleClick(this.state.items.website.indexOf('h') == 1 ? this.state.items.website : 'http://' + this.state.items.website)}>
                                <Icon name="ios-globe" size={25} color="#4faadb"/>
                            </TouchableOpacity> : null}


                        </View>
                    </View>


                    <View style={{
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderBottomWidth: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: height / 7,
                        padding: 5,
                        width: width

                    }}>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <TouchableOpacity onPress={()=>this._shareText(this.state.items)}
                                              activeOpacity={0.6} style={{
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
                            <TouchableOpacity activeOpacity={0.6} onPress={this.addWatch} style={{
                                width: width / 2 - 80,
                                height: 40,
                                borderRadius: 10,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: this.state.addFav == true ? 'red' : '#454545',
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
                </Drawer>
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
