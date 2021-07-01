import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import Divider from '../../components/Divider';
import DefaultText from '../../components/DefaultText';

const ListHistory = props => {
    const userAuctions = useSelector(state => state.auctions.userAuctions)
    const loggedUser = useSelector(state => state.auth.loggedUser);
    console.log(userAuctions)

    return (
        <>
            <View style={styles.bigDataContainer}>
                <View style={styles.dataContainer}>
                    <DefaultText style={styles.dataTitle}>Participación en subastas</DefaultText>
                    <DefaultText style={styles.dataNumber}>{userAuctions.pujasrealizadas || 0}</DefaultText>
                </View>
                <Divider style={styles.divider} />
            </View>
            <View style={styles.bigDataContainer}>
                <View style={styles.dataContainer}>
                    <DefaultText style={styles.dataTitle}>Artículos ganados</DefaultText>
                    <DefaultText style={styles.dataNumber}>{userAuctions.ganados  || 0}</DefaultText>
                </View>
                <Divider style={styles.divider} />
            </View>
            <View style={styles.historyAuctionsContainer}>
                <DefaultText style={styles.dataTitle}>Historial subastas</DefaultText>
                <View style={styles.auctionItemsContainer}>
                    {
                        userAuctions?.subastas?.map(el => {
                            return <TouchableOpacity
                                onPress={() => props.handleItemDetail(loggedUser.identificador, el.identificador, el.nombre, el.moneda)}
                                activeOpacity={0.5}
                                key={el.identificador}
                            >
                                <View style={styles.auctionItem} >
                                    <DefaultText style={styles.dataAuctions}>{el.nombre}</DefaultText>
                                    <DefaultText style={styles.arrow}>{'>'}</DefaultText>
                                </View>
                            </TouchableOpacity>
                        })
                    }
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    historyAuctionsContainer: {
        flex: 1,
        marginVertical: 30,
        paddingVertical: 2
    },
    bigDataContainer: {
        alignItems: 'center'
    },
    dataContainer: {
        alignItems: 'center',
        height: 100,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    dataNumber: {
        fontSize: 20,
    },
    dataAuctions:{
        fontSize: 15
    },
    divider: {
        width: 300,
    },
    arrow: {
        fontSize: 22,
    },
    auctionItemsContainer: {
        marginTop: 20
    },
    auctionItem: {
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginVertical: 10
    }
})

export default ListHistory;
