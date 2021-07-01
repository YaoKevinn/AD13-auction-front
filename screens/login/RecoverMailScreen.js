import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Urls from "../../constants/Urls";

import Colors from '../../constants/Colors';
import DefaultText from "../../components/DefaultText";
import DefaultButton from "../../components/DefaultButton";
import DefaultTextInput from "../../components/DefaultTextInput";
import RecoverMailSentModal from "../../components/RecoverMailSentModal";
import Divider from "../../components/Divider";


const RecoverMailScreen = props => {

    const [ mailInput, setMailInput ] = useState("");
    const [ recoverMailSentModalOpen, setRecoverMailSentModalOpen ] = useState(false);

    const sendRecoverPassword = () => {
        fetch( Urls.BASE_API_URL + `/usuario/recuperarContraseña`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Mail: mailInput
            })
        })
        .then( res => res.json())
        .then( data => {
            console.log('ÉXITO: API /usuario/recuperarContraseña');
            console.log(data);
        }).catch( err => console.log( 'FALLO: API /usuario/recuperarContraseña =>',  err));   
    }
 
    return (
        <View style={styles.screen}>
             <DefaultText style={styles.mainTitle}>Olvidé mi contraseña</DefaultText>
             <DefaultTextInput
                style={styles.mailInput} 
                placeholder="Mail"
                value={mailInput}
                onChangeText={(text) => setMailInput(text)}
            />
            <DefaultButton
                onPress={() => {
                    setRecoverMailSentModalOpen(true);
                    sendRecoverPassword();
                }}
            >
                Recuperar contraseña
            </DefaultButton>
            <Divider style={styles.divider} />
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    props.navigation.goBack();
                }}
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

            {/* Recover Password mail sent modal */}
            <RecoverMailSentModal 
                modalVisible={recoverMailSentModalOpen}
                onPress={() => {
                    setRecoverMailSentModalOpen(false);
                    props.navigation.goBack();
                    props.navigation.getParam('setMailEntered')(false);
                }}
            />
        </View>
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
})

RecoverMailScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Recuperar Contraseña'
    }
}



export default RecoverMailScreen;
