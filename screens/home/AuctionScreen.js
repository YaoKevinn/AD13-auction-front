import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ImageBackground, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as auctionsActions from '../../store/actions/auctions';

import DefaultText from '../../components/DefaultText';
import Colors from '../../constants/Colors';
import ArticleCard from '../../components/ArticleCard';
import { FontAwesome } from '@expo/vector-icons'; 

const AuctionScreen = props => {

    const allProductsInAuction = useSelector(state => state.auctions.productsInCurrentAuction);
    const currentAuctionId = useSelector( state => state.auctions.currentAuctionId );
    const userLoggedIn = useSelector( state => state.auth.userLoggedIn );
    const loggedUser = useSelector( state => state.auth.loggedUser );
    const [ refreshing, setRefreshing ] = useState(false);

    const dispatch = useDispatch();

    const auctionId = props.navigation.getParam('auctionId');
    const auction = props.navigation.getParam('auctionData');

    useEffect(() => {
        if ( userLoggedIn && !loggedUser.mediodepagopreferido ) {
            // props.navigation.navigate('PayMethodScreen');
        }
        dispatch(auctionsActions.fetchAllProductsByAuctionId(auctionId));
        console.log(allProductsInAuction, currentAuctionId);
    }, [dispatch])

    const getDateTime = (dateString) => {
        const dateTime = new Date(dateString);
        const minute = dateTime.getMinutes();
        return (dateTime.toLocaleDateString() + ' - ' + dateTime.getHours() + ":" + (minute < 10 ? `0${minute}` : minute) );
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(auctionsActions.fetchAllProductsByAuctionId(auctionId));
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    return (
        <ScrollView 
            style={styles.screen}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title='actualizando...'
                />
            }
        >
            <View style={styles.auctionItemDetail}>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Comienza: </DefaultText>        
                    <DefaultText style={styles.detailTime}>{getDateTime(auction.inicio)}</DefaultText>
                </View>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Finaliza: </DefaultText>
                    <DefaultText style={styles.detailTime}>{getDateTime(auction.fin)}</DefaultText>
                </View>
                <View style={styles.row}>
                    <DefaultText style={styles.detailTitle}>Rematador: </DefaultText>
                    <DefaultText style={styles.detailTime}>{auction.subastador}</DefaultText>
                </View>
            </View>
            <View style={styles.catalogHeader}>
                <DefaultText style={styles.catalogHeaderText}>Catálogo</DefaultText>
                <View style={styles.divider}></View>
            </View>
            {/* PRODUCT CARDS */}
            <View style={styles.productItemSection}>
                {
                    allProductsInAuction.length !== 0 ? (
                        allProductsInAuction.map( product => {
                            return (
                                <ArticleCard navigation={props.navigation} product={product} key={product.identificador} currency={auction.moneda} auctionId={auctionId} />
                            )
                        })
                    ) : (
                        <DefaultText>Cargando contenido...</DefaultText>
                    )
                }
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
        paddingTop: 30,
        marginTop: 169
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

    const auction = navData.navigation.getParam('auctionData');

    return {
        headerTitle: '',
        headerBackground: () => (
            <ImageBackground
                style={styles.headerBackground}
                source={{ uri: auction.imagen }}
                blurRadius={5}
            >
                <View style={styles.overlay}>
                    <DefaultText style={styles.headerCategory}>Categoría: {auction.categoria}</DefaultText>
                    <DefaultText style={styles.headerTitle}>{auction.nombre}</DefaultText>
                </View>
            </ImageBackground> 
        ),
        headerRight: () => (
            <DefaultText style={styles.currency}>Moneda: {auction.moneda}</DefaultText>
        )
    }
}

export default AuctionScreen