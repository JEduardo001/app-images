import {View,Text,StyleSheet, TextInput,TouchableOpacity,Image, Modal, Button} from 'react-native'
import { useEffect, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import {categories} from '../constants/index'
import {loginUser} from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeDataAsyncStorage,validateEmail} from "../helpers/auth"
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Login = () => {
    const navigation = useNavigation<NavigationProp>()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [messageModal,setMessageModal] = useState('')
    const [showPassword,setShowPassword] = useState(false)

    const messageError = 'Ocurrió un problema. Asegurate de que los datos sean correctos'
   
    const genRandomColor = () => {
        return Math.floor(Math.random() * 249) + 1; 

    } 

    useEffect(() => {
       const validateUser = async () => {
            try {
                const value = await AsyncStorage.getItem('id');
                if (value !== null) {
                    console.log('Usuario logeado');
                    navigation.replace('home')
                }
            } catch (e) {
                console.error('Error leyendo dato:', e);
            }
        };
        validateUser()
 
    },[])

   const login = async () => {
        if (!email || !password) {
            console.log('Debes ingresar email y password');
            showModal('Debes ingresar email y password')
            return
        }
        if(!validateEmail(email)){
            showModal("Porfavor ingresa un email válido")
            return
        }
        
        const data = { email, password };

        try {
            const response = await loginUser(data);
            console.log('Login correcto:', response.data);
            if(response.data.message == "Login exitoso"){
                storeDataAsyncStorage(response.data.user)
                navigation.replace('home')

            }else{
                showModal(messageError)
            }
        } catch (error) {
            console.log('Error en login:', error);
            showModal(messageError)

        }
    };

    const showModal = (message: string) => {
        setMessageModal(message)
        setVisible(true)
    }

    const [visible, setVisible] = useState(false);
    
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
                        <Text style = {styles.textModal}>{messageModal}</Text>
                        <Button title="Aceptar" onPress={() => setVisible(false)} />
                    </View>
                    </View>
                </Modal>
            )
        }

    return (
        <View style = {styles.container}>
            {/* background login */}
            <View style = {{flex: 2, flexDirection: "row"}}>
                <Image source={{ uri: categories[0].imageUrl}} style = {{flex: 3}}/>
                <Image source={{ uri: categories[2].imageUrl}} style = {{flex: 4}}/>
                <Image source={{ uri: categories[4].imageUrl}} style = {{flex: 5}}/>
            </View>
            <View style = {{flex: 3,}}>
                <Image source={{ uri: categories[3].imageUrl}} style = {{flex: 5}}/>
                <Image source={{ uri: categories[1].imageUrl}} style = {{flex: 7}}/>
                <Image source={{ uri: categories[0].imageUrl}} style = {{flex: 2,}}/>
            </View>
            <View style = {{flex: 4, flexDirection: "row"}}>
                <Image source={{ uri: categories[3].imageUrl}} style = {{flex: 1}}/>
                <Image source={{ uri: categories[1].imageUrl}} style = {{flex: 2}}/>
                <Image source={{ uri: categories[0].imageUrl}} style = {{flex: 5,}}/>
            </View>
            <View style = {{flex: 5}}>
                <Image source={{ uri: categories[3].imageUrl}} style = {{flex: 5}}/>
                <Image source={{ uri: categories[1].imageUrl}} style = {{flex: 5}}/>
                <Image source={{ uri: categories[0].imageUrl}} style = {{flex: 5,}}/>
            </View>
            <View style = {styles.contentScreen}>
                <Text style = {styles.title}>SABIRA</Text>
                <Text style = {styles.subtitle}>Login</Text>
                <Text style = {styles.inputTitle}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style = {styles.inputTitle}>Contraseña</Text>
                <View style = {{flexDirection: "row", alignItems: "center"}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="black"
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style ={styles.btnShowPassword}>
                        <Ionicons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />                   
                     </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => login()} style ={styles.btn}>
                    <Text style ={styles.subtitle}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <Text style = {[styles.inputTitle, {marginTop: 50}]}>¿ Aún no tienes cuenta ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('register', {})} style ={styles.btn}>
                    <Text style ={styles.subtitle}>Regístrate</Text>
                </TouchableOpacity>
                {
                    visible
                    ?
                    <ComponentModal />
                    : null
                }
            </View>
            
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
        backgroundColor: 'black'
    },
    title: {
        fontSize: 45,
        color: "#00FFFF",
        marginTop: "20%"
    },
    subtitle: {
        color: "black",
        fontSize: 15,
    },
    inputTitle: {
        color: "#00FFFF",
        marginTop: 20
    },
    input: {
        borderRadius: 25,
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "white",
        padding: 10,
        width: "60%"
    },
    btn: {
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 7
    },
    contentScreen: {
        width: "100%",
        height: "100%",
        position: "absolute",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
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
    btnShowPassword: {
        justifyContent: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        marginLeft: 10
    }
})