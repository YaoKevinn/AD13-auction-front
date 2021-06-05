import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';

const ArticleCard = (props) => {

    const [ userLoggedIn, setUserLoggedIn ] = useState(true);

    return (
        <View style={ styles.cardContainer }>
            <Image 
                style={styles.productImage}
                source={{uri: 'https://i.etsystatic.com/12182965/r/il/11e980/2001588984/il_570xN.2001588984_qtts.jpg'}}
            />
            <View style={styles.productDetail}>
                <View style={styles.productHeader}>
                    <DefaultText style={styles.descriptionTitle}>Descripción</DefaultText>
                    <DefaultText style={styles.title}>Nº Pieza: 123456</DefaultText>
                </View>
                <DefaultText style={styles.data}>Post votum promissa memini cuius adeptione cupis; quem pollicitus est aversione aversi et fuga. Qui autem de re desit libido frustra miseri qui incurrit....</DefaultText>
                <View style={styles.ownerSection}>
                    <DefaultText style={styles.title}>Dueño/a: </DefaultText>
                    <DefaultText style={styles.data}>Sofía Menendez</DefaultText>
                </View>
                {
                    userLoggedIn ? (
                        <View style={styles.row}>
                            <View style={styles.row}>
                                <DefaultText style={styles.title}>Precio base: </DefaultText>
                                <DefaultText style={styles.data}>$77.000</DefaultText>
                            </View>
                            <TouchableOpacity 
                                activeOpacity={0.6} 
                                style={styles.loginButton}
                                onPress={() => props.navigation.navigate('AuctionItemScreen')}
                            >
                                <DefaultText style={styles.buttonText}>Ofertar</DefaultText>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.row}>
                            <DefaultText style={styles.data}>Para saber el precio base y ofertar.</DefaultText>
                            <TouchableOpacity activeOpacity={0.6} style={styles.loginButton}>
                                <DefaultText style={styles.buttonText}>Iniciar sesión</DefaultText>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            { 
                !props.isAvailable ? (
                    <View style={styles.overlay}>
                        <View style={styles.overlayTextContainer}>
                            <DefaultText style={styles.overlayText}>Vendido</DefaultText>
                            {/* <Ionicons name="md-checkmark-sharp" size={30} color={Colors.WHITE} /> */}
                        </View>
                    </View>
                ) : null
            }
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
        backgroundColor: 'rgba(0,0,0,0.5)',
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
        backgroundColor: Colors.PRIMARY_RED,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: "-8deg" }]
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
        fontSize: 16,
        lineHeight: 22.5
    },
    data: {
        fontFamily: 'poppins-300',
        fontSize: 13,
        lineHeight: 18
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
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.SECONDARY_BLUE,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5
    },
    buttonText: {
        color: Colors.WHITE
    }
})

export default ArticleCard
