import { useState } from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity, Dimensions,SectionList,ScrollView} from 'react-native'
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const UploadImage = () => {
    const [image, setImage] = useState<string | null>(null);

    const DATA = [
        {
        title: 'Espacio',
        data: ['Manzana', 'Banana', 'Naranja'],
        },
        {
        title: 'Naturaleza',
        data: ['Zanahoria', 'Lechuga', 'Brócoli'],
        },
        {
        title: 'Carros',
        data: ['Zanahoria', 'Lechuga', 'Brócoli'],
        },
        {
        title: 'Arquitectura',
        data: ['Zanahoria', 'Lechuga', 'Brócoli'],
        },
        {
        title: 'Aniamles',
        data: ['Zanahoria', 'Lechuga', 'Brócoli'],
        },
    ];

  const pickImage = async () => {
    // Pide permisos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Se requieren permisos para acceder a la galería.');
      return;
    }

    // Abre la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


    return (
        <ScrollView style ={styles.container}>
           {
            image 
             ?
                <Image source={{ uri: image }} style={styles.image} />
             :
                <Image
                    source={require('../assets/noImg.png')}
                    style={styles.imageNoImage}
                />
           }
           <TouchableOpacity onPress={() => pickImage()}  style = {styles.btnSelectImage}>
            <Text>Seleccionar imagen</Text>
           </TouchableOpacity>
           <Text style = {[styles.text, {fontSize: 30, marginTop: 40}]}>Categorías</Text>
           <SectionList
                 scrollEnabled={false}
                style={{marginTop: 30}}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Text style = {[styles.text, {marginLeft: 20}]}>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 18, color: "white" }}>{title}</Text>
                )}
            />

            <View style = {{width: "100%", alignItems: "center"}}>
                <TouchableOpacity style = {styles.btnUploadImage}>
                    <Text>Subir imagen</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50, 
    },
    image: {  
        height: height * 0.4,
        width: "100%",
        borderRadius: 30,
    },
    imageNoImage: {
        height: height * 0.4,
        width: "100%",
        borderRadius: 30,
        tintColor: "white"
    },
    btnSelectImage: {
        marginTop: 40,
        backgroundColor: "rgb(201, 92, 234)",
        borderRadius: 15,
        padding: 10,
        width: 120,
    },
    text: {
        color: "white"
    },
    btnUploadImage: {
        marginTop: 40,
        marginBottom: 50,
        backgroundColor: "rgb(201, 92, 234)",
        borderRadius: 15,
        padding: 10,
        width: 120,
    }

})