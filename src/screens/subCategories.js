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
    ListView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// import {iconsMap, iconsLoaded} from '../assets/appicons';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import UNavBar from '../components/UNavBar'
import Menu from '../components/Menu';
import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';
import u from '../util/TechWS';
import  GridView from  '../components/GridView'
export default class subCategories extends Component {
    constructor(props) {
        super(props);
        // if you want to listen on navigator events, set this up
        this.state = {

            items:[],
            isLoading: false,


        };
        this.renderRow = this.renderRow.bind(this);

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
                source={require('../assets/img/Business-List_07-02.png')}
                resizeMode={'contain'}
            />

            ,
        },
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.id)
        this.setState({isLoading: true});
        u.GetSubCategory(this.props.navigation.state.params.id).then(response => {
            var tmp = JSON.parse(response);
            console.log(tmp);
            if(tmp.length>0){
                this.setState({
                    items:tmp,
                    isLoading: false

                });
            }else {
                this.props.navigation.navigate('businessByCat', {catName: this.props.navigation.state.params.catName});
            }

        });

    }

    onSearchClicked() {
        alert("Search");
    }

    onMenuClicked() {
        this._drawer.open();
    }
    renderRow(rowData) {

        return (

            <TouchableOpacity key={"CAT__"+rowData.ID} onPress={()=>this.props.navigation.navigate('businessByCat', {catName: rowData.name})} activeOpacity={0.5} style={{
                backgroundColor: 'rgb('+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+','+Math.floor((Math.random() * 255) + 1)+')', borderColor: '#3084cf',
                borderWidth: 2,
                borderRadius: 110,
                padding: 10,
                margin:20,
                marginBottom:0,
                marginRight:0,
                marginLeft:22.5,
                width: width / 3 - 30,
                alignItems: 'center',
                justifyContent: 'center',
                height: width / 3 - 30

            }}>
                <Text style={[styles.categoryTxt,{textAlign:'center'}]}>{rowData.Name}</Text>
            </TouchableOpacity>


        )}



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
                    <UNavBar title="CATEGORIES" onSearch={this.onSearchClicked} onMenu={this.onMenuClicked}/>
                    {/*<View style={{*/}
                    {/*backgroundColor: 'white',*/}
                    {/*height: 60,*/}
                    {/*left: 0,*/}
                    {/*right: 0,*/}
                    {/*flexDirection: 'row',*/}
                    {/*position: 'absolute',*/}
                    {/*top: 70,*/}
                    {/*justifyContent: 'space-around',*/}
                    {/*}}>*/}
                    {/*<View style={{*/}
                    {/*backgroundColor: '#cacbcc',*/}
                    {/*height: 40,*/}
                    {/*alignSelf: 'center',*/}
                    {/*justifyContent: 'center',*/}
                    {/*borderColor: '#4faadb',*/}
                    {/*borderWidth: 1,*/}
                    {/*borderRadius: 5,*/}
                    {/*padding: 10,*/}
                    {/*width: width / 3 - 10*/}
                    {/*}}>*/}
                    {/*<ModalPicker*/}
                    {/*data={time}*/}
                    {/*initValue="Latest added first"*/}
                    {/*onChange={(option)=> {*/}
                    {/*{*/}
                    {/*alert(option.label)*/}
                    {/*}*/}
                    {/*}}>*/}
                    {/*<View style={{flexDirection: "row", alignItems: "center"}}>*/}
                    {/*<Text style={{*/}
                    {/*color: "#222",*/}
                    {/*fontFamily: 'RobotoCondensed-Regular',*/}
                    {/*paddingRight: 5,*/}
                    {/*fontSize: 10*/}
                    {/*}}>Categories</Text>*/}
                    {/*<Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>*/}
                    {/*</View>*/}
                    {/*</ModalPicker>*/}
                    {/*</View>*/}

                    {/*<View style={{*/}
                    {/*backgroundColor: '#cacbcc',*/}
                    {/*height: 40,*/}
                    {/*alignSelf: 'center',*/}
                    {/*justifyContent: 'center',*/}
                    {/*borderColor: '#4faadb',*/}
                    {/*borderWidth: 1,*/}
                    {/*borderRadius: 5,*/}
                    {/*padding: 10,*/}
                    {/*width: width / 3 - 10*/}
                    {/*}}>*/}
                    {/*<ModalPicker*/}
                    {/*data={rate}*/}
                    {/*initValue="Latest added first"*/}
                    {/*onChange={(option)=> {*/}
                    {/*{*/}
                    {/*alert(option.label)*/}
                    {/*}*/}
                    {/*}}>*/}
                    {/*<View style={{*/}
                    {/*flexDirection: "row",*/}
                    {/*alignItems: "center",*/}
                    {/*justifyContent: 'space-between'*/}
                    {/*}}>*/}
                    {/*<Text style={{*/}
                    {/*color: "#222",*/}
                    {/*fontFamily: 'RobotoCondensed-Regular',*/}
                    {/*paddingRight: 5,*/}
                    {/*fontSize: 10*/}
                    {/*}}>City</Text>*/}
                    {/*<Icon name="md-arrow-dropdown" size={20} color="#4faadb"/>*/}


                    {/*</View>*/}
                    {/*</ModalPicker>*/}
                    {/*</View>*/}

                    {/*<TouchableOpacity style={{*/}
                    {/*backgroundColor: '#3084cf',*/}
                    {/*height: 40,*/}
                    {/*alignSelf: 'center',*/}
                    {/*justifyContent: 'center',*/}
                    {/*borderColor: '#4faadb',*/}
                    {/*borderWidth: 1,*/}
                    {/*borderRadius: 5,*/}
                    {/*padding: 10,*/}
                    {/*width: width / 3 - 10*/}
                    {/*}} activeOpacity={0.6}>*/}

                    {/*<View style={{flexDirection: "row", alignItems: "center", justifyContent: 'center'}}>*/}
                    {/*<Text style={{*/}
                    {/*color: "white",*/}
                    {/*fontFamily: 'RobotoCondensed-Regular',*/}
                    {/*paddingRight: 5,*/}
                    {/*fontSize: 12,*/}
                    {/*alignItems: 'center',*/}
                    {/*}}>Search</Text>*/}


                    {/*</View>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                    <View style={{
                        height: 80,
                        marginTop: 0
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
                    <View style={{backgroundColor: 'white', width: width, flex: 1, flexDirection: 'column'}}>


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


                    </View>
                </View>
                <Spinner visible={this.state.isLoading} textContent={"Loading"} textStyle={{color: '#FFF'}}/>

            </Drawer>)
    }
};
const styles = StyleSheet.create({
    categoryTxt: {
        color: "white", fontFamily: 'RobotoCondensed-Bold',
        fontSize: 12
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
