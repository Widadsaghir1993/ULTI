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
    Linking
} from 'react-native';
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import  GridView from  '../components/GridView'
import Spinner from 'react-native-loading-spinner-overlay';

var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar';
import u from '../util/TechWS';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,


        };
        // if you want to listen on navigator events, set this up
        this.onMenuClicked = this.onMenuClicked.bind(this);
        this.renderRow = this.renderRow.bind(this);


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



    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.catName)
        this.setState({isLoading: true});
        u.GetBusinessByCat(this.props.navigation.state.params.catName).then(response => {
            console.log(response);
            var tmp = JSON.parse(response);
            console.log('HomePage:-------------------');
            console.log(tmp);
            this.setState({
                items: tmp,
                isLoading: false

            });
        }).catch(e=>{console.log('fffff'),this.setState({isLoading:false})});

    }
    renderRow(rowData) {

        return (

            <TouchableOpacity key={"home__"+rowData.ID} activeOpacity={0.5} style={{

                padding: 10,
                width: width / 3 ,
                alignItems: 'center',
                justifyContent: 'center',
                height: width / 3 ,

            }} onPress={()=>rowData.logoimagename.indexOf('company')<0?this.props.navigation.navigate('OfferDetail', {id: rowData.ID}):this.props.navigation.navigate('BusinessDetail', {id: rowData.ID})}>
                <Image
                    style={{
                        height: width / 3-10,
                        width: width / 3-10,
                        padding:10
                    }}
                    source={{uri: rowData.logoimagename != '' ? 'http://www.ulti.online/new_admin/images/' + rowData.logoimagename : 'http://www.ulti.online/new_admin/img/NewLogo.png'}}
                    resizeMode={'cover'}
                />
                <Text>{rowData.logoimagename.indexOf('offer')>0}</Text>

            </TouchableOpacity>


        )}

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
                                }}>{this.props.navigation.state.params.catName}</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={this.onMenuClicked}>
                                <Icon name="md-menu" size={30} color="white"/>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <ScrollView style={{flex: 1}}>
                        <GridView
                            itemsPerRow={3}
                            renderFooter={null}

                            scrollEnabled={true}
                            renderSeparator={null}
                            items={this.state.items}
                            fillIncompleteRow={false}



                            renderItem={this.renderRow}
                            renderHeader={null}
                            automaticallyAdjustContentInsets={true}/>
                    </ScrollView>

                    <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

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
