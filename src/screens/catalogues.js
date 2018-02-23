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
    ActivityIndicator
} from 'react-native';
// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import UNavBar from '../components/UNavBar';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {List, SearchBar} from 'react-native-elements';
import u from '../util/TechWS';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Catalogue extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            catalogs: [],
            isLoading: false,
            refreshing: false
        };
        this.onMenuClicked = this.onMenuClicked.bind(this);

    }

    static navigationOptions = {
        tabBar: {
            label: 'Profile',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ()=><FontAwsome name="gift" size={30} color="#FFF"/>
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
        u.GetCatalog(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('catalog:-------------------');
            console.log(tmp);
            this.setState({
                catalogs: tmp,
                isLoading: false,
                refreshing: false


            });
        });

    }

    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }
    _renderItem = (itm) => {
        return (
            <TouchableOpacity style={{
                borderColor: '#4faadb',
                borderWidth: 1,
                borderRadius: 5,
                margin: 10,
                height: 85,
            }} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('CataloguesDetail',{id:itm.ID})}>

                <View style={{
                    backgroundColor: '#f0f0f0',
                    width: width / 4,
                    flex: 1,
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Image
                        style={{
                            height: 78,
                            width: width / 4,
                            borderBottomLeftRadius: 5,
                            borderTopLeftRadius: 5,

                        }}
                        source={require('../assets/img/Catalogues-listing_11.gif')}
                        resizeMode={'cover'}
                    />


                </View>
                <View style={{
                    backgroundColor: 'white',
                    position: 'absolute', left: width / 4, height: 80,
                    padding: 10,
                    width: (width - width / 4) - 25,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: 5
                }}>
                    <View style={{flexDirection: 'column', flex: 0.75}}>

                        <Text style={{
                            color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,
                            fontWeight: 'bold'
                        }}>{itm.name}</Text>
                        <Text
                            style={{
                                fontFamily: 'RobotoCondensed-Light',
                                fontSize: 8,
                                marginTop: 5,
                            }}>{itm.description}</Text>
                        <Text
                            style={{
                                fontFamily: 'RobotoCondensed-Regular',
                                fontSize: 10,
                                flex: 1,
                                color: '#4faada',
                                marginTop: 5,

                            }}>Availabe On : {itm.date}</Text>
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
            {key: index++, section: true, label: 'Categories'},
            {key: index++, label: 'Category 1'},
            {key: index++, label: 'Category 2'},

        ];
        const rate = [
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
                    <UNavBar title="Find Catalogue" haveBack navigation={this.props.navigation}
                             onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>

                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 140}}>


                        <View style={{backgroundColor: 'white', width: width}}>
                            <View style={{backgroundColor: 'white', width: width}}>
                                {this.state.catalogs!=''?<List style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                                    <FlatList
                                        data={this.state.catalogs}
                                        renderItem={({item})=>this._renderItem(item)}
                                        keyExtractor={(item, index) => 'item_' + item.id}
                                        refreshing={this.state.refreshing}
                                        onRefresh={()=>this.setState({refreshing: true})}
                                        ListFooterComponent={this._renderFooter}

                                    />

                                </List>:<Text style={{fontWeight:'bold',fontSize:20,padding:20,color:'rgba(0,0,0,0.8)'}}>Please Add Catalogues</Text>}

                            </View>

                        </View>
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

                        <TouchableOpacity style={{
                            backgroundColor: '#3084cf',
                            height: 40,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            width: width / 3 - 10
                        }} activeOpacity={0.6}>

                            <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'center'}}>
                                <Text style={{
                                    color: "white",
                                    fontFamily: 'RobotoCondensed-Bold',
                                    paddingRight: 5,
                                    fontSize: 12,
                                    alignItems: 'center',
                                }}>NEAR ME</Text>


                            </View>
                        </TouchableOpacity>

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
