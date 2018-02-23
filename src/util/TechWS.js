import DeviceInfo from 'react-native-device-info';


const baseUrl = 'http://www.ulti.online/admin/app/';

exports.GetCategory = () => {
    let url = baseUrl + 'category.php';
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.GetSubCategory = (id) => {
    let url = baseUrl + 'subCategories.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.GetCompanies = () => {
    let url = baseUrl + 'businesslist.php';
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetCoordinates = (address) => {
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false';
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetHomePage = () => {
    let url = baseUrl + 'homePage.php';
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetShops = (id) => {
    let url = baseUrl + 'shopList.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetOffers = (id) => {
    let url = baseUrl + 'offerlist.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.Login = (value) => {
    console.log(value);
    let url = baseUrl + 'login.php?email='+value.email+'&pass='+value.pass;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.AddUser = (value) => {
    console.log(value);
    let url = baseUrl + 'insertuser.php?Name='+value.value.Name+'&Surname='+value.value.Surname+'&Gender='+value.value.Gender+'&Email='+value.value.Email+'&Pass='+value.value.Pass+'&DeviceID=';
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.ForgetPass = (value) => {
    console.log(value);
    let url = baseUrl + 'ForgetPass.php?Email='+value.value.Email;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetCompanyDet = (id) => {
    let url = baseUrl + 'businessdetial.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetPhotos = (id) => {
    let url = baseUrl + 'photosList.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.GetVideo = (id) => {
    let url = baseUrl + 'videoList.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetOfferDet = (id) => {
    let url = baseUrl + 'offerdetail.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetCatalog = (id) => {
    let url = baseUrl + 'catalogList.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetCatalogDet = (id) => {
    let url = baseUrl + 'catalogDet.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetShopDet = (id) => {
    let url = baseUrl + 'shopdetail.php?id='+id;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.AddWatchList = (type,userId,watchId) => {
    let url = baseUrl + 'addWatchList.php?type='+type+'&userId='+userId+'&watchId='+watchId;
    console.log(url);
    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.GetWatchList = (userId) => {
    let url = baseUrl + 'getWatchList.php?userId='+userId;
    console.log(url);
    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};

exports.CheckWatchList = (userId,watchId) => {
    let url = baseUrl + 'checkWatchList.php?userId='+userId+'&watchId='+watchId;
    console.log(url);
    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetBusinessByCat = (catName) => {
    let url = baseUrl + 'businessByCat.php?catName='+catName;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetGasStation = (city) => {
    let url = baseUrl + 'gas.php?city='+city;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};
exports.GetCompaniesByFilter = (filter) => {
    let url = baseUrl + 'businesslist.php?filter='+filter;
    console.log(url);

    return fetch(url).then((response) => response.text())
        .catch(error => {
            return {success: false, result: error}
        });
};