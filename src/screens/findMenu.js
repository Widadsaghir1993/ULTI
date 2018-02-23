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
    Image
} from 'react-native';
// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import UNavBar from '../components/UNavBar';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FindMenu extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
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
                    <UNavBar title="Find Menu" haveBack navigation={this.props.navigation} onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>

                    <ScrollView style={{flex: 1}} contentContainerStyle={{paddingTop: 140}}>


                        <View style={{backgroundColor: 'white', width: width}}>
                            <View style={{backgroundColor: 'white', width: width}}>

                                <TouchableOpacity style={{
                                    borderColor: '#4faadb',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    margin: 10,
                                    height: 120,
                                }} activeOpacity={0.6} onPress={()=>this.props.navigation.navigate('MenuDetail',{id:10})}>

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
                                                height: 118,
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
                                        position: 'absolute', left: width / 4, height: 118,
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
                                                }}>Your Menu Name </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Light',
                                                        fontSize: 7,
                                                        width: 170,
                                                        marginTop: 5
                                                    }}>Google
                                                    is an
                                                    American multinational technology company specializing in
                                                    Internet-related
                                                    services and products. These include online advertising
                                                    technologies,
                                                    search, cloud computing, software, and hardware.</Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Regular',
                                                        fontSize: 10,
                                                        flex: 1,
                                                        color: '#4faada',
                                                        marginTop: 5,

                                                    }}>Working Hours : 4:00pm to 10:00pm</Text>
                                            </View>
                                            <View style={{
                                                flex: 0.25,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: -5
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
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: "white",
                                                        fontFamily: 'RobotoCondensed-Bold',
                                                    }}>$35.53</Text>

                                                </View>
                                            </View>


                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            justifyContent: 'space-between',
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{
                                                width: 80,
                                                height: 25,
                                                borderRadius: 15,
                                                alignItems: 'center',
                                                padding: 3,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>

                                                <Icon name="ios-download-outline" size={20} color="black"/>

                                                <Text style={{
                                                    color: "black", fontFamily: 'RobotoCondensed-light', fontSize: 9,

                                                }}> 300 Download</Text>
                                            </View>
                                            <View style={{
                                                backgroundColor: 'white',
                                                height: 25,
                                                width: 100,
                                                justifyContent: 'space-around',
                                                flexDirection: 'row'
                                            }}>
                                                <Icon name="ios-redo" size={20} color="#4faadb"/>
                                                <Icon name="md-call" size={20} color="#4faadb"/>
                                                <Icon name="ios-navigate" size={20} color="#4faadb"/>
                                                <Icon name="md-mail-open" size={20} color="#4faadb"/>
                                                <Icon name="ios-globe" size={20} color="#4faadb"/>


                                            </View>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 30,
                                    position: 'absolute',
                                    top: 5,
                                    left: 0,
                                }}>
                                    <View style={{
                                        backgroundColor: '#383838',
                                        width: 20,
                                        height: 20,
                                        transform: [{rotate: '45deg'}]
                                    }}>
                                    </View>
                                    <View style={{
                                        backgroundColor: '#383838',
                                        width: 20,
                                        height: 20,
                                        marginTop: -20,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 9,
                                            color: "white",
                                            fontFamily: 'RobotoCondensed-Bold',
                                        }}>NEW</Text>

                                    </View>
                                </View>
                            </View>

                            <View style={{backgroundColor: 'white', width: width}}>

                                <View style={{
                                    borderColor: '#4faadb',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    margin: 10,
                                    height: 120,
                                }}>

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
                                                height: 118,
                                                width: width / 4,
                                                borderBottomLeftRadius: 5,
                                                borderTopLeftRadius: 5,

                                            }}
                                            source={require('../assets/img/Catalogues-listing_22.gif')}
                                            resizeMode={'cover'}
                                        />


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        position: 'absolute', left: width / 4, height: 118,
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
                                                }}>Your Menu Name </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Light',
                                                        fontSize: 7,
                                                        width: 170,
                                                        marginTop: 5
                                                    }}>Google
                                                    is an
                                                    American multinational technology company specializing in
                                                    Internet-related
                                                    services and products. These include online advertising
                                                    technologies,
                                                    search, cloud computing, software, and hardware.</Text>
                                                <Text
                                                    style={{
                                                        fontFamily: 'RobotoCondensed-Regular',
                                                        fontSize: 10,
                                                        flex: 1,
                                                        color: '#4faada',
                                                        marginTop: 5,

                                                    }}>Working Hours : 4:00pm to 10:00pm</Text>
                                            </View>
                                            <View style={{
                                                flex: 0.25,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginTop: -5
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
                                                    justifyContent: 'center'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: "white",
                                                        fontFamily: 'RobotoCondensed-Bold',
                                                    }}>$35.53</Text>

                                                </View>
                                            </View>


                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            justifyContent: 'space-between',
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{
                                                width: 80,
                                                height: 25,
                                                borderRadius: 15,
                                                alignItems: 'center',
                                                padding: 3,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>

                                                <Icon name="ios-download-outline" size={20} color="black"/>

                                                <Text style={{
                                                    color: "black", fontFamily: 'RobotoCondensed-light', fontSize: 9,

                                                }}> 300 Download</Text>
                                            </View>
                                            <View style={{
                                                backgroundColor: 'white',
                                                height: 25,
                                                width: 100,
                                                justifyContent: 'space-around',
                                                flexDirection: 'row'
                                            }}>
                                                <Icon name="ios-redo" size={20} color="#4faadb"/>
                                                <Icon name="md-call" size={20} color="#4faadb"/>
                                                <Icon name="ios-navigate" size={20} color="#4faadb"/>
                                                <Icon name="md-mail-open" size={20} color="#4faadb"/>
                                                <Icon name="ios-globe" size={20} color="#4faadb"/>


                                            </View>
                                        </View>
                                    </View>

                                </View>
                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 30,
                                    position: 'absolute',
                                    top: 5,
                                    left: 0,
                                }}>
                                    <View style={{
                                        backgroundColor: '#f5161d',
                                        width: 20,
                                        height: 20,
                                        transform: [{rotate: '45deg'}]
                                    }}>
                                    </View>
                                    <View style={{
                                        backgroundColor: '#f5161d',
                                        width: 20,
                                        height: 20,
                                        marginTop: -20,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 9,
                                            color: "white",
                                            fontFamily: 'RobotoCondensed-Bold',
                                        }}>HOT</Text>

                                    </View>
                                </View>
                            </View>


                            <View style={{
                                borderColor: '#4faadb',
                                borderWidth: 1,
                                borderRadius: 5,
                                margin: 10,
                                height: 120,
                            }}>

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
                                            height: 118,
                                            width: width / 4,
                                            borderBottomLeftRadius: 5,
                                            borderTopLeftRadius: 5,
                                        }}
                                        source={require('../assets/img/Catalogues-listing_22.gif')}
                                        resizeMode={'cover'}
                                    />
                                </View>
                                <View style={{
                                    backgroundColor: 'white',
                                    position: 'absolute', left: width / 4, height: 118,
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
                                            }}>Your Menu Name </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Light',
                                                    fontSize: 7,
                                                    width: 170,
                                                    marginTop: 5
                                                }}>Google
                                                is an
                                                American multinational technology company specializing in
                                                Internet-related
                                                services and products. These include online advertising
                                                technologies,
                                                search, cloud computing, software, and hardware.</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Regular',
                                                    fontSize: 10,
                                                    flex: 1,
                                                    color: '#4faada',
                                                    marginTop: 5,

                                                }}>Working Hours : 4:00pm to 10:00pm</Text>
                                        </View>
                                        <View style={{
                                            flex: 0.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: -5
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
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "white",
                                                    fontFamily: 'RobotoCondensed-Bold',
                                                }}>$35.53</Text>

                                            </View>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 25,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            <Icon name="ios-download-outline" size={20} color="black"/>

                                            <Text style={{
                                                color: "black", fontFamily: 'RobotoCondensed-light', fontSize: 9,

                                            }}> 300 Download</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 100,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="ios-redo" size={20} color="#4faadb"/>
                                            <Icon name="md-call" size={20} color="#4faadb"/>
                                            <Icon name="ios-navigate" size={20} color="#4faadb"/>
                                            <Icon name="md-mail-open" size={20} color="#4faadb"/>
                                            <Icon name="ios-globe" size={20} color="#4faadb"/>


                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{
                                borderColor: '#4faadb',
                                borderWidth: 1,
                                borderRadius: 5,
                                margin: 10,
                                height: 120,
                            }}>

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
                                            height: 118,
                                            width: width / 4,
                                            borderBottomLeftRadius: 5,
                                            borderTopLeftRadius: 5,

                                        }}
                                        source={require('../assets/img/Catalogues-listing_22.gif')}
                                        resizeMode={'cover'}
                                    />
                                </View>
                                <View style={{
                                    backgroundColor: 'white',
                                    position: 'absolute', left: width / 4, height: 118,
                                    padding: 10,
                                    width: (width - width / 4) - 25,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    paddingBottom: 5
                                }}
                                 >
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'column', flex: 0.75}}>
                                            <Text style={{
                                                color: "black", fontFamily: 'RobotoCondensed-Regular', fontSize: 12,

                                                fontWeight: 'bold'
                                            }}>Your Menu Name </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Light',
                                                    fontSize: 7,
                                                    width: 170,
                                                    marginTop: 5
                                                }}>Google
                                                is an
                                                American multinational technology company specializing in
                                                Internet-related
                                                services and products. These include online advertising
                                                technologies,
                                                search, cloud computing, software, and hardware.</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Regular',
                                                    fontSize: 10,
                                                    flex: 1,
                                                    color: '#4faada',
                                                    marginTop: 5,

                                                }}>Working Hours : 4:00pm to 10:00pm</Text>
                                        </View>
                                        <View style={{
                                            flex: 0.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: -5
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
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "white",
                                                    fontFamily: 'RobotoCondensed-Bold',
                                                }}>$35.53</Text>

                                            </View>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 25,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            <Icon name="ios-download-outline" size={20} color="black"/>

                                            <Text style={{
                                                color: "black", fontFamily: 'RobotoCondensed-light', fontSize: 9,

                                            }}> 300 Download</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 100,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="ios-redo" size={20} color="#4faadb"/>
                                            <Icon name="md-call" size={20} color="#4faadb"/>
                                            <Icon name="ios-navigate" size={20} color="#4faadb"/>
                                            <Icon name="md-mail-open" size={20} color="#4faadb"/>
                                            <Icon name="ios-globe" size={20} color="#4faadb"/>


                                        </View>
                                    </View>
                                </View>

                            </View>

                            <View style={{
                                borderColor: '#4faadb',
                                borderWidth: 1,
                                borderRadius: 5,
                                margin: 10,
                                height: 120,
                            }}>

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
                                            height: 118,
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
                                    position: 'absolute', left: width / 4, height: 118,
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
                                            }}>Your Menu Name </Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Light',
                                                    fontSize: 7,
                                                    width: 170,
                                                    marginTop: 5
                                                }}>Google
                                                is an
                                                American multinational technology company specializing in
                                                Internet-related
                                                services and products. These include online advertising
                                                technologies,
                                                search, cloud computing, software, and hardware.</Text>
                                            <Text
                                                style={{
                                                    fontFamily: 'RobotoCondensed-Regular',
                                                    fontSize: 10,
                                                    flex: 1,
                                                    color: '#4faada',
                                                    marginTop: 5,

                                                }}>Working Hours : 4:00pm to 10:00pm</Text>
                                        </View>
                                        <View style={{
                                            flex: 0.25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: -5
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
                                                justifyContent: 'center'
                                            }}>
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: "white",
                                                    fontFamily: 'RobotoCondensed-Bold',
                                                }}>$35.53</Text>

                                            </View>
                                        </View>


                                    </View>
                                    <View style={{
                                        backgroundColor: 'white',
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{
                                            width: 80,
                                            height: 25,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            padding: 3,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>

                                            <Icon name="ios-download-outline" size={20} color="black"/>

                                            <Text style={{
                                                color: "black", fontFamily: 'RobotoCondensed-light', fontSize: 9,

                                            }}> 300 Download</Text>
                                        </View>
                                        <View style={{
                                            backgroundColor: 'white',
                                            height: 25,
                                            width: 100,
                                            justifyContent: 'space-around',
                                            flexDirection: 'row'
                                        }}>
                                            <Icon name="ios-redo" size={20} color="#4faadb"/>
                                            <Icon name="md-call" size={20} color="#4faadb"/>
                                            <Icon name="ios-navigate" size={20} color="#4faadb"/>
                                            <Icon name="md-mail-open" size={20} color="#4faadb"/>
                                            <Icon name="ios-globe" size={20} color="#4faadb"/>


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
