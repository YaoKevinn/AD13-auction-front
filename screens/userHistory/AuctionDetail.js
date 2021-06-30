import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Divider from '../../components/Divider';
import Colors from '../../constants/Colors';
import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import HeaderButton from '../../components/HeaderButton';
import * as auctionsActions from '../../store/actions/auctions';
import { clockRunning } from 'react-native-reanimated';

const ListHistory = props => {

    const historyInCurrentAuction = useSelector(state => state.auctions.historyInCurrentAuction);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(auctionsActions.setHistoryInCurrentAuction());
    // }, [])


    const subastas = [
        {
            nombre: 'Prueba 1',
            importe: '1000',
            ganador: 'no'
        }, {
            nombre: 'Prueba 1',
            importe: '1000',
            ganador: 'no'
        }, {
            nombre: 'Prueba 1',
            importe: '1000',
            ganador: 'no'
        }
    ]

    const getWinOffers = () => {
        return historyInCurrentAuction.filter( his => his.ganador === 'si' );
    } 

    const getFailedOffers = () => {
        return historyInCurrentAuction.filter( his => his.ganador === 'no' );
    }


    return (
        <>
            <ScrollView style={styles.bigDataContainer}>
                <View>
                    <DefaultText style={styles.dataTitle}>Historial de ofertas: </DefaultText>
                    <DefaultText>{ props.currentAuctionName }</DefaultText>
                </View>
                <View>
                    <View>
                        <DefaultText style={styles.dataSubtitle}>Ofertas ganadas</DefaultText>
                        <View>
                            {
                                getWinOffers().length !== 0 ? 
                                    getWinOffers().map( (el, index) => {
                                        return <View key={index}>
                                            <View style={styles.dataContainer}>
                                                <DefaultText style={styles.dataItem}>{el.descripcioncatalogo}</DefaultText>
                                                <DefaultText style={styles.dataItem}>{props.currentAuctionCurrency} {el.importe}
                                                    <Text style={styles.icon}>👑</Text>
                                                </DefaultText>
                                            </View>
                                            <Divider style={styles.divider}></Divider>
                                        </View>
                                    })
                                :
                                    <DefaultText>Aún no hay ofertas ganadas</DefaultText>
                                    
                            }
                        </View>
                        <DefaultText style={styles.dataSubtitle}>Ofertas perdidas</DefaultText>
                        <View>
                            {
                                getFailedOffers().length !== 0 ? 
                                    getFailedOffers().map( (el, index) => {
                                        return <View  key={index}>
                                            <View style={styles.dataContainer}>
                                                <DefaultText style={styles.dataItem}>{el.descripcioncatalogo}</DefaultText>
                                                <DefaultText style={styles.dataItem}>{props.currentAuctionCurrency} {el.importe}</DefaultText>
                                            </View>
                                            <Divider style={styles.divider}></Divider>
                                        </View>
                                    })
                                :
                                    <DefaultText>Aún no hay ofertas perdidas</DefaultText>
                            }
                        </View>
                    </View>
                </View>
                <View>
                    <DefaultButton
                        onPress=
                        {() => props.setShowDetail(false)}
                        style={styles.backButton}>
                        Volver
                    </DefaultButton>
                </View>

            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    bigDataContainer: {
        // alignItems: 'center',
        flex: 1
    },
    backButton: {
        marginTop: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataTitle: {
        fontSize: 21,
        fontFamily: 'poppins-500',
        textAlign: 'left',
        marginTop: 25
    },
    dataSubtitle: {
        fontSize: 18,
        fontFamily: 'poppins-500',
        marginTop: 40,
        marginBottom: 10

    },
    dataContainer: {
        alignItems: 'center',
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    dataItem: {
        fontSize: 15
    },
    icon: {
        position: 'relative',
        bottom: 4
    },  
    dataNumber: {
        fontSize: 20,
    },
    divider: {
        width: '100%',
    }
})

export default ListHistory;

