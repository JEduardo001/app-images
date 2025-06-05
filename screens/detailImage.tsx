import { RouteProp, useRoute } from '@react-navigation/native';
import {StyleSheet,View,Text,ScrollView,Image, Dimensions,TouchableOpacity, Alert, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import RootStackParamList from '../types/navigation';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleWallpaperLike } from '../services/api';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


type AlbumImagesRouteProp = RouteProp<RootStackParamList, 'detailImage'>;
const { width, height } = Dimensions.get('window');

const DetailImage = () => {
    const route = useRoute<AlbumImagesRouteProp>();
    const [cantLikes,setCantLikes] =  useState(0)
    const { dataImage } = route.params;
    

    useEffect(() => {
        setCantLikes(dataImage.likes)
    },[]) 

    const setLike = async () => {
        setCantLikes(cantLikes + 1)
        try {
            const id = await AsyncStorage.getItem('id');

            const responseGetCategories = await toggleWallpaperLike(dataImage._id,id)
            if(responseGetCategories.data.msg == "Like agregado"){
                setCantLikes(responseGetCategories.data.newLikes)
                console.log("Like Agregado")
            }else{
                if(responseGetCategories.data.msg == "Like removido"){
                    setCantLikes(responseGetCategories.data.newLikes)

                }

            }
          
        } catch (error) {
            console.log("Error al obtener categorias: ",error)
        }
    }
    


    const saveImage = async () => {
        try {
            // permisos
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso para acceder a la galería denegado, porfavor accede el permiso');
                return;
            }

            const filename = dataImage.imageUrl.split('/').pop() || 'downloaded_image.jpg';

            const localUri = FileSystem.documentDirectory + filename;

            Alert.alert('Descargando imagen...');

            const downloadResult = await FileSystem.downloadAsync(dataImage.imageUrl, localUri);

            Alert.alert('Guardando imagen en galería...');

            const asset = await MediaLibrary.createAssetAsync(downloadResult.uri);

            await MediaLibrary.createAlbumAsync('Descargas', asset, false);

            Alert.alert('Imagen guardada correctamente en galería');
        } catch (error) {
          console.log(`Error al descargar la imagen: ${error}`);
        }
    }
    

    return (
        <ScrollView style = {styles.container}>
            <Image
                source={{ uri: dataImage.imageUrl }}
                style={styles.image}
            />
            <View style ={styles.containerMenu}>
                <View style = {styles.containerDetails}>
                    <TouchableOpacity onPress = {() => setLike()}>
                        <Ionicons name="heart" size={32} color="red" />
                    </TouchableOpacity>
                    <Text style = {styles.textDetails}>  {cantLikes}</Text>
                </View>
               
                <View>
                    <TouchableOpacity onPress = {() => saveImage()}>
                        <Ionicons name="download-outline" size={32} color="blue" />
                    </TouchableOpacity>
                   {/*  <Text style = {styles.textDetails}>134</Text> */}
                </View>

            </View>
            <Text style = {{color: "white",fontSize: 20, margin: 15}}>Descripción</Text>
            <View style = {styles.containerDescription}>
               {
                dataImage.description == null
                ?  <Text style = {{}}>Sin descripción</Text>
                :  <Text style = {{}}>{dataImage.description}</Text>
               } 

            </View>
        </ScrollView>
    )   
}

export default DetailImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    image: {  
        height: height * 0.9,
        width: "100%",
        borderRadius: 30,
    },
    containerMenu: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderEndStartRadius: 30,
        borderBottomEndRadius: 30,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 80,
        width: "100%",
        flexDirection: "row",
        position: "absolute",
        marginTop: height * 0.81,
        justifyContent: "space-around"
    },
    textName: {
        fontSize: 25,
        color: "white",
        fontWeight: '300'
    },
    textDetails: {
        fontSize: 15,
        color: "white"
    },
    containerDetails: {

    },
    containerDescription: {
        padding: 10,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "rgba(255, 255, 255, 0.86)",
        marginBottom: 100
    }
})