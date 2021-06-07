import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import * as authActions from '../../store/actions/auth';

import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultButton from '../../components/DefaultButton';
import Divider from "../../components/Divider";
import Colors from '../../constants/Colors';
import Urls from '../../constants/Urls';

const SignupScreen = props => {

    const [ step, setStep ] = useState(1);
    const [ nameInput, setNameInput ] = useState('');
    const [ lastNameInput, setLastNameInput ] = useState('');
    const [ mailInput, setMailInput ] = useState('');
    const [ documentInput, setDocumentInput ] = useState('');
    const [ birthdayInput, setBirthdayInput ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState('');
    
    const checkAndGoToStep2 = () => {
        setErrorMessage('');
        if ( nameInput === '' || lastNameInput === '' || mailInput === '' || !mailInput.includes('@') ) {
            setErrorMessage('Verifique los campos antes de avanzar');
        } else {
            setStep(2);
        }
    }

    const goToValidationPendingScreen = () => {
        setErrorMessage('');
        if ( documentInput === '' || birthdayInput.length < 10 ) {
            setErrorMessage('Verifique los campos antes de avanzar');
        } else {
            const transformedDate = birthdayInput.replaceAll('/', '-');
            console.log(typeof JSON.stringify({
                Mail: mailInput, 
                Nombre: nameInput, 
                Apellido: lastNameInput, 
                Documento: documentInput, 
                FechaNacimiento: transformedDate
            }))
            fetch( Urls.BASE_API_URL + '/usuario/registrar', {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    Mail: mailInput, 
                    Nombre: nameInput, 
                    Apellido: lastNameInput, 
                    Documento: documentInput, 
                    FechaNacimiento: transformedDate
                })
            }).then( res => {
                const resData = res.json();
                console.log(resData);
                props.navigation.navigate('SignupValidationPendingScreen');
            }).catch( err => console.log(err));

        }
    }

    const onBirthdayInputChange = (date) => {
            const cleanDate = date.replaceAll('/', '');
            if ( cleanDate.length <= 8 ) {
                let result = cleanDate;
                if ( cleanDate.length > 6 ) {
                    result = cleanDate.slice(0, 4) + '/' + cleanDate.slice(4, 6) + '/' + cleanDate.slice(6);
                } else if ( cleanDate.length > 4 ) {
                    result = cleanDate.slice(0, 4) + '/' + cleanDate.slice(4, 6);
                    
                } else if ( cleanDate.length === 4 ) {
                    result = cleanDate.slice(0, 4);
                }
                setBirthdayInput(result);
            }
    }

 
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.screen}>
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() } style={styles.keyboardDismiss}>
                <View>
                <DefaultText style={styles.mainTitle}>Registrate</DefaultText>
                {
                    step === 1 ? 
                    (
                        <>
                            <DefaultTextInput
                                style={styles.input}
                                placeholder="Nombre"
                                value={nameInput}
                                onChangeText={(text) => setNameInput(text)}
                            />
                            <DefaultTextInput
                                style={styles.input}
                                placeholder="Apellido"
                                value={lastNameInput}
                                onChangeText={(text) => setLastNameInput(text)}
                            />
                            <DefaultTextInput
                                style={styles.input}
                                placeholder="Mail"
                                value={mailInput}
                                onChangeText={(text) => setMailInput(text)}
                            />
                        </>
                    ) : (
                        <>
                            <DefaultTextInput
                                style={styles.input}
                                placeholder="DNI"
                                value={documentInput}
                                onChangeText={(text) => setDocumentInput(text)}
                            />
                            <DefaultTextInput
                                style={styles.input}
                                keyboardType="number-pad"
                                placeholder="Fecha de nacimiento (Ej: 1999/01/01)"
                                value={birthdayInput}
                                onChangeText={(text) => onBirthdayInputChange(text)}
                            />
                        </>
                    )
                }
                <DefaultButton
                    onPress={() => {
                        step === 1 ? checkAndGoToStep2() : goToValidationPendingScreen()
                    }}
                >
                    { step === 1 ? 'Siguiente' : 'Registrar' }
                </DefaultButton>
                <DefaultText style={styles.errorMessage}>{ errorMessage }</DefaultText>
                { 
                    step === 1 ? 
                    (
                        <>
                            <Divider style={styles.divider} />
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                >
                                    <View style={styles.recoverPasswordButton}>
                                        <View style={styles.left}>
                                            <DefaultText style={styles.recoverBtnText}>
                                                Ya tenés cuenta?
                                            </DefaultText>
                                            <DefaultText style={styles.recoverBtnTextUnderlined}>
                                                Iniciá sesión
                                            </DefaultText>
                                        </View>
                                        <Ionicons name="ios-arrow-forward" size={24} />
                                    </View>
                                </TouchableOpacity>
                        </>
                    ) : null
                }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 30
    },
    keyboardDismiss: {
        flex: 1
    },
    mainTitle: {
        fontSize: 22,
        lineHeight: 30,
        fontFamily: "poppins-700",
        marginBottom: 60,
    },
    input: {
        marginBottom: 25
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
        textAlign: 'center'
    }
})

SignupScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Registrar'
    }
}



export default SignupScreen;
