import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import ArticleCard from '../../components/ArticleCard';

const AuctionScreen = props => {

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.auctionItemDetail}>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Comienza: </DefaultText>        
                    <DefaultText style={styles.detailTime}>Ene 15 - 09:00hs</DefaultText>
                </View>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Finaliza: </DefaultText>
                    <DefaultText style={styles.detailTime}>Ene 15 - 11:00hs</DefaultText>
                </View>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Rematador: </DefaultText>
                    <DefaultText style={styles.detailTime}>Juan Carlos Rodriguez</DefaultText>
                </View>
            </View>
            <View style={styles.catalogHeader}>
                <DefaultText style={styles.catalogHeaderText}>Catálogo</DefaultText>
                <View style={styles.divider}></View>
            </View>
            {/* PRODUCT CARDS */}
            <View style={styles.productItemSection}>
                <ArticleCard navigation={props.navigation} />
                <ArticleCard navigation={props.navigation} />
                <ArticleCard navigation={props.navigation} />
                <ArticleCard navigation={props.navigation} />
                <ArticleCard navigation={props.navigation} />
            </View>
            <View style={styles.footer}>
                <DefaultText style={styles.footerText}>No hay más producto para esta subasta</DefaultText>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: 200
    },
    // HEADER
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        paddingVertical: 27,
        paddingHorizontal: 17
    },  
    headerBackground: {
        width: '100%',
        height: 260,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    currency: {
        fontFamily: 'poppins-300',
        color: Colors.WHITE,
        fontSize: 15,
        lineHeight: 22.5,
        marginRight: 20
    },
    headerCategory: {
        fontFamily: 'poppins-300',
        fontSize: 15,
        lineHeight: 22.5,
        color: Colors.WHITE
    },
    headerTitle: {
        fontFamily: 'poppins-500',
        fontSize: 25,
        lineHeight: 37.5,
        color: Colors.WHITE
    },
    // MAIN
    auctionItemDetail: {
        height: 93,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'    
    },
    detailTitle: {
        fontFamily: 'poppins-500',
        fontSize: 15,
        lineHeight: 22.5,
        margin: 0
    },
    detailTime: {
        fontSize: 15,
        lineHeight: 22.5,
        margin: 0
    },
    catalogHeader: {
        marginTop: 28,
        paddingHorizontal: 20
    },
    catalogHeaderText: {
        fontFamily: 'poppins-500',
        fontSize: 22,
        lineHeight: 33,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.BLACK,
        marginTop: 1
    },
    productItemSection: {
        paddingHorizontal: 20,
        paddingTop: 40
    },
    footer: {
        height: 200,
    },
    footerText: {
        textAlign: 'center',
        color: '#999'
    }
})

AuctionScreen.navigationOptions = (navData) => {
    return {
        headerTitle: '',
        headerBackground: (
            <ImageBackground
                style={styles.headerBackground}
                source={{ uri: 'https://www.outfit4events.com/underwood/download/images/thorovo-kladivo-1.jpg' }}
                blurRadius={5}
            >
                <View style={styles.overlay}>
                    <DefaultText style={styles.headerCategory}>Categoría: Común</DefaultText>
                    <DefaultText style={styles.headerTitle}>Guitarras de colección</DefaultText>
                </View>
            </ImageBackground> 
        ),
        headerRight: () => (
            <DefaultText style={styles.currency}>Moneda: ARS</DefaultText>
        )
    }
}

export default AuctionScreen