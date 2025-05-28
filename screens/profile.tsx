import {View,Text,StyleSheet, TextInput,TouchableOpacity,Image, Dimensions, Modal, Button} from 'react-native'
import { useState,useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {closeSession, storeDataAsyncStorage} from "../helpers/auth"
import {updateUser} from "../services/api"

const { width, height } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const Profile = () => {
    const navigation = useNavigation<NavigationProp>()
    const [id,setId] = useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const [messageModal, setMessageModal] = useState("");

    useEffect(() => {
       const getDataUser = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                const email = await AsyncStorage.getItem('email');
                const username = await AsyncStorage.getItem('username');
                
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
 
    },[])

    const showModal = (message: string) => {
        setMessageModal(message)
        setVisible(true)
    }

    const saveDataUser = async () => {
         try {
            const response = await updateUser(email,{username});
            if(response.data.message == "Usuario actualizado"){
                storeDataAsyncStorage({
                    _id: id,
                    email: email,
                    username: username
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
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => {
                closeSession()
                navigation.replace('login',{})
            }} style ={styles.btnCloseSession}>
                <Text style = {[styles.subtitle, {fontSize: 15}]}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <Text style = {styles.title}>Mi Perfil</Text>
            {
                image 
                ?
                    <Image source={{ uri: image }} style={styles.image} />
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
                <TouchableOpacity onPress={() => setImage(null)} style ={styles.btnDeletePhoto}>
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
            {
                visible
                ? <ComponentModal />
                : null   
            }
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
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
    }
})