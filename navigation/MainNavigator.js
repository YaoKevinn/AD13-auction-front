import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItem } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import AuctionItemScreen from "../screens/home/AuctionItemScreen";
import AuctionScreen from "../screens/home/AuctionScreen";
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from "../screens/login/LoginScreen";
import PayMethodScreen from "../screens/payMethod/PayMethodScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import PublishProductScreen from "../screens/publishProduct/PublishProductScreen";
import SignupScreen from "../screens/login/SignupScreen";
import UserHistoryScreen from "../screens/userHistory/UserHistoryScreen";
import RecoverMailScreen from "../screens/login/RecoverMailScreen";
import SignupValidationPendingScreen from "../screens/login/SignupValidationPendingScreen";
import RecoverPasswordEmailSentScreen from "../screens/login/RecoverPasswordEmailSentScreen";
import OfferSuccessScreen from '../screens/home/OfferSuccessScreen';
import NewPaymentScreen from '../screens/payMethod/NewPaymentScreen';
import CreditCardScreen from '../screens/payMethod/CreditCardScreen';
import BankAccountScreen from '../screens/payMethod/BankAccountScreen';
import GenerateNewPasswordScreen from '../screens/login/GenerateNewPasswordScreen';
import UploadProductScreen from '../screens/publishProduct/UploadProductScreen';
import ImageBrowserScreen from '../screens/publishProduct/ImageBrowserScreen';
import DetailProductScreen from '../screens/publishProduct/DetailProductScreen';

import Colors from "../constants/Colors";
import DrawerContent from "../components/DrawerContent";

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Colors.PRIMARY_BLUE,
    },
    headerTitleStyle: {
        fontFamily: "poppins-400",
    },
    headerBackTitleStlye: {
        fontFamily: "poppins-400",
    },
    headerTintColor: Colors.WHITE,
};

const HomeStackNavigator = createStackNavigator(
    {
        AuctionItemScreen: { screen: AuctionItemScreen },
        AuctionScreen: { screen: AuctionScreen },
        HomeScreen: { screen: HomeScreen },
        OfferSuccessScreen: { screen: OfferSuccessScreen },
        PayMethodScreen: { screen: PayMethodScreen },
        LoginScreen: { screen: LoginScreen },
        SignupScreen: { screen: SignupScreen },
        RecoverMailScreen: { screen: RecoverMailScreen },
        SignupValidationPendingScreen: { screen: SignupValidationPendingScreen },
        RecoverPasswordEmailSentScreen: { screen: RecoverPasswordEmailSentScreen },
        GenerateNewPasswordScreen: { screen: GenerateNewPasswordScreen },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "HomeScreen",
    }
);

const ProfileStackNavigator = createStackNavigator(
    {
        ProfileScreen: { screen: ProfileScreen },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "ProfileScreen",
    }
);

const PayMethodStackNavigator = createStackNavigator(
    {
        PayMethodScreen: { screen: PayMethodScreen },
        NewPaymentScreen: { screen: NewPaymentScreen },
        CreditCardScreen: { screen: CreditCardScreen },
        BankAccountScreen: { screen: BankAccountScreen },
        HomeStackNavigator: { screen: HomeStackNavigator },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "PayMethodScreen",
    }
);

const UserHistoryStackNavigator = createStackNavigator(
    {
        UserHistoryScreen: { screen: UserHistoryScreen },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "UserHistoryScreen",
    }
);

const LoginStackNavigator = createStackNavigator(
    {
        LoginScreen: { screen: LoginScreen },
        SignupScreen: { screen: SignupScreen },
        RecoverMailScreen: { screen: RecoverMailScreen },
        SignupValidationPendingScreen: { screen: SignupValidationPendingScreen },
        RecoverPasswordEmailSentScreen: { screen: RecoverPasswordEmailSentScreen },
        GenerateNewPasswordScreen: { screen: GenerateNewPasswordScreen },
        AuctionItemScreen: { screen: AuctionItemScreen },
        AuctionScreen: { screen: AuctionScreen },
        HomeScreen: { screen: HomeScreen },
        OfferSuccessScreen: { screen: OfferSuccessScreen },
        PayMethodScreen: { screen: PayMethodScreen },
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "LoginScreen",
    }
);

const PublishProductStackNavigator = createStackNavigator(
    {
        PublishProductScreen: { screen: PublishProductScreen },
        UploadProductScreen: { screen: UploadProductScreen },
        ImageBrowserScreen: { screen: ImageBrowserScreen },
        DetailProductScreen: { screen:　DetailProductScreen }
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
        initialRouteName: "PublishProductScreen",
    }
);


const MainDrawerNavigator = createDrawerNavigator({
    Home: { screen: HomeStackNavigator },
    Profile: { screen: ProfileStackNavigator },
    PayMethod: { screen: PayMethodStackNavigator },
    UserHistory: { screen: UserHistoryStackNavigator },
    PublishProduct: { screen: PublishProductStackNavigator },
    Login: { screen: LoginStackNavigator },

}, {
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: (props) => <DrawerContent { ...props } />
})

export default createAppContainer(MainDrawerNavigator);
