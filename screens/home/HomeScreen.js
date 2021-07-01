import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as auctionsActions from '../../store/actions/auctions';

import HeaderButton from '../../components/HeaderButton';
import DefaultModal from '../../components/DefaultModal';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import AuctionListItem from '../../components/AuctionListItem';
import { set } from 'react-native-reanimated';

const HomeScreen = props => {

    const getTimeByDateString = (dateString) => {
        return new Date(dateString).getTime()
    }

    const allAuctions = useSelector(state => state.auctions.allAuctions).sort((a, b) => getTimeByDateString(a.inicio) - getTimeByDateString(b.inicio));
    const loggedUser = useSelector(state => state.auth.loggedUser);
    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const dispatch = useDispatch();

    const [ modalOpen, setModalOpen ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');
    const [ refreshing, setRefreshing ] = React.useState(false);

    useEffect(() => {
        dispatch(auctionsActions.fetchAllAuctions());
    }, [dispatch])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(auctionsActions.fetchAllAuctions());
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    console.log( userLoggedIn ? (loggedUser, userLoggedIn) : 'Sin usuario loggeado');

 
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
            { 
                allAuctions.map( auction => {
                    return (
                        <View key={auction.identificador}>
                            <AuctionListItem 
                                key={auction.identificador}
                                auction={auction}
                                onPress={() => {
                                    dispatch({type: auctionsActions.CLEAR_CURRENT_PRODUCT});
                                    if ( auction.estado === 'abierta' ) {
                                        props.navigation.navigate('AuctionScreen', {
                                            auctionId: auction.identificador,
                                            auctionData: auction
                                        }); 
                                    } else {
                                        setModalMessage('La subasta aún no empezó, podrás ingresar una vez cuando esté abierta');
                                        setModalOpen(true);
                                    }
                                }}
                             />
                            <Divider style={styles.divider} />
                        </View>
                    )
                })
            }
            {/* <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')} /> */}
            {/* <Divider style={styles.divider} /> */}
            <DefaultText style={styles.footerText}>No hay más subastas por este momento</DefaultText>
            <DefaultModal 
                title={modalMessage}
                modalVisible={modalOpen}
                options={['Confirmar']}
                actions={[() => setModalOpen(false)]}
            />
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
