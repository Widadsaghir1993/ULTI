import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Linking,
    Geolocation,
    Image
} from 'react-native';
import MapView from 'react-native-maps';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import u from '../util/TechWS';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0900;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const customStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
]

class StaticMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: parseFloat(this.props.lat),
                longitude: parseFloat(this.props.lng),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            title: '',
            desc: '',
            userLocation: false,
            followUser: false,
            userLong: '',
            userLat: '',

        };
    }

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //
        //         console.log('-----------------');
        //         console.log(position.coords.longitude);
        //         this.setState({
        //             userLong: position.coords.longitude,
        //             userLat: position.coords.latitude
        //
        //         })
        //     },
        //     (error) => alert(JSON.stringify(error)),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        // );
        // this.watchID = navigator.geolocation.watchPosition((position) => {
        //     this.setState({
        //         userLong: position.coords.longitude,
        //         userLat: position.coords.latitude
        //
        //     })
        //
        // });
    }


    render() {
        return (
            <View style={styles.container}>

                <MapView
                    provider="google"
                    ref={component => this.map = component}
                    style={styles.map}
                    scrollEnabled={true}
                    zoomEnabled={true}
                    pitchEnabled={true}
                    rotateEnabled={true}
                    initialRegion={this.state.region}
                    loadingEnabled={true}
                    customMapStyle={customStyle}
                    cacheEnabled={true}
                    showsUserLocation={this.state.userLocation}
                    followsUserLocation={this.state.followUser}
                >
                    <MapView.Marker
                        title={this.state.title}
                        description={this.state.desc}
                        coordinate={this.state.region}
                    >

                    </MapView.Marker>
                </MapView>
                <View style={{
                    backgroundColor: 'transparent',
                    width: width,
                    height: 50,
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: 20,
                    paddingTop: 10,
                    flexDirection: 'row',
                }}>
                    {/*<TouchableOpacity onPress={() => {*/}
                    {/*this.map.animateToRegion({*/}
                    {/*latitude: this.state.userLat,*/}
                    {/*longitude: this.state.userLong,*/}
                    {/*latitudeDelta: 0.02,*/}
                    {/*longitudeDelta: ASPECT_RATIO * 0.02*/}
                    {/*}, 15000),*/}
                    {/*this.setState({userLocation: true})*/}

                    {/*}}>*/}
                    {/*<FontAwsome name="location-arrow" size={28} color="#9F369F"/>*/}
                    {/*</TouchableOpacity>*/}
                    <TouchableOpacity onPress={()=> {
                        Linking.canOpenURL("comgooglemaps://").then(supported => {
                            if (!supported) {
                                return Linking.openURL("https://www.google.com/maps?saddr=My+Location&daddr=" + this.state.region.latitude + ',' + this.state.region.longitude);
                            } else {
                                return Linking.openURL("comgooglemaps://?saddr=My+Location&daddr=" + this.state.region.latitude + ',' + this.state.region.longitude);
                            }
                        })
                    }
                    }>
                        <Icon name="ios-navigate" size={30} color={'blue'}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },

    map: {
        backgroundColor:'white',
        width: width,
        height: height - 70,
    },
});

module.exports = StaticMap;
