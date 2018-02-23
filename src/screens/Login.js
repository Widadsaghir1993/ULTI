import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Dimensions,
    Platform,
    Modal
} from "react-native";
var {height, width} = Dimensions.get('window');
import t from 'tcomb-form-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import store from 'react-native-simple-store';
const FBSDK = require('react-native-fbsdk');

import u from '../util/TechWS';
const {
    LoginButton,
    AccessToken,
    LoginManager
} = FBSDK;
var Gender = t.enums({
    0: 'Male',
    1: 'Female'
});
function unescapeHTML(escapedHTML) {
    return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

let Form = t.form.Form;


let Login = t.struct({
    Username: t.String,
    Password: t.String,

});

let options = {

    fields: {
        Username: {
            label: "",
            returnKeyType: "next",
            autoCorrect: false,
            error: 'Please Enter Your Email',
            underlineColorAndroid: "rgba(0,0,0,0)",
            auto: 'Email',
            placeholder: 'Email',
        },
        Password: {
            returnKeyType: "go",
            secureTextEntry: true,
            autoCorrect: false,
            error: 'Please Enter Your Password',
            underlineColorAndroid: "rgba(0,0,0,0)",
            auto: 'Password',
            placeholder: 'Password',


        },


    },
};


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //value: {Username: 'aidin', Password: '12345'},
            isLoading: false,
            modalVisible: false,
            modalPassVisible: false,
            valueUser: null,
            valuePass: null,


        };
        this._onLogin = this._onLogin.bind(this);
        this._AddUser = this._AddUser.bind(this);
        this._ForgetPass = this._ForgetPass.bind(this);
        this.handleFacebookLogin = this.handleFacebookLogin.bind(this);

    }

    getForm() {
        return (t.struct({
            Name: t.String,
            Surname: t.String,
            Gender: Gender,
            Email: t.String,
            Password: t.String,
            ConfirmPassword: t.String,
        }));
    }

    getFormPass() {
        return (t.struct({
            Email: t.String,
        }));
    }

    getFormOptions() {
        return (
        {
            fields: {

                Name: {
                    label: "",
                    returnKeyType: "next",
                    autoCorrect: false,
                    error: 'Please Enter Your Name',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Name',
                    placeholder: 'Name',
                },
                Surname: {
                    label: '',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Enter Your Surname',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Surname',
                    placeholder: 'Surname',

                },
                Gender: {
                    label: '',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Enter Your Gender',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Gender',
                    placeholder: 'Gender',

                },
                Email: {
                    label: '',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Enter Your Email',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Email',
                    placeholder: 'Email',


                },
                Password: {
                    label: '',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Enter Your Password',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Password',
                    placeholder: 'Password',
                    secureTextEntry: true

                },
                ConfirmPassword: {
                    label: '',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Confirm Your Password',
                    underlineColorAndroid: "rgba(0,0,0,0)",
                    auto: 'Password',
                    placeholder: 'Confirm Password',
                    secureTextEntry: true


                },

            }
        }
        );
    }

    getFormOptionsPass() {
        return (
        {
            fields: {

                Email: {
                    label: 'Email',
                    returnKeyType: "go",
                    autoCorrect: false,
                    error: 'Please Enter Your Email',
                    underlineColorAndroid: "rgba(0,0,0,0)",


                },

            }
        }
        );
    }

    _ForgetPass() {
        this.setState({isLoading: true});

        var value = this.form.getValue();
        console.log('$$$$$$$$$$$$');
        console.log(this.state.valuePass);
        u.ForgetPass({
            value: this.state.valuePass,
        }).then(response => {
            this.setState({isLoading: false});
            console.log(response);
            if (response == 'email sent') {
                Alert.alert(
                    'Error',
                    'Your Password sent, Please check your mail.',
                    [
                        {text: 'OK', onPress: () => this.setState({modalPassVisible: false}), style: 'cancel'}
                    ]
                )


            } else {
                Alert.alert(
                    'Error',
                    'Something Wrong',
                    [
                        {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                    ]
                )
            }
        })
    }


    _AddUser() {
        this.setState({isLoading: true});

        var value = this.form.getValue();
        console.log('$$$$$$$$$$$$');
        console.log(this.state.valueUser.Password);
        if (this.state.valueUser.Password == this.state.valueUser.ConfirmPassword) {
            u.AddUser({
                value: this.state.valueUser,
            }).then(response => {
                this.setState({isLoading: false});
                console.log(response);
                if (response == 'duplicate') {
                    Alert.alert(
                        'Error',
                        'This Email Exist Please insert another one !',
                        [
                            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                        ]
                    )
                } else if (response == 'email sent') {
                    Alert.alert(
                        '',
                        'Your account has been created. We have sent an activation email to your email account. Click on the link inside the email to activate your account.',
                        [
                            {text: 'OK', onPress: () => this.setState({modalVisible: false}), style: 'cancel'}
                        ]
                    )


                } else {
                    Alert.alert(
                        'Error',
                        'Incorrect Email.',
                        [
                            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                        ]
                    )
                }
            })
        } else {
            this.setState({isLoading: false});

            Alert.alert(
                'Error',
                'Passwords are not match',
                [
                    {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
                ]
            )
        }
    }

    setModalVisible(visible) {
        this.state.valueUser = '';
        this.setState({modalVisible: visible});
    }

    setModalPassVisible(visible) {
        this.setState({modalPassVisible: visible});
    }

    _onLogin() {
        let value = this.form.getValue();
        console.log(value);
        if (value) {
            this.setState({isLoading: true});
            // var randomnumber = Math.ceil(Math.random()*10000000000);
            // console.log(randomnumber);
            u.Login({
                email: value.Username,
                pass: value.Password,
            }).then(response => {
                this.setState({isLoading: false});
                console.log(response);
                if (response.length > 0) {
                    store.save('profile', {
                        Token: response,
                    });
                    this.props.navigation.navigate('Home', {Token: response})
                } else {

                }
            })

        } else {
            //todo alert empty
        }


    };

    handleFacebookLogin () {
        LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
            result => {
                console.log('Login success with permissions: ' + result.grantedPermissions.toString())
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                        store.save('profile', {
                            Token: data.accessToken.toString(),
                        });
                        console.log('_______token______');
                        console.log(data.accessToken);
                        this.props.navigation.navigate('Home', {Token: data.accessToken.toString()})
                    }
                )
            }

        )
    }
    render() {

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#C1F1F9'}}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={{
                        flex: 1,
                        padding: 25,
                        backgroundColor: '#C1F1F9',
                        paddingTop: 10

                    }}>
                        <View style={{
                            backgroundColor: '#C1F1F9',
                            height: 140, justifyContent: 'center',
                            alignItems: 'center'

                        }}>
                            <Image style={{width: width - 80, height: 110}}
                                   source={require('../assets/img/loginBanner.png')}/>
                        </View>
                        <ScrollView style={{

                            backgroundColor: 'transparent',
                            padding: 15,
                        }}>


                            <Form
                                ref={(c) => this.form = c}
                                type={this.getForm()}
                                value={this.state.valueUser}
                                onChange={(valueUser)=>this.setState({valueUser})}
                                options={this.getFormOptions()}/>
                            <View style={{backgroundColor: 'transparent', height: 80}}>
                                <Icon.Button size={24} backgroundColor="#0584DA"
                                             style={{alignSelf: 'center',}}
                                             underlayColor='#1abc9c' onPress={this._AddUser}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'white',
                                        alignSelf: 'center',

                                    }}>
                                        Register
                                    </Text>
                                </Icon.Button>

                            </View>
                            <View style={{backgroundColor: 'transparent', height: 80, marginTop: -20}}>
                                <Icon.Button size={24} backgroundColor="#4DACE2"
                                             style={{alignSelf: 'center',}}
                                             underlayColor='#1abc9c' onPress={()=>this.setModalVisible(false)}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'white',
                                        alignSelf: 'center',

                                    }}>
                                        Cancel
                                    </Text>
                                </Icon.Button>

                            </View>
                        </ScrollView>
                    </View>

                </Modal>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalPassVisible}
                    onRequestClose={() => {
                    }}
                >
                    <View style={{
                        flex: 1,
                        padding: 25,
                        backgroundColor: '#C1F1F9',

                    }}>
                        <View style={{
                            backgroundColor: '#C1F1F9',
                            height: 140, justifyContent: 'center',
                            alignItems: 'center'

                        }}>
                            <Image style={{width: width - 80, height: 110}}
                                   source={require('../assets/img/loginBanner.png')}/>
                        </View>
                        <ScrollView style={{
                            padding: 15,
                        }}>
                            <Form
                                ref={(c) => this.form = c}
                                type={this.getFormPass()}
                                value={this.state.valuePass}
                                onChange={(valuePass)=>this.setState({valuePass})}
                                options={this.getFormOptionsPass()}/>
                            <View style={{backgroundColor: 'transparent', height: 80, marginTop: 20}}>
                                <Icon.Button size={24} backgroundColor="#0584DA"
                                             style={{alignSelf: 'center',}}
                                             underlayColor='#1abc9c' onPress={this._ForgetPass}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'white',
                                        alignSelf: 'center',

                                    }}>
                                        Send
                                    </Text>
                                </Icon.Button>
                            </View>
                            <View style={{backgroundColor: 'transparent', height: 80, marginTop: -20}}>
                                <Icon.Button size={24} backgroundColor="#4DACE2"
                                             style={{alignSelf: 'center',}}
                                             underlayColor='#1abc9c' onPress={()=>this.setModalPassVisible(false)}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: 'white',
                                        alignSelf: 'center',

                                    }}>
                                        Cancel
                                    </Text>
                                </Icon.Button>
                            </View>
                        </ScrollView>
                    </View>

                </Modal>
                <View style={{
                    backgroundColor: '#C1F1F9',
                    height: 180,
                    padding: 30,
                }}>
                    <Image style={{width: width - 40, height: 130}}
                           source={require('../assets/img/loginBanner.png')}/>
                </View>

                <View style={{
                    width: width - 40,

                    marginBottom: 40,
                    flexDirection: 'column',

                    borderRadius: 7,
                    backgroundColor: 'rgba(255,255,255,0.6)',
                    marginTop: 5


                }}>
                    <View style={{
                        width: width - 40,
                        backgroundColor: '#0081D9',
                        height: 50,
                        borderTopLeftRadius: 7,
                        borderTopRightRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center'

                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>Login</Text>
                    </View>
                    <View style={{
                        width: width - 40,
                        padding: 15,
                        paddingBottom: 0
                    }}>
                        <Form
                            ref={(c) => this.form = c}
                            type={Login}
                            value={this.state.value}
                            options={options}
                        />
                    </View>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        width: width - 40,
                        backgroundColor: 'transparent',
                        borderBottomColor: '#00BD9C',
                        borderBottomRightRadius: 7,
                        borderBottomLeftRadius: 7,
                    }} activeOpacity={0.6} onPress={() => {
                        this.setModalPassVisible(true);
                    }}><Text style={{fontSize: 17, color: '#0081D9'}}>FORGOT PASSWORD ?</Text></TouchableOpacity>


                    <View style={{width: width - 40, flexDirection: 'column', justifyContent: 'center', marginTop: 15}}>
                        <View style={{
                            width: width - 40,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>

                            <View style={{
                                width: width - 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <TouchableOpacity activeOpacity={0.6}
                                                  onPress={()=>this.props.navigation.navigate('Home', {Token: 'guest'})}
                                                  style={{
                                                      width: width - 150,
                                                      backgroundColor: '#434343',
                                                      borderRadius: 5,
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                      height: 60
                                                  }}>

                                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                                        Continue As Guest
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>


                    <View style={{width: width - 60, alignItems: 'center', padding: 10}}>
                        <Text style={{color: 'rgba(0,0,0,0.7)', fontWeight: 'bold'}}>OR LOGIN BY</Text>
                    </View>
                    <View style={{
                        width: width - 80,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            height: 40,
                            width: ((width - 40) / 2) - 35,
                            justifyContent: 'center',
                            backgroundColor: "#335195",
                            flexDirection:'row',
                            borderRadius:5
                        }} onPress={this.handleFacebookLogin} activeOpacity={0.6}>
                            <View style={{
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems:'center',
                                backgroundColor:'#20428F',
                                borderRadius:5,
                                borderTopRightRadius:0,
                                borderBottomRightRadius:0,
                            }}>
                                <Icon name="logo-facebook" size={24} color={'white'}/>
                            </View>
                            <View style={{
                                height: 40,
                                justifyContent: 'center',
                                alignItems:'center',
                                width:((width - 40) / 2) - 75

                            }}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    FACEBOOK
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            alignSelf: 'center',
                            height: 40,
                            width: ((width - 40) / 2) - 35,
                            justifyContent: 'center',
                            backgroundColor: "#DD251E",
                            flexDirection:'row',
                            borderRadius:5
                        }} onPress={this._onLogin} activeOpacity={0.6}>
                            <View style={{
                                height: 40,
                                width: 40,
                                justifyContent: 'center',
                                alignItems:'center',
                                backgroundColor:'#D01205',
                                borderRadius:5,
                                borderTopRightRadius:0,
                                borderBottomRightRadius:0,
                            }}>
                                <Icon name="ios-send" size={24} color={'white'}/>
                            </View>
                            <View style={{
                                height: 40,
                                justifyContent: 'center',
                                alignItems:'center',
                                width:((width - 40) / 2) - 75

                            }}>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>
                                    LOGIN
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: width - 40, marginTop: 15}}>
                        <TouchableOpacity style={{
                            paddingBottom: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 1,
                            width: width - 40,
                            backgroundColor: 'white ',
                            borderBottomColor: '#00BD9C',
                            paddingTop: 10,
                            borderBottomRightRadius: 7,
                            borderBottomLeftRadius: 7,


                        }} activeOpacity={0.6} onPress={() => {
                            this.setModalVisible(true);
                        }}>
                            <Text style={{color: '#0069BB', fontSize: 12}}>DONT'T HAVE AN ACCOUNT ? REGISTER NOW</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </View>
        );
    }
}
