import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';

import DefaultText from './components/DefaultText';
import MainNavigator from './navigation/MainNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import auctionsReducer from './store/reducers/auctions';

import Colors from './constants/Colors';


enableScreens();

const rootReducer = combineReducers({
    auctions: auctionsReducer
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
    return Font.loadAsync({
        "poppins-700": require("./assets/fonts/Poppins-Bold.ttf"),
        "poppins-light-italic": require("./assets/fonts/Poppins-LightItalic.ttf"),
        "poppins-400": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-100": require("./assets/fonts/Poppins-Thin.ttf"),
        "poppins-200": require("./assets/fonts/Poppins-ExtraLight.ttf"),
        "poppins-300": require("./assets/fonts/Poppins-Light.ttf"),
        "poppins-500": require("./assets/fonts/Poppins-Medium.ttf"),
        "poppins-600": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "poppins-800": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    });
};

export default function App() {

    const [fontLoaded, setFontLoaded] = useState(false);
    
    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

  return (
      <Provider store={store}>
            <View style={styles.mainView}>
                    <StatusBar backgroundColor="#3E568E" barStyle="light-content"/>
                    <MainNavigator />
            </View>
       </Provider>
  );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.PRIMARY_BLUE
    }
});
