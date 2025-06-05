import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {StyleSheet,View,Text,ScrollView,Image,Modal, Dimensions,TouchableOpacity, TextInput, Alert, Button} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import RootStackParamList from '../types/navigation';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { toggleWallpaperLike,updateWallpaperDescription,deleteWallpaper } from '../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AlbumImagesRouteProp = RouteProp<RootStackParamList, 'detailImage'>;
const { width, height } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const EditImage = () => {
    const navigation = useNavigation<NavigationProp>();

    const route = useRoute<AlbumImagesRouteProp>();
    const [cantLikes,setCantLikes] =  useState(0)
    const [description,setDescription] = useState("Sin descripción")
    const [visibleModal,setModalVisible] = useState(false)
    const { dataImage } = route.params;
    

    useEffect(() => {
        setCantLikes(dataImage.likes)
        if(dataImage.description != null){
         setDescription(dataImage.description)

        }
    },[]) 

    const updateImage = async () => {
        try {
            const response = await updateWallpaperDescription(dataImage._id,description)
            if(response.data.msg == "Wallpaper actualizado"){
                Alert.alert("Descripción actualizada")
            }else{
                Alert.alert("Error al actualizar la descripción vuelve a intentarlo" )
            }
            //console.log("response ",response)
        } catch (error) {
            console.log("Error al actualizar la descripción")
        }
    }

    const deleteImage = async () => {
        try {
            const response = await deleteWallpaper(dataImage._id)
            //console.log("response eliminar imagen ",response)
            if(response.data.msg == "Wallpaper eliminado"){
                Alert.alert("Imagen eliminada")
                navigation.navigate("profile",{})

            }else{
                Alert.alert("Error al eliminar la imagen vuelve a intentarlo" )
            } 
        } catch (error) {
            console.log("Error al eliminar la imagen")
        }
    }

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

    const ComponentModal = () => {
        return (
            <Modal
                transparent={true}
                visible={visibleModal}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style = {styles.textModal}>¿Deseas eliminar la imagen?</Text>
                    <Button title="Eliminar" onPress={() => {setModalVisible(false), deleteImage()}} />
                </View>
                </View>
            </Modal>
        )
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
                    <TouchableOpacity>
                        <Ionicons name="download-outline" size={32} color="blue" />
                    </TouchableOpacity>
                   {/*  <Text style = {styles.textDetails}>134</Text> */}
                </View>
              
                 <View>
                    <TouchableOpacity style ={styles.btnDeletePhoto} onPress = {() => setModalVisible(true)}>
                        <Text>Elminar</Text>
                    </TouchableOpacity> 
                </View>

            </View>
            <Text style = {{color: "white",fontSize: 20, margin: 15}}>Descripción</Text>
            
                <TextInput
                    style={styles.input}
                    placeholder=""
                    placeholderTextColor="black"
                    value={description}
                    onChangeText={setDescription}
                />
            
            <TouchableOpacity style ={styles.btnSave} onPress = {() => updateImage()}>
                <Text>Guardar</Text>
            </TouchableOpacity> 

            {
                visibleModal
                ?
                    <ComponentModal />
                :   null
            }
            
        </ScrollView>
    )   
}

export default EditImage

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
    btnSave: {
        marginTop: 30,
        borderRadius: 20,
        backgroundColor: "rgb(155, 240, 94)",
        padding: 10,
        width: 80,
        marginLeft: width * 0.4,
        marginBottom: 80
    },
    btnDeletePhoto: {
        marginTop: 30,
        borderRadius: 20,
        backgroundColor: "rgb(240, 111, 94)",
        padding: 10,
        width: 80,
    },
    containerDescription: {
        padding: 10,
        borderRadius: 20,
        margin: 10,
        backgroundColor: "rgba(255, 255, 255, 0.86)",
        marginBottom: 100
    },
    input: {
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: "white",
        width: width * 0.8,
       
        paddingLeft: 15,
        fontSize: 17,
        marginBottom: 40
    },
      modalBackground: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10
    },
    textModal: {
        margin: 15
    },
})