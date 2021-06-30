import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
import DefaultButton from '../../components/DefaultButton'; 

export default class ImageBrowserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            onSubmit: () => console.log('hola'),
        };
      }
    
  _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#0580FF'}/>
  );

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    // this.props.navigation.setOptions({
    //   headerRight: () => this._getHeaderLoader()
    // });

    callback.then(async (photos) => {
      const cPhotos = [];
      for(let photo of photos) {
        const pPhoto = await this._processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
      console.log(cPhotos);
      navigation.navigate('UploadProductScreen', {photos: cPhotos});
    })
    .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity title={'Done'} onPress={onSubmit}>
      <Text onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
      this.setState({count: count, onSubmit: onSubmit})
    //   this.props.navigation.setParams('option', {
    //         headerTitle: `Selected ${count} files`,
    //         headerRight: () => this._renderDoneButton(count, onSubmit)
    //   });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <View style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={4}
          onChange={(num, onSubmit) => this.updateHandler(num, onSubmit)}
          callback={(callback) => this.imagesCallback(callback)}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
        <DefaultButton onPress={() => this.state.onSubmit()}>Seleccionar {this.state.count} archivos</DefaultButton>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});

ImageBrowserScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Imagenes'
    };
}