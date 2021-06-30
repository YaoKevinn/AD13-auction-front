import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultModal from '../../components/DefaultModal';
import HeaderButton from '../../components/HeaderButton';
import Colors from '../../constants/Colors';
import Urls from '../../constants/Urls';


const ProfileScreen = props => {

    const loggedUser = useSelector(state => state.auth.loggedUser);
    const dispatch = useDispatch();

    const [ name, setName ] = useState(loggedUser.nombre);
    const [ lastName, setLastName ] = useState(loggedUser.apellido);
    const [ mail, setMail ] = useState(loggedUser.mail);
    const [ dni, setDni ] = useState(loggedUser.documento);
    const [ category, setCategory ] = useState(loggedUser.categoria);

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');


    // const subastas = {
    //     nombre: 'Julián',
    //     apellido: 'Krupka',
    //     mail: 'juliank98@hotmail.com',
    //     dni: '41308210',
    //     telefono: '1140689258',
    //     categoria: 'Platino'
    // }

    const editUserProfile = () => {
        let ok = true;
        if ( name === loggedUser.nombre && lastName === loggedUser.apellido && dni === loggedUser.documento ) {
            setModalOpen(true);
            setModalMessage('Error en editar perfil, verificá los datos ingresados antes de continuar');
            ok = false;
        }
        if ( ok ) {
            fetch(Urls.BASE_API_URL+`/usuario/${loggedUser.identificador}`, {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Nombre: name,
                    Apellido: lastName,
                    DNI: dni,
                })
            })
            .then( res => res.json() )
            .then( data => {
                console.log('Éxito API /usuario/{idUsuario} Editar perfil');
                console.log(data);
                if ( data.statusCode && data.statusCode === 204 ) {
                    dispatch({type: authActions.UPDATE_PROFILE, user: {
                        ...loggedUser,
                        nombre: name,
                        apellido: lastName,
                        documento: dni
                    }})
                    setModalOpen(true);
                    setModalMessage('¡Perfil modificado con éxito!');
                } else {
                    setModalOpen(true);
                    setModalMessage('Error en modificar perfil, intentá más tarde');
                }
            })
            .catch( err => { console.log('Fallo API API /usuario/{idUsuario} Editar perfil =>', err) } )
        }
    }

    const openIncreaseCategoryModal = () => {
        setModalOpen(true);
        setModalMessage('Se envió la solicitud de aumento de categoria, apena terminemos de analizar tu perfil, te mandaremos un mail informando los requisitos y los pasos a seguir.');
    }

    return (
        <KeyboardAvoidingView style={styles.bigDataContainer} behavior="padding">
            <TouchableWithoutFeedback style={styles.dataContainer} onPress={() => Keyboard.dismiss()}>
                <ScrollView style={styles.scroll}>
                <DefaultText style={styles.mainTitle}>Mis datos</DefaultText>
                <View style={styles.inputSection}>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Nombre:</DefaultText>
                            <DefaultTextInput
                                placeholder="Maira"
                                value={name}
                                onChangeText={ (text) => setName(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Apellido:</DefaultText>
                            <DefaultTextInput
                                placeholder="Gomez"
                                value={lastName}
                                onChangeText={ (text) => setLastName(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>DNI:</DefaultText>
                            <DefaultTextInput
                                placeholder="12345678"
                                value={dni}
                                onChangeText={ (text) => setDni(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Mail:</DefaultText>
                            <Text style={styles.mail}>{ mail }</Text>
                        </View>
                    </View>
                    {/* <View style={styles.row}>
                        <View style={styles.rowItem}>
                            <DefaultText>Teléfono:</DefaultText>
                            <DefaultTextInput
                                placeholder="1123456789"
                                value={telephone}
                            />
                        </View>
                    </View> */}
                    <View style={styles.row}>
                    <View style={styles.rowItem}>
                            <DefaultText>Categoria:</DefaultText>
                            <Text style={styles.mail}>{ category }</Text>
                        </View>
                    </View>
                    <DefaultButton style={styles.editButton} onPress={() => editUserProfile()}>Editar</DefaultButton>
                    <DefaultButton style={styles.categoryButton} whiteButton={true} onPress={() => openIncreaseCategoryModal()}>Quiero aumentar mi cateogria</DefaultButton>
                    <DefaultModal 
                        title={modalMessage}
                        modalVisible={modalOpen}
                        options={['Aceptar']}
                        actions={[() => setModalOpen(false) ]}
                    />
                </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
