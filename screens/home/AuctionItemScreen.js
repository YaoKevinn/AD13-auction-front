import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

import DefaultText from '../../components/DefaultText';
import DefaultButton from '../../components/DefaultButton';
import Colors from '../../constants/Colors';

const AuctionItemScreen = props => {

    const [ inputAmount, setInputAmount ] = useState(0);
    const [ currentPercentage, setCurrentPercentage ] = useState(0);

    const setPriceText = (text) => {
        console.log(text, typeof text);
        if ( text === "0" || text === "$"  ){
            setInputAmount('');
        } else if ( parseFloat(text) > 0 && text.includes('$') ){
            setInputAmount(text);
        } else if ( !text.includes('$') ) {
            setInputAmount('$'+text);
        } else {
            setInputAmount(text);
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.detailSection}>

                <View style={styles.headerRow}>
                    <DefaultText style={styles.title}>Descripción</DefaultText>
                    <DefaultText style={styles.title}>Nº Pieza: 123456</DefaultText>
                </View>

                <DefaultText style={styles.description}>Guitarra de colección de 2003, creada por el presitigioso luthiers John Kent en Nueva York. Solo hay 15 ejemplares de esta guitarra, ya que la producción de las mismas fuero por encargo.</DefaultText>

                <View style={styles.especification}>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Dueño/a: </DefaultText>
                        <DefaultText style={styles.data}>María Suárez</DefaultText>
                    </View>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Precio base: </DefaultText>
                        <DefaultText style={styles.data}>$77.000</DefaultText>
                    </View>
                    <View style={styles.dataRow}>
                        <DefaultText style={styles.title}>Oferta actual: </DefaultText>
                        <DefaultText style={styles.data}>$80.000</DefaultText>
                    </View>
                </View>

                <View style={styles.inputSection}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="$0"
                        keyboardType="number-pad"
                        value={inputAmount}
                        onChangeText={(text) => setPriceText(text)}
                    />
                </View>

                <View style={styles.percentages}>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => setCurrentPercentage(1)}
                        style={currentPercentage >= 1 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 1 ? styles.selectedNumberText : styles.numberText}>+1%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => setCurrentPercentage(5)}
                        style={currentPercentage >= 5 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 5 ? styles.selectedNumberText : styles.numberText}>+5%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6} 
                        onPress={() => setCurrentPercentage(10)}
                        style={currentPercentage >= 10 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 10 ? styles.selectedNumberText : styles.numberText}>+10%</DefaultText>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.6} 
                        onPress={() => setCurrentPercentage(20)}
                        style={currentPercentage === 20 ? styles.selected : styles.percentage}
                    >
                        <DefaultText style={currentPercentage >= 20 ? styles.selectedNumberText : styles.numberText}>+20%</DefaultText>
                    </TouchableOpacity>
                </View>

                <DefaultButton style={styles.button}>Ofertar</DefaultButton>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        paddingTop: 180
    },
    // HEADER
    headerBackground: {
        width: '100%',
        height: 260,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    // MAIN
    detailSection: {
        height: 530,
        paddingVertical: 37,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    especification: {
        justifyContent: 'space-between',
        marginBottom: 50,
        width: '100%'
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 36,
        width: '100%'
    },
    title: {
        fontFamily: 'poppins-500',
        fontSize: 15,
        lineHeight: 18
    },
    data: {
        fontFamily: 'poppins-300',
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 6
    },
    description: {
        fontFamily: 'poppins-300',
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 36
    },
    inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        borderBottomWidth: 1,
        width: 230,
        fontSize: 43,
        paddingBottom: 5,
        textAlign: 'center'
    },
    percentages: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 230,
        marginBottom: 50
    },
    percentage: {
        width: 55,
        height: 25,
        borderTopWidth: 10,
        borderColor: '#bbb',
        alignItems: 'center'
    },
    button: {
        width: 230,
        alignSelf: 'center',
        borderRadius: 20
    },
    numberText: {
        color: '#666'
    },
    selectedNumberText: {
        color: '#75b9f7',
        fontFamily: 'poppins-700'
    },
    selected: {
        width: 55,
        height: 25,
        borderTopWidth: 10,
        alignItems: 'center',
        borderColor: '#75b9f7',
    }
})

AuctionItemScreen.navigationOptions = (navData) => {
    return {
        headerTitle: '',
        headerBackground: (
            <ImageBackground
                style={styles.headerBackground}
                source={{ uri: 'https://i.etsystatic.com/12182965/r/il/11e980/2001588984/il_570xN.2001588984_qtts.jpg' }}
            >
            </ImageBackground> 
        ),
    }
}


export default AuctionItemScreen
