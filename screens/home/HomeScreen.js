import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import DefaultModal from '../../components/DefaultModal';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import AuctionListItem from '../../components/AuctionListItem';

const HomeScreen = props => {
 
    return (
        <ScrollView style={styles.screen}>
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')} />
            <Divider style={styles.divider} />
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')}/>
            <Divider style={styles.divider} />
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')}/>
            <Divider style={styles.divider} />
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')}/>
            <Divider style={styles.divider} />
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')}/>
            <Divider style={styles.divider} />
            <AuctionListItem onPress={() => props.navigation.navigate('AuctionScreen')}/>
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
        marginTop: 50,
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
