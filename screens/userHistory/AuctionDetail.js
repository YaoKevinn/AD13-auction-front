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
    const { historyInCurrentAuction } = useSelector(state => state.auctions)

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


    return (
        <>
            <View style={styles.bigDataContainer}>
                <View>
                    <DefaultText style={styles.dataTitle}>Historial de subastas: Nombre 1</DefaultText>
                </View>
                <View>
                    <View>
                        <DefaultText style={styles.dataSubtitle}>Ofertas ganadas</DefaultText>
                        <View>
                            {
                                subastas?.map(el => {
                                    return <View>
                                        <View style={styles.dataContainer}>
                                            <DefaultText style={styles.dataItem}>{el.nombre}</DefaultText>
                                            <DefaultText style={styles.dataItem}>{el.importe}</DefaultText>
                                        </View>
                                        <Divider style={styles.divider}></Divider>
                                    </View>
                                })
                            }
                        </View>
                        <DefaultText style={styles.dataSubtitle}>Ofertas perdidas</DefaultText>
                        <View>
                            {
                                subastas?.map(el => {
                                    return <View>
                                        <View style={styles.dataContainer}>
                                            <DefaultText style={styles.dataItem}>{el.nombre}</DefaultText>
                                            <DefaultText style={styles.dataItem}>{el.importe}</DefaultText>
                                        </View>
                                        <Divider style={styles.divider}></Divider>
                                    </View>
                                })
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

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    bigDataContainer: {
        alignItems: 'center',
    },
    backButton: {
        marginTop: 60,
        width: 330,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 25
    },
    dataSubtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10

    },
    dataContainer: {
        alignItems: 'center',
        height: 50,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    dataItem: {
        fontSize: 15
    },
    dataNumber: {
        fontSize: 20,
    },
    divider: {
        width: 300,
    }
})

export default ListHistory;

