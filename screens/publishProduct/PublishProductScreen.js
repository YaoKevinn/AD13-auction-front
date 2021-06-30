import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';


const PublishProductScreen = props => {
    const userId = useSelector(state => state.auth.loggedUser.identificador);
    const userLoggedIn = useSelector(state => state.auth.loggedUser.identificador);
    const userProductList = useSelector(state => state.auth.allUserProducts);
    const dispatch = useDispatch();

    useEffect(() => {
      if ( userLoggedIn ) {
          dispatch(authActions.fetchAllUserProducts(userId))
      }
    }, [dispatch])


    
    return (
        <View style={styles.screen}>
          <DefaultButton
                onPress={() => {
                    props.navigation.navigate('UploadProductScreen');
                }}
            >
                Nuevo articulo
            </DefaultButton>
            <Divider style={styles.divider} />
            <ScrollView style={styles.ProductsSection}>
                {
                    UserProductList.length === 0 ? (
                        <DefaultText style={styles.noProductsText}>No posee articulos aún</DefaultText>
                    ) : (
                        <>
                            {
                                userProductList.map( userProduct => {
                                    return (
                                        <TouchableOpacity 
                                            style={styles.userProduct} 
                                            key={userProduct.identificador}
                                        >
                                            <View style={styles.UserProductsInfo}>
                                                <View style={ UserProduct.estado ? styles.status : styles.pendingStatus}></View>
                                                
                                            </View>
                                            {
                                            }
                                            <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </>
                    )
                }
            </ScrollView>
            <DefaultButton onPress={() => {
                props.navigation.navigate('HomeScreen');
            }}>Volver a la subasta</DefaultButton>

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