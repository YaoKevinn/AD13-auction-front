import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

import DefaultText from './DefaultText';

const AuctionListItem = (props) => {


    return (
        <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.itemContainer}
            onPress={props.onPress}
        >
            <Image 
                style={styles.itemImage}
                source={{uri: 'https://www.outfit4events.com/underwood/download/images/thorovo-kladivo-1.jpg'}} 
            />
            <View style={styles.auctionDetail}>
                <DefaultText style={styles.auctionTitle}>Guitarras de colección</DefaultText>
                <View style={styles.timeSection}>
                    <DefaultText style={styles.auctionTime}>Comienza: Ene 15, 09:00hs</DefaultText>
                    <DefaultText style={styles.auctionTime}>Finaliza: Ene 15, 11:00hs</DefaultText>
                </View>
                <View style={styles.status}>
                    <DefaultText style={styles.currency}>Común - ARS</DefaultText>
                    <View style={styles.liveIndicator}>
                        <DefaultText style={styles.liveText}>En vivo</DefaultText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 127,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    auctionDetail: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        paddingVertical: 2
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemImage: {
        width: 130,
        height: 130
    },
    auctionTitle: {
        fontFamily: 'poppins-400',
        fontSize: 18,
        lineHeight: 27,
    },
    timeSection: {

    },
    auctionTime: {
        fontFamily: 'poppins-300',
        fontSize: 14,
        lineHeight: 21
    },
    currency: {
        fontFamily: 'poppins-500',
        fontSize: 12,
        lineHeight: 18
    },
    liveIndicator: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        backgroundColor: Colors.SECONDARY_RED,
        borderRadius: 5
    },
    liveText: {
        color: Colors.WHITE
    }
})

export default AuctionListItem
