import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Divider from '../../components/Divider';
import AuctionDetail from './AuctionDetail';
import ListHistory from './ListHistory';
import Colors from '../../constants/Colors';
import DefaultText from '../../components/DefaultText';
import HeaderButton from '../../components/HeaderButton';
import * as auctionsActions from '../../store/actions/auctions';
import { clockRunning } from 'react-native-reanimated';

const UserHistoryScreen = props => {
    const dispatch = useDispatch();
    const userAuctions = useSelector(state => state.auctions.userAuctions)
    const loggedUser = useSelector(state => state.auth.loggedUser);
    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const [showDetail, setShowDetail] = useState(false)

    const [ currentAuctionName, setCurrentAuctionName ] = useState('');
    const [ currentAuctionCurrency, setCurrentAuctionCurrency ] = useState('');

    useEffect(() => {
        dispatch(auctionsActions.fetchUserAuctions(loggedUser.identificador));
    }, [dispatch])

    // useEffect(()=>{
    //     console.log(userAuctions)
    // },[userAuctions])

    const handleItemDetail = (userId, auctionId, auctionName, coin) => {
        dispatch(auctionsActions.setHistoryInCurrentAuction(userId, auctionId))
        setCurrentAuctionName(auctionName);
        setCurrentAuctionCurrency(coin);
        setShowDetail(true)
    }

    return (
        <View style={styles.historyContainer}>
            {
                showDetail ? 
                <AuctionDetail setShowDetail={setShowDetail} currentAuctionName={currentAuctionName} currentAuctionCurrency={currentAuctionCurrency}/>
                :
                <ListHistory handleItemDetail={handleItemDetail} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    historyContainer: {
        flex: 1,
        margin: 30,
        paddingVertical: 2
    },
    historyAuctionsContainer: {
        flex: 1,
        margin: 30,
        paddingVertical: 2
    },
    bigDataContainer: {
        alignItems: 'center',
    },
    dataContainer: {
        alignItems: 'center',
        height: 100,
        width: 330,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dataTitle: {
        fontSize: 18,
        width: 200,
        fontWeight: 'bold'
    },
    dataNumber: {
        fontSize: 20,
    },
    divider: {
        width: 300,
    },
    arrow: {
        fontSize: 22,
    },
    auctionItemsContainer:{
        marginTop:20
    },
    auctionItem: {
        borderColor: 'black',
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical:8,
        paddingHorizontal: 15,
        marginVertical: 10
    }
})

UserHistoryScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Historial",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={() => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}


export default UserHistoryScreen;
