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
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import FontAwsome from 'react-native-vector-icons/FontAwesome';

export default class Likes extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.onMenuClicked = this.onMenuClicked.bind(this);

    }

    static navigationOptions = {
        tabBar: {
            label: 'Profile',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            icon: ()=><Image
                style={{
                    height: 30,
                    width: 30,

                }}
                source={require('../assets/img/Business-List_07.png')}
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

    onSearchClicked() {
        alert("Search");
    }

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
                    <UNavBar title="Interest" onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>
                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 130}}>

                        <View style={{backgroundColor: 'white', width: width}}>

                            <TouchableOpacity style={{
                                borderColor: '#4faadb',
                                borderWidth: 1,
                                borderRadius: 5,
                                margin: 10,
                                height: 110,
                            }} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('InterestDetail',{id:10})}>

                                    <Image
                                        style={{
                                            height: 108,
                                            width: width / 4,
                                            borderBottomLeftRadius: 5,
                                            borderTopLeftRadius: 5,
                                        }}
                                        source={require('../assets/img/interest-listing-page_09.gif')}
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
                                            }}>Your Business Name Here</Text>
                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                                <FontAwsome name="map-marker" size={18} color="#454545" style={{marginTop:5}}/>
                                                <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Light',
                                                    fontSize: 8,
                                                    width: 180,
                                                    marginTop: 5,
                                                    marginLeft:5,
                                                    color:'black'
                                                }}>Google
                                                is an
                                                American multinational technology company specializing </Text>
                                                </View>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#454545',
                                            width: 70,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 11,
                                            }}>Newyork</Text>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            backgroundColor: '#368ccf',
                                            justifyContent: 'center'

                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 9,

                                            }}>SEE MORE</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 80,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="md-call" size={20} color="#368ccf"/>
                                            <Icon name="md-mail-open" size={20} color="#368ccf"/>
                                            <Icon name="ios-globe" size={20} color="#368ccf"/>


                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>

                        </View>

                        <View style={{backgroundColor: 'white', width: width}}>

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
                                    source={require('../assets/img/interest-listing-page_06.gif')}
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
                                            }}>Your Business Name Here</Text>
                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                                <FontAwsome name="map-marker" size={18} color="#454545" style={{marginTop:5}}/>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Light',
                                                        fontSize: 8,
                                                        width: 180,
                                                        marginTop: 5,
                                                        marginLeft:5,
                                                        color:'black'
                                                    }}>Google
                                                    is an
                                                    American multinational technology company specializing </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#454545',
                                            width: 70,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 11,
                                            }}>Newyork</Text>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            backgroundColor: '#368ccf',
                                            justifyContent: 'center'

                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 9,

                                            }}>SEE MORE</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 80,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="md-call" size={20} color="#368ccf"/>
                                            <Icon name="md-mail-open" size={20} color="#368ccf"/>
                                            <Icon name="ios-globe" size={20} color="#368ccf"/>


                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>

                        <View style={{backgroundColor: 'white', width: width}}>

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
                                    source={require('../assets/img/interest-listing-page_11.gif')}
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
                                            }}>Your Business Name Here</Text>
                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                                <FontAwsome name="map-marker" size={18} color="#454545" style={{marginTop:5}}/>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Light',
                                                        fontSize: 8,
                                                        width: 180,
                                                        marginTop: 5,
                                                        marginLeft:5,
                                                        color:'black'
                                                    }}>Google
                                                    is an
                                                    American multinational technology company specializing </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#454545',
                                            width: 70,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 11,
                                            }}>Newyork</Text>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            backgroundColor: '#368ccf',
                                            justifyContent: 'center'

                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 9,

                                            }}>SEE MORE</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 80,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="md-call" size={20} color="#368ccf"/>
                                            <Icon name="md-mail-open" size={20} color="#368ccf"/>
                                            <Icon name="ios-globe" size={20} color="#368ccf"/>


                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>

                        <View style={{backgroundColor: 'white', width: width}}>

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
                                    source={require('../assets/img/interest-listing-page_13.gif')}
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
                                            }}>Your Business Name Here</Text>
                                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                                                <FontAwsome name="map-marker" size={18} color="#454545" style={{marginTop:5}}/>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Light',
                                                        fontSize: 8,
                                                        width: 180,
                                                        marginTop: 5,
                                                        marginLeft:5,
                                                        color:'black'
                                                    }}>Google
                                                    is an
                                                    American multinational technology company specializing </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            backgroundColor: '#454545',
                                            width: 70,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            justifyContent: 'center'
                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Regular', fontSize: 11,
                                            }}>Newyork</Text>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 20,
                                            borderRadius: 10,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            backgroundColor: '#368ccf',
                                            justifyContent: 'center'

                                        }}>
                                            <Text style={{
                                                color: "white", fontFamily: 'RobotoCondensed-Bold', fontSize: 9,

                                            }}>SEE MORE</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 80,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="md-call" size={20} color="#368ccf"/>
                                            <Icon name="md-mail-open" size={20} color="#368ccf"/>
                                            <Icon name="ios-globe" size={20} color="#368ccf"/>


                                        </View>
                                    </View>
                                </View>

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
