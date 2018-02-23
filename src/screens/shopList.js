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
    Button,
    Linking,
    FlatList,
    ActivityIndicator
} from 'react-native';
import {iconsMap, iconsLoaded} from '../assets/appicons';
import ModalPicker from 'react-native-modal-picker';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import Spinner from 'react-native-loading-spinner-overlay';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar';
import u from '../util/TechWS';
import {List, SearchBar} from 'react-native-elements';

export default class Home extends Component {
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
        this.onMenuClicked = this.onMenuClicked.bind(this);

    }

    static navigationOptions = {

        tabBar: {

            label: 'Home',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ()=><Image
                style={{
                    height: 26,
                    width: 26,

                }}
                source={require('../assets/img/Business-List_07-03.png')}
                resizeMode={'contain'}
            />
            ,

        },

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

    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }

    componentDidMount() {
        this.setState({isLoading: true});
        u.GetShops(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Shops:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false

            });
        });
        console.log('Shops item:-------------------');

        console.log(this.state.items);


    }

    _renderItem = (itm) => {
        return (
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('shopDetail', {id: itm.ID})}
                activeOpacity={0.6}
                style={{
                    height: 80,
                    flexDirection: 'row',
                    width: width - 20,
                    borderColor: '#4faadb',
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: 'flex-start',
                    alignSelf: 'center',
                    marginTop: 10

                }}
                key={"item__" + itm.ID}>
                <View style={{
                    width: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image
                        style={{
                            height: 80,
                            width: 80,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,

                        }}
                        source={{uri: itm.logoname != '' ? 'http://www.ulti.online/new_admin/images/' + itm.logoname : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                        resizeMode={'cover'}
                    />
                </View>
                <View style={{
                    padding: 10,
                    width: width - 20,
                    flexDirection: 'column',
                }}>
                    <View style={{height:40}}>
                        <Text style={{
                            color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,
                            fontWeight: 'bold'
                        }}>{itm.name}</Text>
                    </View>

                    <View style={{flexDirection:'row',height:40,paddingBottom:5}}>
                        <View style={{
                            backgroundColor: '#454545',
                            width: 80,
                            height: 25,
                            borderRadius: 15,
                            alignItems: 'center',
                            padding: 3,
                        }}>
                            <Text style={{
                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,

                            }}>{itm.address}</Text>
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
                                                                                onPress={()=>this.handleMap(itm.adress)}>

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
            </TouchableOpacity>


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

    onMenuClicked() {
        this._drawer.open();
    }

    render() {

        let index = 0;
        const time = [
            {key: index++, section: true, label: 'Sort By Time'},
            {key: index++, label: 'Latest Added'},
            {key: index++, label: 'First Added'},

        ];
        const rate = [
            {key: index++, section: true, label: 'Sort By Rate'},
            {key: index++, label: 'Best Rate'},
            {key: index++, label: 'Best View'},

        ];
        const city = [
            {key: index++, section: true, label: 'Sort By City'},
            {key: index++, label: 'Limassol'},
            {key: index++, label: 'Aiya Napa'},

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
                    <View style={{
                    height: 50,
                    backgroundColor: "#4faadb",
                    alignItems: 'center',
                    flexDirection: 'row',

                }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{padding: 10}}><Icon
                            name="md-arrow-back" size={30}
                            color="white"/></TouchableOpacity>
                        <View style={{width: width - 70, justifyContent: 'center', alignSelf: 'center'}}>

                            <Text style={{
                                color: 'white',
                                marginLeft: 10,
                                fontFamily: 'RobotoCondensed-Bold'
                            }}>Shop List</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={this.onMenuClicked}>
                            <Icon name="md-menu" size={30} color="white"/>
                        </TouchableOpacity>
                    </View>

                </View>
                    <ScrollView style={{flex: 1}} contentContainerStyle={{
                        paddingTop: 50, justifyContent: 'center'
                    }}>
                        <View style={{
                            height: 80
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
                        {this.state.items != '' ?
                            <List style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                                <FlatList
                                    data={this.state.items}
                                    renderItem={({item})=>this._renderItem(item)}
                                    keyExtractor={(item, index) => 'item_' + item.ID}
                                    refreshing={this.state.refreshing}
                                    onRefresh={()=>this.setState({refreshing: true})}
                                    ListFooterComponent={this._renderFooter}

                                />

                            </List> :
                            <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20, color: 'rgba(0,0,0,0.8)'}}>Please
                                Add Shops</Text>}

                    </ScrollView>
                    <View style={{
                        backgroundColor: 'white',
                        height: 50,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 50,
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
                            width: width / 3 - 10
                        }}>
                            <ModalPicker
                                data={time}
                                initValue="Latest added first"
                                onChange={(option)=> {
                                    {
                                        alert(option.label)
                                    }
                                }}>
                                <View style={{flexDirection: "row", alignItems: "center"}}>
                                    <Text style={{
                                        color: "#222",
                                        fontFamily: 'RobotoCondensed-Regular',
                                        paddingRight: 5,
                                        fontSize: 10
                                    }}>Latest
                                        added</Text>
                                    <Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>
                                </View>
                            </ModalPicker>
                        </View>

                        <View style={{
                            backgroundColor: '#cacbcc',
                            height: 40,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            width: width / 3 - 10
                        }}>
                            <ModalPicker
                                data={rate}
                                initValue="Latest added first"
                                onChange={(option)=> {
                                    {
                                        alert(option.label)
                                    }
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: "#222",
                                        fontFamily: 'RobotoCondensed-Regular',
                                        paddingRight: 5,
                                        fontSize: 10
                                    }}>Best
                                        rating</Text>
                                    <Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>


                                </View>
                            </ModalPicker>
                        </View>

                        <View style={{
                            backgroundColor: '#cacbcc',
                            height: 40,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            width: width / 3 - 10
                        }}>
                            <ModalPicker
                                data={city}
                                initValue="Latest added first"
                                onChange={(option)=> {
                                    {
                                        alert(option.label)
                                    }
                                }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        color: "#222",
                                        fontFamily: 'RobotoCondensed-Regular',
                                        paddingRight: 5,
                                        fontSize: 10
                                    }}>City</Text>
                                    <Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>


                                </View>
                            </ModalPicker>
                        </View>

                    </View>
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
