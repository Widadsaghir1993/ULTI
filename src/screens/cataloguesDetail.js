/**
 * Created by aidin on 3/4/17.
 */
/**
 * Created by aidin on 3/3/17.
 */
/**
 * Created by aidin on 3/3/17.
 */
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
    Share
} from 'react-native';
// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

import FontAwsome from 'react-native-vector-icons/FontAwesome';

import Spinner from 'react-native-loading-spinner-overlay';

import u from '../util/TechWS';
import RNFetchBlob from 'react-native-fetch-blob'

const {config, fs} = RNFetchBlob;
let PictureDir = fs.dirs.PictureDir;// this is the pictures directory. You can check the available directories in the wiki.
let options = {
    fileCache: true,
    addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: false,
        path: PictureDir + "/me_" + '65', // this is the path where your downloaded file will live in
        description: 'Downloading image.'
    }
};

export default class CataloguesDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: [],
            isLoading: false,
        };
        // if you want to listen on navigator events, set this up
        this._shareText = this._shareText.bind(this);

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
        this.setState({isLoading: true});
        u.GetCatalogDet(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('catalog Det:-------------------');
            console.log(tmp[0]);
            this.setState({
                catalog: tmp[0],
                isLoading: false

            });
        });

    }

    _shareText(catalogDet) {
        Share.share({
            message: catalogDet.description.substring(0, 100) + '...' + '\n' + '<a href="http://www.ulti.online/new_admin/">Ulti App</a>',
            title: catalogDet.name
        }, {
            dialogTitle: catalogDet.name,
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    render() {
        let index = 0;
        const city = [
            {key: index++, section: true, label: 'City'},
            {key: index++, label: 'Limassol'},
            {key: index++, label: 'Aya Napa'},

        ];

        return (

            <View style={{flex: 1, backgroundColor: '#edfafc', flexDirection: 'column', justifyContent: 'flex-start'}}>
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

                        <Text style={{
                            color: 'white',
                            marginLeft: 10,
                            fontFamily: 'RobotoCondensed-Bold'
                        }}>Catalogues Detail</Text>

                    </View>

                </View>
                <View style={{
                    width: width,
                    height: height - 60,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 10
                }}>

                    <Image
                        style={{
                            width: width - 20,
                            height: 160,

                        }}
                        source={require('../assets/img/Catalogues-listing_11.gif')}
                        resizeMode={'cover'}
                    />


                    <View style={{
                        width: width,
                        height: 120,
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: 20
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{this.state.catalog.name}</Text>
                        <Text style={{
                            justifyContent: 'flex-start',
                            fontSize: 14
                        }}>{this.state.catalog.description}</Text>
                    </View>


                    {/*<View style={{*/}
                    {/*height: 55, borderColor: 'rgba(0,0,0,0.3)',*/}
                    {/*borderTopWidth: 1,*/}
                    {/*borderBottomWidth: 1,*/}
                    {/*justifyContent: 'space-around',*/}
                    {/*flex: 1,*/}
                    {/*alignItems:'center'*/}
                    {/*}}>*/}
                    {/*<View style={{*/}
                    {/*width: width / 2 ,*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'space-around',*/}
                    {/*alignItems: 'center'*/}
                    {/*}}>*/}
                    {/*<Icon name="ios-redo" size={20} color="#4faadb"/>*/}
                    {/*<Icon name="md-call" size={20} color="#4faadb"/>*/}
                    {/*<Icon name="ios-navigate" size={20} color="#4faadb"/>*/}
                    {/*<Icon name="md-mail-open" size={20} color="#4faadb"/>*/}
                    {/*<Icon name="ios-globe" size={20} color="#4faadb"/>*/}
                    {/*</View>*/}
                    {/*</View>*/}


                    <View style={{
                        borderColor: 'rgba(0,0,0,0.3)',
                        borderBottomWidth: 0,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        height: height / 7,
                        padding: 5,
                        width: width,
                        position: 'absolute',
                        bottom: 50
                    }}>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flex: 1
                        }}>
                            <TouchableOpacity activeOpacity={0.6} style={{
                                width: width / 2 - 80,
                                height: 50,
                                borderRadius: 15,
                                alignItems: 'center',
                                padding: 3,
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center'

                            }}
                                              onPress={()=>config(options).fetch('GET', 'https://www.google.com/search?client=safari&rls=en&q=www.ulti.online/admin/catalog/Payment+Receipt+-+PayPal.pdf').then((res) => {
                                                  alert('Download Successful');
                                              })}>
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

                            }} onPress={()=>this._shareText(this.state.catalog)}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Send To Friend</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
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
