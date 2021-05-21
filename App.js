import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { enableScreens } from "react-native-screens";
import * as Font from 'expo-font';

import DefaultText from './components/DefaultText';
import MainNavigator from './navigation/MainNavigator';
import { Colors } from 'react-native/Libraries/NewAppScreen';


enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "poppins-light-italic": require("./assets/fonts/Poppins-LightItalic.ttf"),
        "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
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
      <View style={styles.mainView}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor="#000" barStyle="light-content"/>
            </SafeAreaView>
            <MainNavigator />
      </View>
  );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: Colors.black
    }
});
