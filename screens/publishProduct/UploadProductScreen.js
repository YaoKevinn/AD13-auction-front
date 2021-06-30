import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Keyboard } from 'react-native';
import CheckBox from 'react-native-check-box';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultModal from '../../components/DefaultModal';
import Urls from '../../constants/Urls';
import Colors from '../../constants/Colors';


const UploadProductScreen = props => {

    // const esArte = props.navigation.getParam('esarte');
    // const descripcionCorta = props.navigation.getParam('descripcioncatalogo');
    // const dataArte = props.navigation.getParam('dataarte');
    // const descripcionCatalogo = props.navigation.getParam('descripcioncompleta');
    // const precioBase = props.navigation.getParam('preciobase');
    const userId = useSelector(state => state.auth.loggedUser.identificador);

    const [ esArte, setEsArte ] = useState(false);
    const [ nombreArtista, setNombreArtista ] = useState('');
    const [ fechaCreacion, setFechaCreacion ] = useState('');
    const [ descripcionCorta, setDescripcionCorta ] = useState('');
    const [ descripcionCompleta, setDescripcionCompleta] = useState('');
    const [ precioBase, setPrecioBase ] = useState('');
    const [ tycAccepted, setTycAccepted ] = useState(false);
    const [imagenes, setImagenes] = useState(props.navigation.getParam('photos') || []);

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const imageUpload = () => {
        let ok = true;

        const photos = props.navigation.getParam('photos');
        console.log(imagenes);

        const data = new FormData();
        if ( imagenes.length !== 0 ) {
            photos.forEach((element, i) => {
                data.append('files', element);
            })
        } else {
            setModalOpen(true);
            setModalMessage('Aún no cargaste ninguna imagen');
            return
        }
        if ( !tycAccepted ) {
            setModalOpen(true);
            setModalMessage('Debe aceptar los TyC antes de publicar un producto');
            return
        }
        if ( esArte ) {
            data.append('DescripcionCatalogo', descripcionCorta);
            data.append('DescripcionCompleta', descripcionCompleta );
            data.append('Dueño', userId);
            data.append('EsArte', esArte);
            data.append('PrecioBase', precioBase);
            data.append('DataArte', 'null');
        } else {
            data.append('DescripcionCatalogo', descripcionCorta);
            data.append('DescripcionCompleta', descripcionCompleta );
            data.append('PrecioBase', precioBase);
        }

        console.log(data)

        fetch(Urls.BASE_API_URL+'/subirProducto/',{
            headers: {
            'Content-Type': 'multipart/form-data'
            },
            method:'POST',
            body: data
        })
        .then((response) =>response.json())
        .then(data=>{
            console.log('ÉXITO: API /subirProducto/ Upload Image')
            console.log(data);
            resData = data;
        })
        .catch( err => console.log( 'FALLO: API /subirProducto/ Upload Image =>', err));

      }

    return (
        <KeyboardAvoidingView style={styles.screen} behavior="padding">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() } style={styles.detailSection}>
            <ScrollView>
                <CheckBox
                    style={{flex: 1, marginBottom: 20}}
                    onClick={()=>{
                        setEsArte(!esArte)
                    }}
                    isChecked={esArte}
                    rightText={"Es articulo de arte"}
                    rightTextStyle={{fontSize: 16}}
                />
                    {
                        esArte ? 
                        <>
                            <View style={styles.rowItem}>
                                <DefaultTextInput 
                                    placeholder="Nombre de artista / diseñador" 
                                    value={nombreArtista}
                                    onChangeText={(text) => setNombreArtista(text)}
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <DefaultTextInput 
                                    placeholder="Fecha de creación" 
                                    value={fechaCreacion}
                                    onChangeText={(text) => setFechaCreacion(text)}
                                />
                            </View>
                        </> : null
                    }
                     <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Descripcion Catalogo" 
                            value={descripcionCorta}
                            onChangeText={(text) => setDescripcionCorta(text)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Descripcion Completa" 
                            value={descripcionCompleta}
                            onChangeText={(text) => setDescripcionCompleta(text)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                            placeholder="Precio Base" 
                            value={precioBase}
                            onChangeText={(text) => setPrecioBase(text)}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultButton style={styles.editButton} onPress={() => {
                            props.navigation.navigate('ImageBrowserScreen');
                            // pickImage();
                        }}>+ Cargar Imagenes </DefaultButton>
                    </View>
                    <CheckBox
                        style={{flex: 1, marginBottom: 40}}
                        onClick={()=>{
                            setTycAccepted(!tycAccepted)
                        }}
                        isChecked={tycAccepted}
                        rightText={"Declaro que el bien es de mi propiedad y no posee impedimentos para la venta"}
                        rightTextStyle={{fontSize: 12}}
                    />
                    <DefaultButton style={styles.publishBtn} onPress={() => imageUpload()}>Publicar</DefaultButton>
                    <DefaultModal 
                        title={modalMessage}
                        modalVisible={modalOpen}
                        options={['Cargar fotos']}
                        actions={[() => {
                            setModalOpen(false);
                        }]}
                    />
            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingVertical: 40,
        padding: 30,
        justifyContent: 'flex-start'
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
        // flex: 1,
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
        // flex: 1,
        marginBottom: 30
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
    },
    checkboxContainer: {
        width: 20,
        height: 20,
        flexDirection: "row",
        borderColor: '#000'
    },
    checkbox: {
        width: 20,
        height: 20,
        borderColor: '#000'
    },
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