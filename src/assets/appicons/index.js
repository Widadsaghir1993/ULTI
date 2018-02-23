// Define all your icons once,
// load them once,
// and use everywhere

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    "ios-home": [26, "#bbb"],
    "ios-home-outline": [26, "#fff"],

    "md-heart": [26, "#bbb"],
    "md-notifications": [26, "#bbb"],
    "md-menu": [26, "#2ef0d6"],
    "md-log-in": [26, "#bbb"],
    "ios-contacts": [26, "#bbb"],
    "md-heart-outline": [26, "#fff"],

    "ios-pulse": [26, "#bbb"],
    "ios-pulse-outline": [26, "#fff"],

    "ios-happy": [26, "#bbb"],
    "ios-happy-outline": [26, "#fff"],
    "ios-briefcase": [26, "#bbb"],
    "ios-briefcase-outline": [26, "#fff"],
    "ios-search": [26, "#bbb"],
    "ios-search-outline": [26, "#fff"],

    "md-school": [26, "#bbb"],
    "ios-person": [26, "#bbb"],
    "md-add-circle": [26, "#bbb"],
    "ios-school-outline": [26, "#fff"],

    "md-map": [26, "#bbb"],
    "md-map-outline": [26, "#fff"],

    "md-settings": [26, "#bbb"],

    "ios-arrow-back": [22, "#bbb"],
    "ios-arrow-back-outline": [22, "#fff"],

    // Use other Icon provider, see the logic at L39
    "film": [20, "#bbb", FontAwesome],
    "film--active": [20, "#fff", FontAwesome],

    "television": [22, "#bbb", FontAwesome],
    "television--active": [22, "#fff", FontAwesome],
}

const defaultIconProvider = Ionicons;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1]
            )
        })
    ).then(sources => {
        Object.keys(icons)
            .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

        // Call resolve (and we are done)
        resolve(true);
    })
});

export {
    iconsMap,
    iconsLoaded
};
