import React from 'react'
import { Text, View, StyleSheet,Modal,ScrollView,Image} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Button } from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler';
import ModalSelector from 'react-native-modal-selector';
import * as ImagePicker from "expo-image-picker";
import HeaderButton from '../../components/HeaderButton';
import { user } from '../../models/User';
import { categoria } from '../../models/Subasta';


const PublishProductScreen = props => {

    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [artista, setArtista] = useState("");
    const [fecha, setFecha] = useState("");
    const [duenio, setDuenio] = useState("");

    const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
    const {identificador} =useContext(user)

    const checkTextInput = (e) => {
        if (!nombre.trim()) {
          alert("Ingrese nombre de su producto");
          return;
        }
        if (!descripcion.trim()) {
          alert("Ingrese la descripcion de su producto");
          return;
        }
        if (!tipo.trim()) {
          alert("El producto es una pieza de arte?");
          return;
        }
       
       handleButtonClick();
     };

     function handleButtonClick () {
    
        const descr =
          tipo != "Arte" && tipo != "Piezas de arte"
            ? descripcion
            : artista + fecha + duenio;
        const nuevoProducto = {
          descripcionCatalogo: nombre,
          tipo: tipo,
          descripcionCompleta: descr,
          foto:imagenes,
          duenio: user?.identificador
        };

        const user ={
          "identificador": "151297",
          "email": "franperelman@gmail.com",
          "password": "1A2B3C4D!",
          "categoria": "oro",
          "verificador": null,
          "documento": "40785491",
          "nombre": "Francis Perelman",
          "direccion": "Libertad 433",
          "estado": 2,
          "imagen": ""
        };
        const data = Object.assign(nuevoProducto,user) 
        fetch(url+"productos", {
        
          method: "POST",
          headers: {
            "Content-Type": 'application/json; charset=UTF-8',
          },
    
          body: JSON.stringify({...nuevoProducto}),
        })
        .then((response) => response.json())
        .then(data=>{
            console.log("Cargar el producto")
            setModalSuccessVisible(true);
        })
      };
    
      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
      
      return (
        <ScrollView style={styles.mainContainer}>
          <View style={{ flex: 1, justifyContent: "space-around" }}>
            <Text style={styles.title}>Nombre del producto:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNombre(text)}
              value={nombre}
            />
            <Text style={styles.title}>Tipo de producto:</Text>
    
            <ModalSelector
              data={categoria}
              style={styles.modalSelector}
              initValue="Seleccionar"
              margin="50"
              type="solid"
              key={tipo}
              onChange={ (texto)=>{setTipo(texto.label)}}
            />
    
            <Text style={styles.title}>Descripción:</Text>
            <TextInput
              style={styles.description}
              onChangeText={(text) => setDescripcion(text)}
              value={descripcion}
            />
    
            {(tipo === "Arte" || tipo === "Piezas de arte") && (
              <>
                <Text style={styles.title}>Artista:</Text>
    
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setArtista(text)}
                  value={artista}
                />
    
                <Text style={styles.title}>Fecha:</Text>
    
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setFecha(text)}
                  value={fecha}
                />
    
                <Text style={styles.title}>Dueño anterior:</Text>
    
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setDuenio(text)}
                  value={duenio}
                />
              </>
            )}
    
            <Text style={styles.title}>Imagenes:</Text>
            <Button
              title="+"
              style={styles.btnimage}
              onPress={pickImage}
              color="#9FCAF5"
            />
    
            <Button
              title="Aceptar"
              style={styles.buttonLogin}
              onPress={checkTextInput}
            />
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccessVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalSuccessVisible(!modalSuccessVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  {" "}
                  ¡Felicitaciones! Su producto se encuentra en revisión{" "}
                </Text>
                <View style={styles.columns}>
                  <Image
                    style={styles.imageModal}
                    source={require("../../../assets/success.png")}
                  />
    
                  <Button
                    title="Aceptar"
                    color="#9FCAF5"
                    onPress={() =>  {
                      setModalSuccessVisible(false);
                      props.navigation.navigate("Home")}}
                  ></Button>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.screen}>
            <Text>publishProductScreenComponent</Text>
        </View>
        </ScrollView>
      );
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
