import React, { useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as auctionsActions from '../../store/actions/auctions';

import HeaderButton from '../../components/HeaderButton';
import DefaultModal from '../../components/DefaultModal';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import AuctionListItem from '../../components/AuctionListItem';

const HomeScreen = props => {

    const allAuctions = useSelector(state => state.auctions.allAuctions);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auctionsActions.fetchAllAuctions());
    }, [dispatch])

    console.log('HomeScreen: ', allAuctions);
 
    return (
        <ScrollView style={styles.screen}>
            { 
                allAuctions.map( auction => {
                    return (
                        <View key={auction.identificador}>
                            <AuctionListItem 
                                key={auction.identificador}
                                auction={auction}
                                onPress={() => props.navigation.navigate('AuctionScreen', {
                                    auctionId: auction.identificador
                                })} />
                            <Divider style={styles.divider} />
                        </View>
                    )
                })
            }
            {/* <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')} /> */}
            {/* <Divider style={styles.divider} /> */}
            <DefaultText style={styles.footerText}>No hay más subastas por este momento</DefaultText>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        paddingVertical: 35,
        paddingHorizontal: 20,
    },
    divider: {
        marginVertical: 24
    },
    footerText: {
        marginTop: 0,
        textAlign: 'center',
        color: '#999'
    }
})

HomeScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Subastas",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}


export default HomeScreen
