import {View,Text,StyleSheet, TextInput,TouchableOpacity,Image, Dimensions, Modal, Button, Alert, FlatList, ScrollView} from 'react-native'
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {closeSession, storeDataAsyncStorage} from "../helpers/auth"
import {updateUser,uploadProfilePic,getWallpapersByUser} from "../services/api"
//import profileNoImage from '../assets/noProfileImg.webp'
import { Asset } from 'expo-asset';
import { ImageDetails } from '../types';
import TarjetImage from '../components/tarjetImage';

const { width, height } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

type RNFile = {
  uri: string;
  name: string;
  type: string;
};
const Profile = () => {
    const navigation = useNavigation<NavigationProp>()
    const [id,setId] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [profilePic, setProfilePic] = useState<any>(null);
    const [uriNewImageProfile, setUriNewImageProfile] = useState<any>(null);
    const [imagesByUser, setImagesByUser] = useState<ImageDetails[]>([]);

    const [visible, setVisible] = useState(false);
    const [messageModal, setMessageModal] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
       const getDataUser = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const email = await AsyncStorage.getItem('email');
                const username = await AsyncStorage.getItem('username');
                const profile = await AsyncStorage.getItem('profilePic');

                if(profile != null){
                    setProfilePic(profile)
                }
                if (email !== null && username !== null && id !== null) {
                   setUsername(username)
                   setEmail(email)
                   setId(id)

                }else{
                  console.log("No hay datos del usuario en asyngStorage")
                }
            } catch (e) {
                console.error('Error al obtener los datos del usuario de asyng storage:', e);
            }
        };
        getDataUser()
        
        getImagesByUser()
    },[])

    const getImagesByUser = async ()  => {
        try {
        const id = await AsyncStorage.getItem('id');

        const responseGetCategories = await getWallpapersByUser(id)
        //console.log("hola  ",responseGetCategories.data)
        if(responseGetCategories.data != null){
            setImagesByUser(responseGetCategories.data)
        }

        //getWallpapersByUser(responseGetCategories.data)
        } catch (error) {
            console.log("Error al obtener las imagenes del usuario: ",error)
        }

    }

    const showModal = (message: string) => {
        setMessageModal(message)
        setVisible(true)
    }

    const saveDataUser = async () => {
        var uriNewImage
        if(uriNewImageProfile == null){
            //toma la uri de sin foto
            const asset = Asset.fromModule(require('../assets/noProfileImg.webp'));
            await asset.downloadAsync()  // Asegura que la imagen esté lista
       
            uriNewImage = asset.localUri; 
            //deleteProfilePic(email)
        }else{
            uriNewImage = uriNewImageProfile
        }
        //console.log("2222 ",uriNewImage)
        await uploadImage(uriNewImage);

        try {
            const password = await AsyncStorage.getItem('password');

           const response = await updateUser(email,username);

           if(response.data.msg == "Usuario actualizado"){
               storeDataAsyncStorage({
                   _id: id,
                   email: email,
                   username: username,
                   profilePic: profilePic

               })

               console.log("Datos actualizados")
               showModal("Información actualizada")
           }else{
               console.log('Ocurrio un problema al actualizar los datos del usuario',response.data.error);
               showModal("Ocurrío un problema, vuelve a intentarlo")

           }
       } catch (error) {
           console.log('Error al actualizar los datos del usuario:', error);
           showModal("Ocurrío un problema, vuelve a intentarlo")

       } 
    }
    const pickImage = async () => {
        // Pedir permisos para acceder a la galería
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos necesarios', 'Necesitamos acceso a tu galería para cambiar la foto de perfil');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri)
            setUriNewImageProfile(result.assets[0].uri)
        //await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uriNewImage: any) => {
     setIsLoading(true);
        try {
            console.log("uri: ",uriNewImage)
            // Convertir la imagen a formato que pueda ser enviado
            const fileInfo = await FileSystem.getInfoAsync(uriNewImage);
            const fileType = fileInfo.uri.split('.').pop();

            const formData = new FormData();

            formData.append('image', {
                uri: uriNewImage,
                name: `profile.${fileType}`,
                type: `image/${fileType}`,
            } as unknown as Blob);

            const response = await uploadProfilePic(email, formData);
            
            setProfilePic(response.data.profilePic);

            Alert.alert('Éxito', 'Foto de perfil actualizada');
        } catch (err: any) {
            console.log(err);
            Alert.alert('Error', err.response?.data?.error || 'Error al actualizar la foto');
        } finally {
            setIsLoading(false);
        }
    };


    const ComponentModal = () => {
        return (
            <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text>{messageModal}</Text>
                <Button title="Aceptar" onPress={() => setVisible(false)} />
            </View>
            </View>
        </Modal>
        )
    }

    return (
        <ScrollView style = {styles.container}>
            <View style = {[styles.container,{alignItems: "center"}]}>
                <TouchableOpacity onPress={() => {
                        closeSession()
                        navigation.replace('login',{})
                    }} style ={styles.btnCloseSession}>
                        <Text style = {[styles.subtitle, {fontSize: 15}]}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                    <Text style = {styles.title}>Mi Perfil</Text>
                    {
                        profilePic 
                        ?
                            <Image source={{ uri: profilePic }} style={styles.image} />
                        :
                            <Image
                                source={require('../assets/noProfileImg.webp')}
                                style={styles.image}
                            />
                    }
                    <View style = {styles.containerBtnControllerPhoto}>
                        <TouchableOpacity onPress={() => pickImage()} style ={styles.btnChangePhoto}>
                            <Text style ={styles.subtitle}>Cambiar foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setProfilePic(null)
                            setUriNewImageProfile(null)
                            }} style ={styles.btnDeletePhoto}>
                            <Text style ={styles.subtitle}>Eliminar foto</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style = {[styles.inputTitle, {fontSize: 20}]}>Usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="black"
                        value={username}
                        onChangeText={setUsername}
                    />
                {/*  <Text style = {[styles.inputTitle, {fontSize: 20}]}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        placeholderTextColor="black"
                        value={email}
                        onChangeText={setEmail}
                    /> */}
                    <TouchableOpacity style ={styles.btnSave} onPress = {() => saveDataUser()}>
                        <Text>Guardar</Text>
                    </TouchableOpacity> 
            </View>

            <TouchableOpacity onPress = {() => getImagesByUser()} style = {styles.btnRefresh}>
                <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>
            <Text style = {[styles.title,{margin: 10, marginTop: 20}]}>Tus imagenes</Text>

            <View style = {styles.containerImagesRandom}>
                {
                    !imagesByUser || imagesByUser.length == 0
                    ? <Text style = {[styles.title,{textAlign: "center"}]}>Sin imagenes</Text>
                    :
                        <FlatList 
                            data={imagesByUser}
                            keyExtractor={item => item._id.toString()}
                            renderItem={({item}) => <TarjetImage item={item}/>}
                            numColumns={2}
                            scrollEnabled={false}
                        />

                }
               
            </View>
            {
                visible
                ? <ComponentModal />
                : null   
            }
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        //alignItems: "center",
        backgroundColor: 'black'
    },
    title: {
        fontSize: 24,
        color: "#00FFFF",
    },
    btnCloseSession: {
        width: "100%",
        alignItems: "flex-end",
        padding: 20,
        marginTop:40
    },
    subtitle: {
        color: "#00FFFF",
        fontSize: 15
    },
    inputTitle: {
        color: "#00FFFF",
        marginTop: 30
    },
    btnDeletePhoto: {
        borderRadius: 20,
        backgroundColor: "red",
        padding: 10    
    },
    input: {
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: "white",
        width: 150,
        height: 40,
        paddingLeft: 15,
        fontSize: 17
        
    },
    btnChangePhoto: {
        borderRadius: 20,
        backgroundColor: "rgb(43, 135, 188)",
        padding: 10
    },
    btnSave: {
        marginTop: 30,
        borderRadius: 20,
        backgroundColor: "rgb(155, 240, 94)",
        padding: 10
    },
    image: {
        borderRadius: 30,
        height: 150,
        width: 150,
        marginTop: 40

    },
   
    containerBtnControllerPhoto: {
        width: "100%",
        flexDirection: "row", 
        justifyContent: "space-around",
        marginTop: 40
    },
    modalBackground: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10
    },
    btnRefresh: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 9,
        marginLeft: 30,
        width: 45,
    },
     containerImagesRandom: {
        marginTop: 50,
        backgroundColor: "black",
        width: "100%",
        marginBottom: 50
    },
})