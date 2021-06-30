import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';


const UploadProductScreen = props => {

    const esArte = props.navigation.getParam('esarte');
    const descripcionCorta = props.navigation.getParam('descripcioncatalogo');
    const dataArte = props.navigation.getParam('dataarte');
    const descripcionCatalogo = props.navigation.getParam('descripcioncompleta');
    const precioBase = props.navigation.getParam('preciobase');
 
    return (
        <View style={styles.screen}>
             <View style={styles.inputSection}>
                <View style={styles.row}>
                     <DefaultText style={styles.mainTitle}>Es articulo de arte?</DefaultText>
                     <DefaultButton style={styles.editButton} onPress={() => ''}>No</DefaultButton>
                     <DefaultButton style={styles.editButton} onPress={() => ''}>Si</DefaultButton>
                     <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Descripcion Catalogo" 
                            value={accountNumberInput}
                            onChangeText={(text) => setDescripcionCatalogo(text)}
                            onFocus={() => {
                            }}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Descripcion Completa" 
                            value={accountNumberInput}
                            onChangeText={(text) => setDescripcionCompleta(text)}
                            onFocus={() => {
                            }}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Precio Base" 
                            value={accountNumberInput}
                            onChangeText={(text) => setPrecioBase(text)}
                            onFocus={() => {
                            }}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultButton style={styles.editButton} onPress={() => ''}>+ Cargar Imagenes </DefaultButton>
                    </View>
                </View>
            </View>
            <DefaultButton style={styles.editButton} onPress={() => editUserProfile()}>Cancelar</DefaultButton>
            <DefaultButton style={styles.editButton} onPress={() => editUserProfile()}>Publicar</DefaultButton>
            

            <Text>UploadProductScreenComponent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    bigDataContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        marginTop: 40,
        flex: 1
    },
    scroll: {
        width: '100%',
    },
    dataContainer: {
        marginBottom: 50
    },
    mainTitle: {
        fontSize: 22,
        marginBottom: 40

    },
    editButton: {
        width: '100%',
        marginTop: 20
    },
    categoryButton: {
        width: '100%',
        marginTop: 10,
        backgroundColor: 'transparent',
        borderColor: Colors.SECONDARY_BLUE,
        borderWidth: 1,
    },
    inputSection: {
        marginBottom: 20,
        width: '100%'
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15
    },
    rowItem: {
        flex: 1,
    },
    mail: {
        paddingVertical: 10,
        paddingHorizontal: 17,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        fontSize: 14,
        lineHeight: 25,
        color: 'rgba(0, 0, 0, 0.3)'
    },
    rowLeftItem: {
        flex: 1,
        marginRight: 5
    },
    rowRightItem: {
        flex: 1,
        marginLeft: 5
    }
})

UploadProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Cargar producto",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}



export default UploadProductScreen;