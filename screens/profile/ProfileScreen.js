import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';

const ProfileScreen = props => {
 
    return (
        <View style={styles.screen}>
            <Text> profileScreenComponent </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

ProfileScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Mi perfil",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName="ios-menu" onPress={ () => {
                    navData.navigation.toggleDrawer();
                }} />
            </HeaderButtons>
        )
    }
}

export default ProfileScreen;
