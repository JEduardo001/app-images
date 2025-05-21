import {View,Text,StyleSheet, TextInput,TouchableOpacity,Image, Dimensions} from 'react-native'
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';

const { width, height } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const Profile = () => {
    const navigation = useNavigation<NavigationProp>()
    
    const [nameUser,setNameUser] = useState('');
    const [image, setImage] = useState<string | null>(null);

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
        <View style = {styles.container}>
            <TouchableOpacity onPress={() => navigation.replace('login',{})} style ={styles.btnCloseSession}>
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
                value={nameUser}
                onChangeText={setNameUser}
            />
            <TouchableOpacity style ={styles.btnSave}>
                <Text>Guardar</Text>
            </TouchableOpacity> 
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
        height: 30,
        paddingLeft: 15
        
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
    }
})