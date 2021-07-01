import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import CheckBox from 'react-native-check-box';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import DefaultTextInput from '../../components/DefaultTextInput';
import DefaultModal from '../../components/DefaultModal';
import Urls from '../../constants/Urls';
import Colors from '../../constants/Colors';
import { min } from 'react-native-reanimated';


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
    const [ historia, setHistoria ] = useState('');
    const [ descripcionCorta, setDescripcionCorta ] = useState('');
    const [ descripcionCompleta, setDescripcionCompleta] = useState('');
    const [ precioBase, setPrecioBase ] = useState('');
    const [ tycAccepted, setTycAccepted ] = useState(false);
    const [ imagenes, setImagenes ] = useState(props.navigation.getParam('photos') || []);
    const [ activeSlide, setActiveSlide ] = useState(0);

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const windowWidth = Dimensions.get('window').width;


    const imageUpload = () => {
        let ok = true;

        const photos = props.navigation.getParam('photos');
        console.log(imagenes);

        const data = new FormData();
        if ( photos.length !== 0 ) {
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
        if ( descripcionCorta !== '' && descripcionCompleta !== '' && precioBase !== '' ) {
            data.append('DescripcionCatalogo', descripcionCorta);
            data.append('DescripcionCompleta', descripcionCompleta );
            data.append('Dueño', userId);
            data.append('EsArte', esArte);
            data.append('PrecioBase', precioBase);
            data.append('NombreArtista', nombreArtista);
            data.append('FechaCreacion', fechaCreacion);
            data.append('Historia', historia);
        } else {
            setModalOpen(true);
            setModalMessage('Verifique los campos e intentá nuevamente');
            return
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
            setModalOpen(true);
            setModalMessage('Producto cargado con éxito');
            props.navigation.goBack();
        })
        .catch( err => {
            console.log( 'FALLO: API /subirProducto/ Upload Image =>', err);
            setModalOpen(true);
            setModalMessage('Error en cargar el product, intentá mas tarde');
            props.navigation.goBack();
        });

      }

      const pagination = () => {
        return (
            <Pagination
              dotsLength={(props.navigation.getParam('photos') || []).length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', position: 'absolute', bottom: -50, borderRadius: 20, width: '90%', padding: 0, transform: [{ scale: 0.35 }]}}
              dotStyle={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  marginHorizontal: 8,
                  marginVertical: -4,
                  backgroundColor: Colors.WHITE
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
                  backgroundColor: Colors.WHITE
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}

            />
        );
    }

    const _renderItem = ({item,index}) =>  {
        return (
          <View style={{ 
              width: '100%',
              height: '100%'
          }}>
            <Image 
                style={{width: '100%', height: '100%'}}
                source={{ uri: item.uri }}
                resizeMode={'contain'}
            />
          </View>

        )
    }


    return (
        <KeyboardAvoidingView style={styles.screen} behavior="position" keyboardVerticalOffset={-200}>
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
                            <View style={styles.rowItem}>
                                <DefaultTextInput 
                                    placeholder="Historia" 
                                    value={historia}
                                    onChangeText={(text) => setHistoria(text)}
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
                    { 
                        (props.navigation.getParam('photos') || []).length !== 0 ?
                        <View style={styles.carouselContainer}>
                            <Carousel
                                layout={"default"}
                                ref={ref => {}}
                                data={props.navigation.getParam('photos') || []}
                                sliderWidth={windowWidth}
                                itemWidth={368}
                                renderItem={(item, index) => _renderItem(item, index)}
                                onSnapToItem={(index) => setActiveSlide(index) }
                            />
                            { pagination() }
                        </View> : null
                    }
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
                        options={['Aceptar']}
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
    carouselContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 45,
        overflow: 'visible'
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