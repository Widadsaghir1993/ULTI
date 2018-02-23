import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Button
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Home from './screens/home';
import categories from './screens/categories';
import Favorite from './screens/favorite';
import Likes from './screens/likes';
import Profile from './screens/profile';
import interest from './screens/interest';
import Catalogue from './screens/catalogues';
import FindMenu from './screens/findMenu';
import GasStation from './screens/gasStation';
import Pharmacies from './screens/pharmacies';
import BusinessDetail from './screens/businessDetail';
import Video from './screens/video';
import CataloguesDetail from './screens/cataloguesDetail';
import InterestDetail from './screens/interestDetail';
import OfferDetail from './screens/offerDetail';
import MenuDetail from './screens/menuDetail';
import businessList from './screens/businessList';
import shopList from './screens/shopList';
import Login from './screens/Login';
import LandingPage from './screens/LandingPage';
import offerList from './screens/offerList';
import offers from './screens/offers';
import shopDetail from './screens/shopDetail';
import businessByCat from './screens/businessByCat';
import BusDetLanding from './screens/BusDetLanding';
import subCategories from './screens/subCategories';
import {iconsMap, iconsLoaded} from './assets/appicons';

import UNavBar from './components/UNavBar'

const Ulti = TabNavigator({
        Likes: {
            screen: Favorite,
        },
        categories: {
            screen: categories,
        },
        Home: {
            screen: Home,
        },
        Favorite: {
            screen: offers,
        },
        Profile: {
            screen: Profile,
        },
    }, {
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: true,
            showLabel: false,
            style: {
                backgroundColor: '#4faadb',
            },
            tabStyle: {}
        },
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
    },
);

const SimpleApp = StackNavigator(
    {
        LandingPage: {
            screen: LandingPage,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Home: {screen: Ulti},
        categories: {
            screen: categories,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Favorite: {
            screen: Favorite,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Catalogue: {
            screen: Catalogue,
            navigationOptions: {
                header: {
                    visible: false,
                }

            }
        },
        Main: {
            screen: interest,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        FindMenu: {
            screen: FindMenu,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        GasStation: {
            screen: GasStation,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Pharmacies: {
            screen: Pharmacies,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        BusinessDetail: {
            screen: BusinessDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        Video: {
            screen: Video,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        CataloguesDetail: {
            screen: CataloguesDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        InterestDetail: {
            screen: InterestDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        OfferDetail: {
            screen: OfferDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        MenuDetail: {
            screen: MenuDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        businessList: {
            screen: businessList,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        shopList: {
            screen: shopList,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        offerList: {
            screen: offerList,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        shopDetail: {
            screen: shopDetail,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        businessByCat: {
            screen: businessByCat,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        BusDetLanding: {
            screen: BusDetLanding,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
        subCategories: {
            screen: subCategories,
            navigationOptions: {
                header: {
                    visible: false,
                }
            }
        },
    }
);
Ulti.navigationOptions = {
    header: {
        visible: false,

    }
};


// function getCurrentScreen(navigationState) {
//     if (!navigationState) {
//         return null;
//     }
//     return navigationState.routes[navigationState.index].routeName;
// }

// Ulti.prototype.componentDidUpdate = function(prevProps, curProps) {
//     // Ulti.prototype._drawer
// };

class App extends Component {

    render() {

        return <SimpleApp onNavigationStateChange={()=>console.log("GAAEIIIDAAMEMEETTT")}/>
    }
}


AppRegistry.registerComponent('ULTI', () => App);