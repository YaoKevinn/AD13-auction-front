import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
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

    const [ refreshing, setRefreshing ] = React.useState(false);

    useEffect(() => {
      if ( userLoggedIn ) {
          dispatch(authActions.fetchAllUserProducts(userId))
      }
    }, [dispatch])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(authActions.fetchAllUserProducts(userId))
        wait(2000).then(() => setRefreshing(false));
      }, []);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    
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
            <ScrollView 
                style={styles.productsSection}
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    title='actualizando...'
                />
            }
            >
                {
                    userProductList.length === 0 ? (
                        <DefaultText style={styles.noProductsText}>No tiene ningún producto publicado</DefaultText>
                    ) : (
                        <>
                            {
                                userProductList.map( userProduct => {
                                    return (
                                        <TouchableOpacity 
                                            style={styles.userProduct} 
                                            key={userProduct.identificador}
                                            onPress={() => {
                                                props.navigation.navigate('DetailProductScreen', {
                                                    product: userProduct
                                                })
                                            }}
                                        >
                                            <View style={ userProduct.estado === 'aceptado' ? styles.status : ( userProduct.estado === 'rechazado' ? styles.rejectStatus : styles.pendingStatus)}></View>
                                            <View style={ styles.textContainer }>
                                                 <DefaultText style={styles.text}>{ userProduct.descripcioncatalogo }</DefaultText>
                                            </View>
                                            <Ionicons style={styles.arrow} name="ios-arrow-forward" size={24} />
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </>
                    )
                }
            </ScrollView>
            {/* <DefaultButton onPress={() => {
                props.navigation.navigate('HomeScreen');
            }}>Volver a la subasta</DefaultButton> */}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 65,
        paddingHorizontal: 30
    },
    divider: {
        marginVertical: 40,
        width: '80%'
    },
    userProduct: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        marginBottom: 25
    },
    userProductsInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    productsSection: {
        width: '100%'
    },
    textContainer: {
        flex: 1,
        marginLeft: 10
    },
    status: {
        width: 10,
        height: 10,
        backgroundColor: '#90C7A6',
        borderRadius: 10
    },
    pendingStatus: {
        width: 10,
        height: 10,
        backgroundColor: '#E0E5A6',
        borderRadius: 10
    },
    rejectStatus: {
        width: 10,
        height: 10,
        backgroundColor: '#D09696',
        borderRadius: 10
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