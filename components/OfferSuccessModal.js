import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View, ImageBackground, Image} from "react-native";

import Colors from "../constants/Colors";
import DefaultText from './DefaultText';
import DefaultButton from './DefaultButton';

const OfferSuccessModal = (props) => {

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
                source={require('../assets/winner.png')}
            />
            <DefaultText style={styles.title}>¡Felicitaciones! 💪</DefaultText>
            <DefaultText>Ganaste la puja sobre este artículo. Al finalizar la subasta, nos contactaremos con vos para últimar los detalles</DefaultText>
            <DefaultButton
                style={styles.button}
                onPress={props.onPress}
            >
                Volver al artículo
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
  image: {
      width: 350,
      height: 200
  },
  button: {
      width: '100%',
      borderRadius: 5
  }
});

export default OfferSuccessModal;