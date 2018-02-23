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
import UNavBar from '../components/UNavBar'
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
export default class Profile extends Component {
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
                    height: 28,
                    width: 28,

                }}
                source={require('../assets/img/Business-List_07-05.png')}
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
                    <UNavBar title="Notification Setting" onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>
                    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10,
                            marginTop: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>COMPANIES</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>

                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>OFFERS</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>


                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>MENUS</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>


                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text
                                style={{}}>CATALOGUES</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>


                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>CATEGORY</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>


                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>CATEGORY</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>

                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>CATEGORY</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>

                        <View style={{
                            alignSelf: 'center',
                            borderColor: '#4faadb',
                            borderWidth: 0.5,
                            borderRadius: 5,
                            padding: 10,
                            width: width - 20,
                            height: 50,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{justifyContent: 'center', flex: 1.4}}><Text style={{}}>CATEGORY</Text></View>
                            <View style={{
                                flexDirection: 'row',
                                flex: 0.6,
                                alignSelf: 'center',
                                justifyContent: 'space-around',
                            }}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-checkmark" size={20} color="green"/>

                                    <Text>Yes</Text>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <Icon name="md-close" size={20} color="red"/>
                                    <Text>No</Text>

                                </View>

                            </View>


                        </View>
                    </ScrollView>

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
