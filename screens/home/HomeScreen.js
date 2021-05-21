import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import DefaultModal from '../../components/DefaultModal';

const HomeScreen = props => {
 
    return (
        <View style={styles.screen}>
            <Text> textInComponent </Text>
            <DefaultModal 
                modalVisible={true}
                title={'Para poder ver u ofertar, tenés que agregar un medio de pago'}
                options={['Cancelar', 'Agregar']}
                actions={[
                    () => {console.log('Confirm pressed')},
                    () => {console.log('Close pressed')}
                ]}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
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
