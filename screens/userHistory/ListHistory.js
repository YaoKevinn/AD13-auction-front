import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Divider from '../../components/Divider';
import Colors from '../../constants/Colors';
import DefaultText from '../../components/DefaultText';
import HeaderButton from '../../components/HeaderButton';
import * as auctionsActions from '../../store/actions/auctions';
import { clockRunning } from 'react-native-reanimated';

const ListHistory = props => {
    const userAuctions = useSelector(state => state.auctions.userAuctions)
    const loggedUser = useSelector(state => state.auth.loggedUser);
    console.log(userAuctions)

    return (
        <>
            <View style={styles.bigDataContainer}>
                <View style={styles.dataContainer}>
                    <DefaultText style={styles.dataTitle}>Participación en subastas</DefaultText>
                    <DefaultText style={styles.dataNumber}>{userAuctions.pujasrealizadas}</DefaultText>
                </View>
                <Divider style={styles.divider} />
            </View>
            <View style={styles.bigDataContainer}>
                <View style={styles.dataContainer}>
                    <DefaultText style={styles.dataTitle}>Artículos ganados</DefaultText>
                    <DefaultText style={styles.dataNumber}>{userAuctions.ganados}</DefaultText>
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
