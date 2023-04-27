'use strict'

const userLogout = new LogoutButton();
userLogout.action = () => {
    const logoutCallback = (response)=> {
        if(response.success === true) {
            location.reload();
        } 
    }
    ApiConnector.logout(logoutCallback);
}

ApiConnector.current((response) => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const exchangeRates = new RatesBoard();
const requestRatesBoard = () => {
    ApiConnector.getStocks((response) => {
        if (response.success === true) {
            exchangeRates.clearTable();
            exchangeRates.fillTable(response.data);
        }
    });
}

requestRatesBoard();

setInterval(() => {
    requestRatesBoard();
}, 60000);

const userMoney = new MoneyManager();
userMoney.addMoneyCallback = (data) => {
    const moneyCallback = (response)=> {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            userMoney.setMessage(response.success, "Ваш баланс успешно пополнен!");
        } else {
            userMoney.setMessage(response.success, "Не удалось выполнить пополнение баланса. Пожалуйста введите корректную сумму пополнения баланса и выберите валюту!");
        }
    }
    ApiConnector.addMoney(data, moneyCallback);
}

userMoney.conversionMoneyCallback = (data) => {
    const conversionCallback = (response)=> {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            userMoney.setMessage(response.success, "Конвертация успешно выполнена!");
        } else {
            userMoney.setMessage(response.success, "Не удалось выполнить конвертацию валюты. Пожалуйста введите корректную сумму конвертируемой валюты и выберите соответствующие валюты!");
        }
    }
    ApiConnector.convertMoney(data, conversionCallback);
}

userMoney.sendMoneyCallback = (data) => {
    const sendCallback = (response)=> {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            userMoney.setMessage(response.success, "Перевод успешно выполнен!");
        } else {
            userMoney.setMessage(response.success, "Не удалось выполнить перевод. Пожалуйста введите корректную сумму перевода и выберите соответствующую валюту!");
        }
    }
    ApiConnector.transferMoney(data, sendCallback);
}

const userFavorites = new FavoritesWidget();
const updateFavorites = () => {
    ApiConnector.getFavorites((response) => {
        if (response.success === true) {
            userFavorites.clearTable();
            userFavorites.fillTable(response.data);
            userMoney.updateUsersList(response.data);
        }
    });
}

updateFavorites();

userFavorites.addUserCallback = (data) => {
    const addUserCallback = (response) => {
        if (response.success === true) {
            userFavorites.clearTable();
            userFavorites.fillTable(response.data);
            userFavorites.setMessage(response.success, "Пользователь успешно добавлен в адресную книгу!");
            userMoney.updateUsersList(response.data);
        } else {
            userFavorites.setMessage(response.success, "Не удалось добавить пользователя в адресную книгу. Для добавления пользователя в адресную книгу введите номер ID и имя пользователя.");
        }
    }
    ApiConnector.addUserToFavorites(data, addUserCallback);
}

userFavorites.removeUserCallback = (data) => {
    const removeCallback = (response) => {
        if (response.success === true) {
            userFavorites.clearTable();
            userFavorites.fillTable(response.data);
            userFavorites.setMessage(response.success, "Пользователь удален из адресной книги.");
            userMoney.updateUsersList(response.data);
        } else {
            userFavorites.setMessage(response.success, "Не удалось удалить пользователя из адресной книги.")
        }
    }
    ApiConnector.removeUserFromFavorites(data, removeCallback);
}
