import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import Colors from "../constants/Colors";


const DefaultModal = (props) => {

  return (
    <ImageBackground 
        style={ props.modalVisible ? styles.modalAppearView : {}}
    >
       <Modal
        animationType="fade"
        visible={props.modalVisible}
        transparent={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.title}</Text>
            <View style={styles.buttonSection}>
                {
                    props.options[0] ? (
                        <TouchableOpacity
                            style={props.options.length === 2 ? styles.buttonClose : styles.button }
                            onPress={() => props.actions[0]()}
                            activeOpacity={0.6}
                            
                        >
                            <Text style={styles.textStyle}>{props.options[0]}</Text>
                        </TouchableOpacity>
                    ) : null
                }
                {
                    props.options[1] ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => props.actions[1]()}
                            activeOpacity={0.6}
                            
                        >
                            <Text style={styles.textStyle}>{props.options[1]}</Text>
                        </TouchableOpacity>
                    ) : null
                }
            </View>
          </View>
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
    opacity: 0.2,
    zIndex: 5
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalView: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 33,
    alignItems: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    width: '90%'
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },    
  button: {
    backgroundColor: Colors.SECONDARY_BLUE,
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '45%'
  },
  buttonClose: {
      backgroundColor: Colors.PRIMARY_RED,
      padding: 9,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '45%'
  },
  textStyle: {
    color: "white",
    fontFamily: 'poppins-400',
    fontSize: 17
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 17,
    fontFamily: 'poppins-400'
  }
});

export default DefaultModal;