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
    FlatList,
    ActivityIndicator,
    Linking
} from 'react-native';
// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import u from '../util/TechWS';

export default class GasStation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            refreshing: false


        };
        // if you want to listen on navigator events, set this up
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.cityFilter = this.cityFilter.bind(this);
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
        u.GetGasStation('All').then(response => {
            console.log(response);

            var tmp = JSON.parse(response);
            console.log('gas Station:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false

            });
        }).catch(e=>{console.log('fffff'),this.setState({isLoading:false})});

    }

    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }
    handleClick = (url) => {
        if(url) {
            console.log(url);
            Linking.openURL(url);
        }else{
            alert('missing')
        }
    };

    handleMap = (address) => {
        if(address){
            u.GetCoordinates(address).then(response => {
                var res = JSON.parse(response);
                console.log(res.results[0].geometry.location);

                Linking.openURL('geo:' + res.results[0].geometry.location.lat + ',' + res.results[0].geometry.location.lng);

            });
        }else{
            alert('address missing')
        }
    };
    _renderItem = (itm) => {
        return (
            <View style={{
                borderColor: '#4faadb',
                borderWidth: 1,
                borderRadius: 5,
                margin: 10,
                height: 110,
            }}>

                <Image
                    style={{
                        height: 108,
                        width: width / 4,
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                    }}
                    source={{uri: itm.imageName != '' ? 'http://www.ulti.online/new_admin/images/' + itm.imageName : 'http://www.ulti.online/new_admin/img/logoBig.png'}}
                    resizeMode={'cover'}
                />


                <View style={{
                    backgroundColor: 'white',
                    position: 'absolute', left: width / 4, height: 108,
                    padding: 10,
                    width: (width - width / 4) - 25,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: 5
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column', flex: 0.75}}>
                            <Text style={{
                                color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,

                                fontWeight: 'bold'
                            }}>{itm.Name}</Text>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',marginTop:5}}>
                                <FontAwsome name="map-marker" size={18} color="#454545" style={{marginTop:5}}/>
                                <Text
                                    style={{
                                        fontFamily: 'RobotoCondensed-Light',
                                        fontSize: 8,
                                        width: 180,
                                        marginTop: 7,
                                        marginLeft:5,
                                        color:'black'
                                    }}>{itm.address}</Text>
                            </View>
                        </View>



                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        flexDirection: 'row'
                    }}>
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

                            }}>{itm.city}</Text>
                        </View>
                        <View style={{
                            backgroundColor: 'transparent',
                            width: width/2,
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                        }}>

                            <TouchableOpacity activeOpacity={0.6}
                                              onPress={()=>this.handleClick('tel:' + itm.tel.replace('+', '00'))}>
                                <Icon name="md-call" size={20} color="#4faadb"/>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.6}
                                              onPress={()=>this.handleMap(itm.address)}>

                                <Icon name="ios-navigate" size={20} color="#4faadb"/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}
                                              onPress={()=>this.handleClick('mailto:' + itm.email)}>
                                <Icon name="md-mail-open" size={20} color="#4faadb"/>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.6}
                                              onPress={()=>this.handleClick(itm.website.indexOf('h') == 1 ? itm.website : 'http://' + itm.website)}>
                                <Icon name="ios-globe" size={20} color="#4faadb"/>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </View>
        )
    };

    _renderFooter = ()=> {
        if (!this.state.isLoading) return null;
        return (
            <View style={{paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#CED0CE'}}>
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };

    cityFilter(city){
        this.setState({isLoading: true});
        u.GetGasStation(city.label).then(response => {
            console.log(response);

            var tmp = JSON.parse(response);
            console.log('gas Station:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false

            });
        }).catch(e=>{console.log('fffff'),this.setState({isLoading:false})});
    }
    render() {
        let index = 0;
        const city = [
            {key: index++, section: true, label: 'City'},
            {key: index++, label: 'All'},
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
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <UNavBar title="Find Gas Station" haveBack navigation={this.props.navigation} onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>
                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 130}}>


                                <FlatList
                                    data={this.state.items}
                                    renderItem={({item})=>this._renderItem(item)}
                                    keyExtractor={(item, index) => 'item_' + item.ID}
                                    refreshing={this.state.refreshing}
                                    onRefresh={()=>this.setState({refreshing: true})}
                                    ListFooterComponent={this._renderFooter}

                                />





                    </ScrollView>

                    <View style={{
                        backgroundColor: 'white',
                        height: 60,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 70,
                        justifyContent: 'space-around',
                    }}>
                        <View style={{
                            backgroundColor: '#cacbcc',
                            height: 40,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            width: width / 2
                        }}>
                            <ModalPicker
                                data={city}
                                initValue="CITY"
                                onChange={(option)=> {
                                    {
                                        this.cityFilter(option)
                                    }
                                }}>
                                <View style={{flexDirection: "row", justifyContent:'space-between'}}>
                                    <Text style={{
                                        color: "#222",
                                        fontFamily: 'RobotoCondensed-Regular',
                                        paddingRight: 5,
                                        fontSize: 12
                                    }}>CITY</Text>
                                    <Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>
                                </View>
                            </ModalPicker>
                        </View>




                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        height: 80,
                        left: 0,
                        right: 0,
                        position: 'absolute',
                        top: 125,
                    }}>

                        <Image
                            style={{
                                height: 80,
                                width: width,
                                left: 0,
                                right: 0,
                                position: 'absolute',
                                top: 0,
                                bottom: 0
                            }}
                            source={require('../assets/img/banner.png')}
                            resizeMode={'cover'}
                        />
                    </View>
                </View>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </Drawer>)
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
