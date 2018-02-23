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
    Button
} from 'react-native';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';


export default class ImagePicker extends Component {
    constructor(props) {
        super(props);
        this.onImageClick = this.onImageClick.bind(this);

        this.state = {

            selectedImage: '',


        };
    }

    onImageClick(idx) {
        this.setState({selectedImage: 'http://www.ulti.online/new_admin/images/' + this.props.photos[idx].imageName})
    }

    // onMenuClicked() {
    //     alert("Menu");
    // }
    componentDidMount() {
        console.log('+++++++');
        console.log('+++++++');
        console.log(this.props.photos);

    }

    render() {

        return (

            <View style={{alignItems: 'center', flex: 1, backgroundColor: '#edfafc'}}>
                <View style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                    height: height / 4 + 10,
                    backgroundColor: '#edfafc'
                }}>

                    <Image resizeMode={'contain'} style={{width: width - 20, height: height / 4 +10}}
                           source={{uri: this.state.selectedImage != '' ? this.state.selectedImage :  this.props.photos[0]?'http://www.ulti.online/new_admin/images/' +this.props.photos[0].imageName:'http://www.ulti.online/new_admin/images/' + this.props.companyLogo}}
                    />

                </View>
                <ScrollView horizontal={true} style={{
                    width: width - 20,
                    flexDirection: 'row',

                }} contentContainerStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    {this.props.photos.map((itm, idx)=>
                        <TouchableOpacity key={"item__" + itm.ID} onPress={()=>this.onImageClick(idx)}>
                            <Image style={{width: width / 4 - 10, height: width / 4 - 50}}
                                   source={{uri: itm.imageName != '' ? 'http://www.ulti.online/new_admin/images/' + itm.imageName : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                            />
                        </TouchableOpacity>
                    )}


                </ScrollView>
            </View>
        )
    }

};










