import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';

const ProfileScreen = props => {

    const subastas = {
        nombre: 'Julián',
        apellido: 'Krupka',
        mail: 'juliank98@hotmail.com',
        dni: '41308210',
        telefono: '1140689258',
        categoria: 'Platino'
    }


    return (
        <View style={styles.bigDataContainer}>
            <View style={styles.dataContainer}>
                <DefaultText style={styles.mainTitle}>Mis datos</DefaultText>
                <View style={styles.inputSection}>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Nombre:</DefaultText>
                            <DefaultTextInput
                                placeholder="Maira"
                                value={subastas.nombre}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Apellido:</DefaultText>
                            <DefaultTextInput
                                placeholder="Gomez"
                                value={subastas.apellido}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Mail:</DefaultText>
                            <DefaultTextInput
                                placeholder="prueba@prueba.com"
                                value={subastas.mail}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>DNI:</DefaultText>
                            <DefaultTextInput
                                placeholder="20498783"
                                value={subastas.dni}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Teléfono:</DefaultText>
                            <DefaultTextInput
                                placeholder="11409797987"
                                value={subastas.telefono}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Categoría:</DefaultText>
                            <DefaultTextInput
                                placeholder="Platino"
                                value={subastas.categoria}
                            />
                        </View>
                    </View>

                </View>
            </View>
            <DefaultButton styles={styles.editButton}>Editar</DefaultButton>


        </View>


    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    bigDataContainer: {
        alignItems: 'flex-start',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40
    },
    dataContainer: {

        marginBottom: 50
    },
    mainTitle: {
        fontSize: 22,
        marginBottom: 40

    },
    editButton: {
        width: 4
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
    rowLeftItem: {
        flex: 1,
        marginRight: 5
    },
    rowRightItem: {
        flex: 1,
        marginLeft: 5
    }
})

ProfileScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Mi perfil",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

export default ProfileScreen;
