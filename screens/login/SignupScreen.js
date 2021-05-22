import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultButton from '../../components/DefaultButton';
import Divider from "../../components/Divider";
import Colors from '../../constants/Colors';

const SignupScreen = props => {

    const [ nameInput, setNameInput ] = useState('');
    const [ step, setStep ] = useState(1);

    const goToValidationPendingScreen = () => {
        props.navigation.navigate('SignupValidationPendingScreen');
    }
 
    return (
        <View style={styles.screen}>
            <DefaultText style={styles.mainTitle}>Registrate</DefaultText>
            <DefaultTextInput
                style={styles.input}
                placeholder="Nombre"
                value={nameInput}
                onChangeText={(text) => setNameInput(text)}
            />
            <DefaultTextInput
                style={styles.input}
                placeholder="Apellido"
                value={nameInput}
                onChangeText={(text) => setNameInput(text)}
            />
            <DefaultTextInput
                style={styles.input}
                placeholder="Mail"
                value={nameInput}
                onChangeText={(text) => setNameInput(text)}
            />
            { 
                step === 2 ? 
                (
                    <>
                        <DefaultTextInput
                            style={styles.input}
                            placeholder="DNI"
                            value={nameInput}
                            onChangeText={(text) => setNameInput(text)}
                        />
                        <DefaultTextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={nameInput}
                            onChangeText={(text) => setNameInput(text)}
                        />
                    </>
                ) : null
            }
            <DefaultButton
                onPress={() => {
                    step === 1 ? setStep(2) : goToValidationPendingScreen()
                }}
            >
                { step === 1 ? 'Siguiente' : 'Registrar' }
            </DefaultButton>
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
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 70,
        paddingHorizontal: 30
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
})

SignupScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Registrar'
    }
}



export default SignupScreen;
