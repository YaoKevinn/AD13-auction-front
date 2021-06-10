import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import Colors from '../../constants/Colors';
import DefaultText from "../../components/DefaultText";
import DefaultButton from "../../components/DefaultButton";
import DefaultTextInput from "../../components/DefaultTextInput";
import DefaultModal from "../../components/DefaultModal";
import RecoverMailSentModal from "../../components/RecoverMailSentModal";
import Divider from "../../components/Divider";
import Urls from '../../constants/Urls';


const GenerateNewPasswordScreen = props => {

    const userMail = props.navigation.getParam('userMail');

    const [ mailInput, setMailInput ] = useState(userMail);
    const [ verificationCodeInput, setVerificationCodeInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");
    const [ repeatedPasswordInput, setRepeatedPasswordInput ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ recoverMailSentModalOpen, setRecoverMailSentModalOpen ] = useState(false);
    const [ generateSuccessfulModalOpen, setGenerateSuccessfulModalOpen ] = useState(false);
    const [ errorModalOpen, setErrorModalOpen ] = useState(false);

    const generatePersonalPassword = () => {
        setErrorMessage('');
        if ( mailInput !== '' && verificationCodeInput !== '' && passwordInput !== '' && repeatedPasswordInput !== '' ) {
            if ( passwordInput === repeatedPasswordInput ) {
                fetch(Urls.BASE_API_URL+'/usuario/generarClavePersonal', {
                    method: 'POST',
                    header:  { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Mail: mailInput,
                        CodigoVerificacion: verificationCodeInput,
                        Contraseña: passwordInput
                    })
                })
                .then( res => res.json() )
                .then( data => {
                    console.log(data);
                    if ( data.statusCode === 200 ) {
                        setGenerateSuccessfulModalOpen(true);
                    } else if ( data.statusCode === 405 ) {
                        setErrorMessage('Código de verificación incorrecto')
                    } else {
                        setErrorModalOpen(true);
                    }
                })
                .catch( err => console.log(err) )
            } else {
                setErrorMessage('Las contraseñas no coinciden')
            }
        } else {
            setErrorMessage('Verificá los campos ingresados antes de continuar')
        }

    }
 
    return (
        <KeyboardAvoidingView behavior="position">
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
            <ScrollView>
            <View style={styles.screen}>
                <DefaultText style={styles.mainTitle}>Generar clave</DefaultText>
                <DefaultTextInput
                    style={styles.mailInput} 
                    placeholder="Mail"
                    disabled="true"
                    value={mailInput}
                    onChangeText={(text) => setMailInput(text)}
                />
                <DefaultTextInput
                    style={styles.mailInput} 
                    placeholder="Código de verificación"
                    value={verificationCodeInput}
                    onChangeText={(text) => setVerificationCodeInput(text)}
                />
                <DefaultTextInput
                    style={styles.mailInput} 
                    placeholder="Nueva contraseña"
                    value={passwordInput}
                    onChangeText={(text) => setPasswordInput(text)}
                    secureTextEntry={true}
                />
                <DefaultTextInput
                    style={styles.mailInput} 
                    placeholder="Repetir nueva contraseña"
                    value={repeatedPasswordInput}
                    onChangeText={(text) => setRepeatedPasswordInput(text)}
                    secureTextEntry={true}
                />
                <DefaultButton
                    onPress={() => {
                        generatePersonalPassword();
                    }}
                >
                    Generar contraseña
                </DefaultButton>
                <DefaultText style={styles.errorMessage}>{ errorMessage }</DefaultText>

                <DefaultModal 
                    modalVisible={generateSuccessfulModalOpen}
                    title={'!Clave personal generada con éxito!'}
                    options={['Iniciar sesión']}
                    actions={[() => props.navigation.popToTop()]}
                />

                <DefaultModal 
                    modalVisible={errorModalOpen}
                    title={'!Error en generar clave personal!'}
                    options={['Confirmar']}
                    actions={[() => {
                        setErrorModalOpen(false);
                        setErrorMessage('Error en generar clave personal, intentá mas tarde nuevamente')
                    }]}
                />

                {/* Recover Password mail sent modal */}
                <RecoverMailSentModal 
                    modalVisible={recoverMailSentModalOpen}
                    onPress={() => {
                        setRecoverMailSentModalOpen(false);
                        props.navigation.goBack();
                    }}
                />
            </View>
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 30,
    },
    mainTitle: {
        fontSize: 22,
        lineHeight: 30,
        fontFamily: "poppins-600",
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
    errorMessage: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center'
    }
})

GenerateNewPasswordScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Generar clave'
    }
}



export default GenerateNewPasswordScreen;
