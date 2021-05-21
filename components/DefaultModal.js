import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import Colors from "../constants/Colors";


const DefaultModal = (props) => {

  const [ modalVisible, setModalVisible ] = useState(props.modalVisible)
   
  const hideModal = () => {
    setModalVisible(false);
  }

  return (
    <ImageBackground 
        style={ modalVisible ? styles.modalAppearView : {}}
    >
       <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          hideModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.title}</Text>
            <View style={styles.buttonSection}>
            {
                props.options.map( (option, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                hideModal();
                                props.actions[i]();
                            }}
                            activeOpacity={0.6}
                            
                        >
                            <Text style={styles.textStyle}>{option}</Text>
                        </TouchableOpacity>
                    )
                })

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
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  modalView: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 33,
    alignItems: "center",
    shadowColor: Colors.black,
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
    backgroundColor: Colors.black,
    padding: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '45%'
  },
  textStyle: {
    color: "white",
    fontFamily: 'poppins-regular',
    fontSize: 17
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 17,
    fontFamily: 'poppins-regular'
  }
});

export default DefaultModal;