import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import DefaultText from '../components/DefaultText';
import DefaultModal from '../components/DefaultModal';
import Colors from '../constants/Colors';
import { useSelector } from 'react-redux';

const ArticleCard = (props) => {

    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);

    const product = props.product;

    const [ pendingModalOpen, setPendingModalOpen ] = useState(false);

    return (
        <View style={ styles.cardContainer }>
            <Image 
                style={styles.productImage}
                source={{uri: (product.imagenes && product.imagenes.lenght !== 0 ? product.imagenes[0] : 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg')}}
            />
            <View style={styles.productDetail}>
                <View style={styles.productHeader}>
                    <DefaultText style={styles.descriptionTitle}>{product.descripcioncatalogo}</DefaultText>
                    <DefaultText style={styles.title}>Nº Pieza: {product.identificador}</DefaultText>
                </View>
                
                <DefaultText style={styles.descriptionData}>{ product.descripcioncompleta } </DefaultText>
                <View style={styles.ownerSection}>
                    <DefaultText style={styles.title}>Dueño/a: </DefaultText>
                    <DefaultText style={styles.data}>{ product.nombreduenio }</DefaultText>
                </View>
                {
                    userLoggedIn ? (
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <DefaultText style={styles.title}>Precio base: </DefaultText>
                                <DefaultText style={styles.data}>{ props.currency } { product.preciobase }</DefaultText>
                            </View>
                            {
                                !product.vendido ? (
                                    <TouchableOpacity 
                                        activeOpacity={0.6} 
                                        style={ product.disponibleparaofertar ? styles.offerButton : styles.pendingButton}
                                        onPress={() => {
                                            if ( product.disponibleparaofertar ) {
                                                props.navigation.navigate('AuctionItemScreen', {
                                                    product: product,
                                                    currency: props.currency,
                                                    auctionId: props.auctionId
                                                });
                                            } else {
                                                setPendingModalOpen(true);
                                            }
                                        }}
                                    >
                                        <DefaultText style={styles.buttonText}>{ product.disponibleparaofertar ? 'Ofertar' : 'Aún no se puede ofertar' }</DefaultText>
                                    </TouchableOpacity>
                                ) : null
                            }
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <DefaultText style={styles.data}>Para saber el precio base y ofertar.</DefaultText>
                            <TouchableOpacity 
                                activeOpacity={0.6} 
                                style={styles.loginButton}
                                onPress={() => {
                                    props.navigation.navigate('LoginScreen');
                                }}
                            >
                                <DefaultText style={styles.loginButtonText}>Iniciá sesión</DefaultText>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            { 
                product.vendido ? (
                    <View style={styles.overlay}>
                        <View style={styles.overlayTextContainer}>
                            <DefaultText style={styles.overlayText}>Vendido</DefaultText>
                            {/* <Ionicons name="md-checkmark-sharp" size={30} color={Colors.WHITE} /> */}
                        </View>
                    </View>
                ) : null
            }
            <DefaultModal 
                title="Este producto aún no está disponible para ofertar, en un instante se habilitará"
                modalVisible={pendingModalOpen}
                options={['Confirmar']}
                actions={[() => setPendingModalOpen(false)]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 337,
        marginBottom: 35,
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    overlayText: {
        color: Colors.WHITE,
        fontSize: 30,
        marginRight: 5
    },
    overlayTextContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        // backgroundColor: 'rgba(0,0,0, 0.75)',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '100%',
        height: 164,
        resizeMode: 'cover'
    },
    productDetail: {
        backgroundColor: '#F4F4F4',
        height: 173,
        paddingVertical: 14,
        paddingHorizontal: 11,
        justifyContent: 'space-between'
    },
    productHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    descriptionTitle: {
        fontFamily: 'poppins-500',
        fontSize: 14,
        lineHeight: 22.5
    },
    data: {
        fontFamily: 'poppins-300',
        fontSize: 13,
        lineHeight: 18
    },
    descriptionData: {
        fontFamily: 'poppins-300',
        fontSize: 13,
        lineHeight: 18,
        height: 80
    },
    ownerSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'poppins-500',
        fontSize: 14,
        lineHeight: 18
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    offerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY_BLUE,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 80,
    },
    pendingButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(69, 160, 244, 0.6)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 115
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
        position: 'absolute',
        bottom: -3,
        right: -8,
        width: 110,
    },
    buttonText: {
        color: Colors.WHITE,
        textAlign: 'center',
        fontSize: 12,
    },
    loginButtonText: {
        color: Colors.BLACK,
        textAlign: 'center',
        fontSize: 12,
        textDecorationLine: 'underline',
        fontFamily: 'poppins-600'
    },
})

export default ArticleCard
