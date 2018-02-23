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
    Linking,
    Modal
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from '../components/ImagePicker';
import u from '../util/TechWS';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';
import Drawer from 'react-native-drawer';
import Menu from '../components/Menu';
import DynamicMap from '../components/DynamicMapDirectory';
import Video from 'react-native-video';
import StaticMap from '../components/StaticMap';
import StarRating from 'react-native-star-rating';

export default class BusinessDetail extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            shops: [],
            companyDet: this.props.navigation.state.params.busDet,
            photos: [],
            video: [],
            isLoading: false,
            addFav: false,
            busLat: this.props.navigation.state.params.lat,
            busLng: this.props.navigation.state.params.lng,
            modalVisible: false,
            rateModalVisible: false,
            starCount: 3.5


        };
        this._shareText = this._shareText.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.addWatch = this.addWatch.bind(this);
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.onStarRatingPress = this.onStarRatingPress.bind(this);

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
    componentWillMount() {
        this.setState({isLoading: true});
        store.get('profile').then(profile => {
            if (profile && profile.Token) {
                u.CheckWatchList(profile.Token, this.props.navigation.state.params.id).then(res=> {
                    console.log('fav:***********');
                    console.log(res);
                    if (res == 'false') {
                        this.setState({addFav: false, isLoading: false})
                    } else {
                        this.setState({addFav: true, isLoading: false})

                    }
                })
            } else {
                this.setState({isLoading: false})
            }
        })
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    setRateModalVisible(visible) {
        this.setState({rateModalVisible: visible});
    }

    componentDidMount() {
        // this.setState({isLoading: true});
        // u.GetCompanyDet(this.props.navigation.state.params.id).then(response => {
        //     var tmp = JSON.parse(response);
        //     console.log('company det:-------------------');
        //     console.log(tmp);
        //     this.setState({
        //         companyDet: tmp,
        //         isLoading: false,
        //     });
        // });

        this.setState({isLoading: true});
        u.GetShops(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Shops:-------------------');
            console.log(tmp);
            this.setState({
                shops: tmp,
                isLoading: false


            });
        });
        this.setState({isLoading: true});

        u.GetPhotos(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Photos:-------------------');
            console.log(tmp);
            this.setState({
                photos: tmp,
                isLoading: false


            });
        });
        this.setState({isLoading: true});

        u.GetVideo(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Video:-------------------');
            console.log(tmp);
            this.setState({
                video: tmp,
                isLoading: false
            });
        });


    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    putRate(rating) {
        alert('ds')
    }
    _shareText(campanyDet) {
        Share.share({
            message: campanyDet.description.substring(0, 100) + '...' + '\n' + '<a href="http://www.ulti.online/new_admin/">Ulti App</a>',
            url: campanyDet.website,
            title: campanyDet.Name
        }, {
            dialogTitle: campanyDet.Name,
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter'
            ],
            tintColor: 'green'
        })
            .then(this._showResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

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

    addWatch() {
        store.get('profile').then(profile => {
            if (profile && profile.Token) {
                this.setState({isLoading: true});

                u.AddWatchList('0', profile.Token, this.props.navigation.state.params.id).then(res=> {
                    console.log(res);
                    if (res == 'inserted') {
                        this.setState({
                            addFav: true,
                            isLoading: false
                        })

                    } else {
                        this.setState({
                            addFav: false,
                            isLoading: false
                        })
                    }
                })
            } else {
                alert('Please Login')
            }
        })
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
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        console.log('Modal Close');
                    }}
                >
                    <View style={{flex: 1, backgroundColor: 'white'}}>

                        <DynamicMap lng={this.state.busLng} lat={this.state.busLat}/>
                    </View>
                    <TouchableOpacity avtiveOpacity={0.6} onPress={() => {
                        this.setModalVisible(false);
                    }} style={{
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 20,
                        left: 20
                    }}>
                        <Icon name="ios-arrow-back" size={40} style={{marginRight: 5, marginTop: 2}}
                              color={'#3E9DCC'}/>
                    </TouchableOpacity>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.rateModalVisible}
                    onRequestClose={() => {
                        console.log('Modal Close');
                    }}
                >
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>

                        <View style={{
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            width: width,
                            height: height / 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <TouchableOpacity avtiveOpacity={0.6} onPress={() => {
                                this.setRateModalVisible(false);
                            }} style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 20,
                                left: 20
                            }}>
                                <Icon name="ios-arrow-back" size={40} style={{marginRight: 5, marginTop: 2}}
                                      color={'#3E9DCC'}/>
                            </TouchableOpacity>
                            <Text style={{paddingBottom: 20, fontSize: 20, fontWeight: 'bold'}}>Give Rate To This
                                Business:</Text>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                starColor={'gold'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />
                            <Text
                                style={{paddingTop: 20, fontSize: 22, fontWeight: 'bold'}}>{this.state.starCount}</Text>
                            <TouchableOpacity avtiveOpacity={0.6} onPress={this.putRate} style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                top: 20,
                                right: 20
                            }}>
                                <Icon name="ios-send" size={40} style={{marginRight: 5, marginTop: 2}}
                                      color={'#3E9DCC'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{flex: 1, backgroundColor: '#edfafc'}}>

                    <View style={{
                        height: 50,
                        backgroundColor: "#4faadb",
                        alignItems: 'center',
                        flexDirection: 'row',

                    }}>
                        <View
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: 10}}><Icon
                                name="md-arrow-back" size={30}
                                color="white"/></TouchableOpacity>
                            <View style={{width: width - 70, justifyContent: 'center', alignSelf: 'center'}}>
                                <Text style={{
                                    color: 'white',
                                    fontFamily: 'RobotoCondensed-Bold',
                                    alignSelf: 'center',
                                    fontSize: 20,
                                    width: 250

                                }}
                                      numberOfLines={1}>{this.state.companyDet ? this.state.companyDet.Name : ''}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={this.onMenuClicked}>
                                <Icon name="md-menu" size={30} color="white"/>
                            </TouchableOpacity>
                        </View>

                    </View>


                    <ScrollView style={{
                        flex: 1,
                        flexDirection: 'column',
                    }}>
                        <ImagePicker photos={this.state.photos}
                                     companyLogo={this.state.companyDet ? this.state.companyDet.logoimagename : ''}/>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            paddingBottom: 0,
                            paddingTop: 5
                        }}>
                            <View style={{
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                padding: 10,
                                flex: 0.6

                            }}>
                                <Text>{this.state.companyDet ? this.state.companyDet.Name : ''}</Text>
                            </View>
                            <View style={{
                                borderRadius: 15,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center',
                                padding: 8,
                                flex: 0.4


                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>{this.state.companyDet ? this.state.companyDet.adress : ''}</Text>
                            </View>
                        </View>
                        <View style={{padding: 10}}>
                            <Text style={{
                                justifyContent: 'flex-start',
                                padding: 10,
                                paddingTop: 0,
                                fontSize: 10
                            }}>{this.state.companyDet ? this.state.companyDet.description : ''}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 10,
                            paddingTop: 0
                        }}>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('shopList', {id: this.state.companyDet.ID})}
                                activeOpacity={0.6} style={{
                                width: 120,
                                borderRadius: 10,
                                alignItems: 'center',
                                padding: 5,
                                flexDirection: 'row',
                                backgroundColor: '#454545',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Our Shops</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Catalogue', {id: this.state.companyDet.ID})}
                                activeOpacity={0.6} style={{
                                width: 120,
                                borderRadius: 10,
                                alignItems: 'center',
                                padding: 5,
                                flexDirection: 'row',
                                backgroundColor: '#368ed1',
                                justifyContent: 'center'

                            }}>
                                <Text style={{
                                    color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                }}>Catalogue</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{
                            height: 55, borderColor: 'rgba(0,0,0,0.3)',
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            justifyContent: 'space-around',
                            flex: 1
                        }}>
                            <ScrollView horizontal={true}
                                        contentContainerStyle={{justifyContent: 'space-between', padding: 3,}} style={{


                                flex: 1
                            }}>
                                {this.state.video.map((itm, idx)=>
                                    <TouchableOpacity key={"item__" + itm.ID}
                                                      onPress={()=>this.props.navigation.navigate('Video', {url: 'http://www.ulti.online/new_admin/videos/' + itm.videoName})}
                                                      style={{marginRight: 10, marginLeft: 7}}>
                                        <Image style={{width: width / 4 - 10, height: width / 4 - 30}}
                                               source={{uri: itm.imageName != '' ? 'http://www.ulti.online/new_admin/images/' + itm.imageName : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                                        />
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0,0,0,0.4)',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderColor: 'rgba(0,0,0,0.7)',
                                            borderWidth: 1
                                        }}>
                                            <Icon name="md-play" size={30} color='white' style={{marginLeft: 5,}}/>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        <View style={{
                            height: 50,
                            borderColor: 'rgba(0,0,0,0.3)',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>


                            <TouchableOpacity style={{
                                width: width / 2,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                padding: 5,
                                alignItems: 'center'
                            }} onPress={() => {
                                this.setRateModalVisible(true);
                            }}>
                                <Text>RATING :</Text>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starColor={'gold'}
                                    starSize={25}
                                />
                            </TouchableOpacity>
                            <View style={{
                                width: width / 2 - 5,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>

                                {this.state.companyDet && this.state.companyDet.tel != 0 && this.state.companyDet.tel != '' ?
                                    <TouchableOpacity activeOpacity={0.6}
                                                      onPress={()=>this.handleClick('tel:' + this.state.companyDet.tel.replace('+', '00'))}>
                                        <Icon name="md-call" size={25} color="#4faadb"/>
                                    </TouchableOpacity> : null}

                                {this.state.companyDet && this.state.companyDet.adress != '' ?
                                    <TouchableOpacity activeOpacity={0.6}
                                                      onPress={()=>this.handleMap(this.state.companyDet.adress)}>

                                        <Icon name="ios-navigate" size={25} color="#4faadb"/>
                                    </TouchableOpacity> : null}
                                {this.state.companyDet && this.state.companyDet.email != '' ?
                                    <TouchableOpacity activeOpacity={0.6}
                                                      onPress={()=>this.handleClick('mailto:' + this.state.companyDet.email)}>
                                        <Icon name="md-mail-open" size={25} color="#4faadb"/>
                                    </TouchableOpacity> : null}
                                {this.state.companyDet && this.state.companyDet.website != '' ?
                                    <TouchableOpacity activeOpacity={0.6}
                                                      onPress={()=>this.handleClick(this.state.companyDet.website.indexOf('h') == 1 ? this.state.companyDet.website : 'http://' + this.state.companyDet.website)}>
                                        <Icon name="ios-globe" size={25} color="#4faadb"/>
                                    </TouchableOpacity> : null}


                            </View>
                        </View>

                        <View style={{
                            borderColor: 'rgba(0,0,0,0.3)',
                            borderBottomWidth: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: height / 7,
                            padding: 5
                        }}>
                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(true);
                            }}><StaticMap lng={this.state.busLng} lat={this.state.busLat}/></TouchableOpacity>

                            <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
                                <TouchableOpacity activeOpacity={0.6} onPress={this.addWatch} style={{
                                    width: width / 2 - 80,
                                    height: 30,
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
                                <TouchableOpacity activeOpacity={0.6} style={{
                                    width: width / 2 - 80,
                                    height: 30,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    padding: 3,
                                    flexDirection: 'row',
                                    backgroundColor: '#368ed1',
                                    justifyContent: 'center'

                                }} onPress={()=>this._shareText(this.state.companyDet)}>
                                    <Text style={{
                                        color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 11,

                                    }}>Send To Friend</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('offerList', {id: this.state.companyDet.ID})}
                                activeOpacity={0.6}>
                                <Image
                                    style={{
                                        height: 65,
                                        width: 65,
                                        marginRight: 10
                                    }}
                                    source={require('../assets/img/Business-alone-page_76.gif')}
                                    resizeMode={'cover'}
                                />
                            </TouchableOpacity>
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
