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

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar';
import u from '../util/TechWS';
import Spinner from 'react-native-loading-spinner-overlay';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            refreshing: false,
            sort: 1


        };
        // if you want to listen on navigator events, set this up
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMap = this.handleMap.bind(this);
        this.AZsort = this.AZsort.bind(this);
        this.filters = this.filters.bind(this);

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

    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }

    componentDidMount() {
        this.setState({isLoading: true});
        u.GetCompanies().then(response => {
            var tmp = JSON.parse(response);
            console.log('Companies:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false,
            });
        });

    }

    filters(kind) {
        this.setState({isLoading: true});
        u.GetCompaniesByFilter(kind).then(response => {
            var tmp = JSON.parse(response);
            console.log('Companies:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false,
            });
        });
    }

    AZsort() {
        if (this.state.sort == 1) {
            this.setState({sort: 0, isLoading: true});
            u.GetCompaniesByFilter('A-Z').then(response => {
                var tmp = JSON.parse(response);
                console.log('Companies:-------------------');
                console.log(tmp);
                this.setState({
                    items: tmp,
                    isLoading: false,

                });
            });
        } else {
            this.setState({sort: 1, isLoading: true});
            u.GetCompaniesByFilter('Z-A').then(response => {
                var tmp = JSON.parse(response);
                console.log('Companies:-------------------');
                console.log(tmp);
                this.setState({
                    items: tmp,
                    isLoading: false,
                });
            });
        }
    }

    _renderItem = (itm) => {
        return (
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('BusinessDetail', {id: itm.ID,lat:itm.lat,lng:itm.lng,busDet:itm})}
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
                    width: ((width - 20) / 4) - 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <Image
                        style={{
                            height: 78,
                            width: 80,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                        }}
                        source={{uri: itm.logoimagename != '' ? 'http://www.ulti.online/new_admin/images/' + itm.logoimagename : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                        resizeMode={'cover'}
                    />
                </View>
                <View style={{
                    width: width - 100,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    padding: 10,
                    paddingLeft: 5,
                    paddingRight:5
                }}>
                    <View style={{flex: 0.5, justifyContent: 'flex-start', flexDirection: 'row',width:width-100,paddingLeft:15}}>
                        <Text style={{
                            color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,
                            fontWeight: 'bold'
                        }} numberOfLines={1}>{itm.Name}</Text>
                    </View>
                    <View style={{
                        backgroundColor: 'transparent',
                        flex: 0.5,
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        width: width - 200,

                    }}>

                        {itm.tel != '' && itm.tel != 0 ? <TouchableOpacity activeOpacity={0.6}
                                                                           onPress={()=>this.handleClick('tel:' + itm.tel.replace('+', '00'))}>
                            <Icon name="md-call" size={25} color="#4faadb"/>
                        </TouchableOpacity> : null}

                        {itm.adress != '' ? <TouchableOpacity activeOpacity={0.6}
                                                              onPress={()=>this.handleMap(itm.adress)}>

                            <Icon name="ios-navigate" size={25} color="#4faadb"/>
                        </TouchableOpacity> : null}
                        {itm.email != '' ? <TouchableOpacity activeOpacity={0.6}
                                                             onPress={()=>this.handleClick('mailto:' + itm.email)}>
                            <Icon name="md-mail-open" size={25} color="#4faadb"/>
                        </TouchableOpacity> : null}
                        {itm.website != '' ? <TouchableOpacity activeOpacity={0.6}
                                                               onPress={()=>this.handleClick(itm.website.indexOf('h') == 1 ? itm.website : 'http://' + itm.website)}>
                            <Icon name="ios-globe" size={25} color="#4faadb"/>
                        </TouchableOpacity> : null}

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

    render() {

        let index = 0;
        const time = [
            {key: index++, section: true, label: 'Sort By Time'},
            {key: index++, label: 'All'},
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
            {key: index++, label: 'All'},
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
                    <UNavBar title="BUSINESS LIST" onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>

                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 100}}>
                        <View style={{
                            height: 80,
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
                        height: 50,
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
                            width: width / 3 - 10
                        }}>
                            <ModalPicker
                                data={time}
                                initValue="Latest added first"
                                onChange={(option)=> {
                                    {
                                        this.filters(option.label)
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
                                        this.filters(option.label)
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
                    <View style={{
                        backgroundColor: 'white',
                        height: 40,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        position: 'absolute',
                        top: 120,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flex: 1
                    }}>
                        <TouchableOpacity activeOpacity={0.7} style={{
                            borderRadius: 15,
                            backgroundColor: '#3084cf',
                            height: 30,
                            justifyContent: 'center',
                            paddingLeft: 10,
                            paddingRight: 10,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,
                                backgroundColor: "transparent",
                                fontWeight: 'bold'
                            }}>BUSINESS NEAR ME</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.AZsort} activeOpacity={0.7} style={{
                            borderRadius: 15,
                            backgroundColor: '#3084cf',
                            height: 30,
                            justifyContent: 'center',
                            padding: 10
                        }}>
                            <Text style={{
                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,
                                shadowColor: "black",
                                shadowOffset: {width: 3, height: 3},
                                shadowOpacity: 0.9,
                                backgroundColor: "transparent",
                                fontWeight: 'bold'
                            }}>{this.state.sort == 1 ? 'A-Z' : 'Z-A'}</Text>

                        </TouchableOpacity>

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
