import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import CheckBox from 'react-native-check-box';
import HeaderButton from '../../components/HeaderButton';
import DefaultButton from '../../components/DefaultButton';
import DefaultText from '../../components/DefaultText';
import Divider from '../../components/Divider';
import DefaultTextInput from '../../components/DefaultTextInput';
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const DetailProductScreen = props => {

    const product = props.navigation.getParam('product');
    const esArte = product.esarte;
    const imagenes = product.imagenes;
    const pagination = () => {
        return (
            <Pagination
              dotsLength={(props.navigation.getParam('photos') || []).length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.25)', position: 'absolute', bottom: -50, borderRadius: 20, width: '90%', padding: 0, transform: [{ scale: 0.35 }]}}
              dotStyle={{
                  width: 15,
                  height: 15,
                  borderRadius: 15,
                  marginHorizontal: 8,
                  marginVertical: -4,
                  backgroundColor: Colors.WHITE
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
                  backgroundColor: Colors.WHITE
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}

            />
        );
    }
    const _renderItem = ({item,index}) =>  {
        return (
          <View style={{ 
              width: '100%',
              height: '100%'
          }}>
            <Image 
                style={{width: '100%', height: '100%'}}
                source={{ uri: element }}
                resizeMode={'contain'}
            />
          </View>

        )
    }

    return (
        <View style={styles.screen}>
            <CheckBox
                    style={{marginBottom: 30}}
                    isChecked={esArte}
                    rightText={"Es un artículo de arte?"}
                    rightTextStyle={{fontSize: 17}}
                    disabled= {'true'}
                />
            {
                        esArte ? 
                        <>
                            <View style={styles.rowItem}>
                                <DefaultTextInput  
                                    editable={false}
                                    value={"Nombre"}
                                    
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <DefaultTextInput 
                                    editable={false}
                                    value={'Fecha de creación'}
                                    
                                />
                            </View>
                            <View style={styles.rowItem}>
                                <DefaultTextInput 
                                    editable={false}
                                    value={'Historia'}
                                />
                            </View>
                        </> : null
                    }
                     <View style={styles.rowItem}>
                        <DefaultTextInput 
                            editable={false}
                            value={product.descripcioncatalogo}
                        />
                    </View>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                        editable={false}
                        value={product.descripcioncompleta}
                        />
                    </View>
                    <Text>{product.preciobase}</Text>
                    <View style={styles.rowItem}>
                        <DefaultTextInput 
                        editable={false}
                        value={product.preciobase}
                        />
                    </View>
                    { 
                        (props.navigation.getParam('photos') || []).length !== 0 ?
                        <View style={styles.carouselContainer}>
                            <Carousel
                                layout={"default"}
                                ref={ref => {}}
                                data={product.imagenes}
                                sliderWidth={windowWidth}
                                itemWidth={368}
                                renderItem={(item, index) => _renderItem(item, index)}
                                onSnapToItem={(index) => setActiveSlide(index) }
                            />
                            { pagination() }
                        </View> : null
                    }
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 17
    },
    rowItem: {
        // flex: 1,
        marginBottom: 30
    },
    productImage: {
        width: '100%',
        height: 164,
        resizeMode: 'cover'
    },
    carouselContainer: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
    }
})



DetailProductScreen.navigationOptions = (navData) => {

    return {
        headerTitle: "Detalle",
    }
}

export default DetailProductScreen;