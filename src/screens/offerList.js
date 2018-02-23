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
import Spinner from 'react-native-loading-spinner-overlay';

import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {List, SearchBar} from 'react-native-elements';
import u from '../util/TechWS';

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {
            offers: [],
            isLoading: false,
            refreshing: false


        };
        this.onMenuClicked = this.onMenuClicked.bind(this);

    }

    static navigationOptions = {
        tabBar: {
            label: 'Profile',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ()=><Image
                style={{
                    height: 25,
                    width: 25,

                }}
                source={require('../assets/img/Business-List_07-04.png')}
                resizeMode={'contain'}
            />
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
        u.GetOffers(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log('Offers:-------------------');
            console.log(tmp);
            this.setState({
                offers: tmp,
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
            <View style={{
                borderColor: '#4faadb',
                borderWidth: 1,
                borderRadius: 5,
                margin: 10,
                height: 80,
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('OfferDetail', {id: itm.ID})}
                    activeOpacity={0.6} style={{
                    height: 80,
                    flexDirection: 'row',
                    width: width / 2,
                }}>
                    <Image
                        style={{
                            height: 76,
                            width: width / 4 - 5,
                        }}
                        source={{uri: itm.imagename && 'http://www.ulti.online/new_admin/images/' + itm.imagename}}
                        resizeMode={'cover'}
                    />

                    <View style={{flexDirection: 'column', flex: 0.75, padding: 10}}>
                        <Text style={{
                            color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,

                            fontWeight: 'bold'
                        }}>{itm.name}</Text>
                        <Text
                            style={{
                                fontFamily: 'RobotoCondensed-Light',
                                fontSize: 7,
                                width: 130,
                                marginTop: 5
                            }}>{itm.description}</Text>
                    </View>

                </TouchableOpacity>
                <View style={{width: width / 2, flexDirection: 'column'}}>
                    <View style={{
                        width: width / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 70,
                        marginLeft: 20
                    }}>
                        <View style={{
                            backgroundColor: '#368ccf',
                            width: 45,
                            height: 45,
                            transform: [{rotate: '45deg'}]
                        }}>
                        </View>
                        <View style={{
                            backgroundColor: '#368ccf',
                            width: 45,
                            height: 45,
                            marginTop: -45,
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}>

                            <Text style={{
                                fontSize: 13,
                                color: "white",
                                fontFamily: 'RobotoCondensed-Bold',
                            }}>{itm.remark}</Text>
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
                            }}>Offer List</Text>
                                </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={this.onMenuClicked}>
                                <Icon name="md-menu" size={30} color="white"/>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        height: 60,
                        flexDirection: 'row',
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
                    <ScrollView style={{flex: 1}}>

                        <View style={{
                            backgroundColor: 'white',
                            height: 80,
                        }}>

                            <Image
                                style={{
                                    height: 80,
                                    width: width,
                                }}
                                source={require('../assets/img/banner.png')}
                                resizeMode={'cover'}
                            />
                        </View>

                        <View style={{backgroundColor: 'white', width: width}}>
                            <View style={{backgroundColor: 'white', width: width}}>
                                {this.state.offers != '' ?
                                    <List style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                                        <FlatList
                                            data={this.state.offers}
                                            renderItem={({item})=>this._renderItem(item)}
                                            keyExtractor={(item, index) => 'item_' + item.id}
                                            refreshing={this.state.refreshing}
                                            onRefresh={()=>this.setState({refreshing: true})}
                                            ListFooterComponent={this._renderFooter}
                                            ListHeaderComponent={this._renderHeader}

                                        />

                                    </List> : <Text
                                    style={{fontWeight: 'bold', fontSize: 20, padding: 20, color: 'rgba(0,0,0,0.8)'}}>Please
                                    Add Offer</Text>}


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
