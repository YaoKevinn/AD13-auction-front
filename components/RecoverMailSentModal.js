import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View, ImageBackground, Image} from "react-native";

import Colors from "../constants/Colors";
import DefaultText from './DefaultText';
import DefaultButton from './DefaultButton';

const RecoverMailSentModal = (props) => {

  return (
    <ImageBackground 
        style={ props.modalVisible ? styles.modalAppearView : {}}
    >
       <Modal
        animationType="fade"
        visible={props.modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
            <Image
                style={styles.image}
                source={require('../assets/mail-sent.png')}
            />
            <DefaultText style={styles.title}>Solicitud de recuperar contraseña solicitada</DefaultText>
            <DefaultText style={styles.text}>En unos instantes te llegará un mail para recuperar tu contraseña</DefaultText>
            <DefaultButton
                style={styles.button}
                onPress={props.onPress}
            >
                Finalizar
            </DefaultButton>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalAppearView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  centeredView: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: '55%'
  },
  title: {
      fontFamily: 'poppins-600',
      fontSize: 25,
      lineHeight: 37.5
  },
  text: {
    textAlign: 'center'
  },
  image: {
      width: 350,
      height: 200
  },
  button: {
      width: '100%',
      borderRadius: 5
  }
});

export default RecoverMailSentModal;