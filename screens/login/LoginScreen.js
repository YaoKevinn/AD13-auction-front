import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";

import DefaultText from "../../components/DefaultText";
import DefaultButton from "../../components/DefaultButton";
import DefaultTextInput from "../../components/DefaultTextInput";
import Divider from "../../components/Divider";

const LoginScreen = (props) => {
    const [mailEntered, setMailEntered] = useState(false);
    const [mailInput, setMailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const goToRecoverPasswordScreen = () => {
        props.navigation.navigate("RecoverMailScreen");
    };

    const goToSignupScreen = () => {
        props.navigation.navigate("SignupScreen");
    };

    return (
        <View style={styles.screen}>
            <DefaultText style={styles.mainTitle}>Iniciar sesión</DefaultText>
            <DefaultTextInput
                style={styles.mailInput} 
                placeholder="Mail"
                value={mailInput}
                onChangeText={(text) => setMailInput(text)}
            />
            { 
                mailEntered ? (
                    <DefaultTextInput 
                        style={styles.mailInput}
                        placeholder="Contraseña"
                        value={passwordInput}
                        onChangeText={(text) => setPasswordInput(text)}
                    />
                ) : null
            }
            <DefaultButton
                onPress={() => setMailEntered(true)}
            >
                Iniciá sesión
            </DefaultButton>
            <Divider style={styles.divider} />
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={
                    mailEntered ? goToRecoverPasswordScreen : goToSignupScreen
                }
            >
                <View style={styles.recoverPasswordButton}>
                    <View style={styles.left}>
                        <DefaultText style={styles.recoverBtnText}>
                            {mailEntered
                                ? "Olvidaste tu contraseña?"
                                : "No tenés cuenta?"}
                        </DefaultText>
                        <DefaultText style={styles.recoverBtnTextUnderlined}>
                            {mailEntered
                                ? "Recuperar contraseña"
                                : "Registrate"}
                        </DefaultText>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={24} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    mainTitle: {
        fontSize: 22,
        lineHeight: 30,
        fontFamily: "poppins-700",
        marginBottom: 60,
    },
    mailInput: {
        marginBottom: 50
    },
    divider: {
        marginVertical: 47,
    },
    recoverPasswordButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.BLACK,
    },
    recoverBtnText: {
        fontSize: 17,
        lineHeight: 25,
        marginBottom: 5,
    },
    recoverBtnTextUnderlined: {
        fontSize: 17,
        lineHeight: 25,
        textDecorationLine: "underline",
    },
});

LoginScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Iniciar sesión",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName="ios-menu"
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default LoginScreen;
