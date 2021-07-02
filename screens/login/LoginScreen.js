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
import { AntDesign } from '@expo/vector-icons'; 
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import HeaderButton from "../../components/HeaderButton";
import Colors from "../../constants/Colors";
import Urls from "../../constants/Urls";

import DefaultText from "../../components/DefaultText";
import DefaultButton from "../../components/DefaultButton";
import DefaultModal from "../../components/DefaultModal";
import DefaultTextInput from "../../components/DefaultTextInput";
import Divider from "../../components/Divider";


const LoginScreen = (props) => {

    const dispatch = useDispatch();
    
    const [statusIcon, setStatusIcon] = useState(undefined);
    const [mailEntered, setMailEntered] = useState(false);
    const [mailInput, setMailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorModalMessage, setErrorModalMessage] = useState('');

    const goToRecoverPasswordScreen = () => {
        props.navigation.navigate("RecoverMailScreen", {
            setMailEntered: setMailEntered
        });
    };

    const goToSignupScreen = () => {
        props.navigation.navigate("SignupScreen");
    };

    const login = () => {
        dispatch(authActions.login(mailInput, passwordInput, props.navigation, openErrorModal));
        setMailInput('');
        setPasswordInput('');
        setStatusIcon(undefined);
    }

    const openErrorModal = (message) => {
        setErrorModalOpen(true);
        setErrorModalMessage(message);
    }

    const checkUserMailStatus = () => {
        if ( mailInput !== '' ) {
            fetch( Urls.BASE_API_URL + `/verificarEstadoUsuario/${mailInput}`, {
                method: 'GET',
                header: { 'Content-Type': 'application/json' },
            })
            .then( res => res.json())
            .then( data => {
                // Object {
                //     "admitido": "no",
                //     "recuperarcontrasenia": false,
                // }
                
                console.log('ÉXITO: API /verificarEstadoUsuario/{mail} Chechear estado del mail');
                if ( data.admitido === "no" ) {
                    console.log('Cuenta NO validada.')
                    setStatusIcon('exclamationcircle');
                    props.navigation.navigate('SignupValidationPendingScreen');
                } else if ( data.admitido === "si" && data.recuperarcontrasenia ) {
                    console.log('Cuenta validada para recuperar contrasenña');
                    setStatusIcon('checkcircle');
                    props.navigation.navigate('GenerateNewPasswordScreen', {
                        userMail: mailInput
                    });
                } else if ( data.admitido === "si" && !data.recuperarcontrasenia ) {
                    setStatusIcon('checkcircle');
                    setMailEntered(true);
                }
            }).catch( err => console.log( 'FALLO: API /verificarEstadoUsuario/{mail} Chechear estado del mail =>',  err));   
        }
    }


    return (
        <View style={styles.screen}>
            <DefaultText style={styles.mainTitle}>Iniciar sesión</DefaultText>
            <View style={styles.inputContainer}>
                <DefaultTextInput
                    style={styles.mailInput} 
                    placeholder="Mail"
                    value={mailInput}
                    onChangeText={(text) => setMailInput(text)}
                />
                {
                    statusIcon ? (
                        <AntDesign style={styles.statusIcon} name={statusIcon} size={24} color={statusIcon === 'checkcircle' ? '#07D39B' : '#DCC85D'} />
                    ) : null
                }
            </View> 
            { 
                mailEntered ? (
                    <DefaultTextInput 
                        style={styles.mailInput}
                        placeholder="Contraseña"
                        value={passwordInput}
                        onChangeText={(text) => setPasswordInput(text)}
                        secureTextEntry={true}
                    />
                ) : null
            }
            <DefaultButton
                onPress={() => {
                    mailEntered ? login() : checkUserMailStatus()
                }}
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

            {/* RESULT MODAL */}
            <DefaultModal 
                modalVisible={errorModalOpen}
                title={errorModalMessage}
                options={['Confirmar']}
                actions={[() => setErrorModalOpen(false)]}
            />
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
    inputContainer: {
        position: 'relative'
    }, 
    statusIcon: {
        position: 'absolute',
        right: 10,
        top: 13
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
