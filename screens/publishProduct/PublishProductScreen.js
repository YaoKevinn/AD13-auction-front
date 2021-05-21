import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';


const PublishProductScreen = props => {
 
    return (
        <View style={styles.screen}>
            <Text>publishProductScreenComponent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

PublishProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Publicar producto",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}



export default PublishProductScreen;
