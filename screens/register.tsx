import {View,Text,StyleSheet, TextInput,TouchableOpacity,Modal,Button} from 'react-native'
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import {registerUser} from "../services/api"
import {validateEmail} from "../helpers/auth"
import { Ionicons } from '@expo/vector-icons';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Register = () => {
    const navigation = useNavigation<NavigationProp>()
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const [passwordRepeat,setPasswordRepeat] = useState('')
    const [showPassword,setShowPassword] = useState(false)

    const [visible, setVisible] = useState(false);
    const [messageModal, setMessageModal] = useState("");

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

        const register = async () => {
            if(password != passwordRepeat){
                showModal("Las contraseñas no coinciden. Porfavor verificalas")
                return
            }
            if(!password || !email){
                showModal("Porfavor rellena los campos")
                return
            }
            if(!validateEmail(email)){
                showModal("Porfavor ingresa un email válido")
                return
            }

            const data = { email, password, username };
            
            try {
                const response = await registerUser(data);
                if(response.data.msg == "Usuario registrado"){
                    showModal("Cuenta creada con exito")

                }else{
                    console.log("Error al registrarte. Error: ", response)
                    showModal("Error al registrarte. Email ya registrado, usa uno diferente")
                }
            } catch (error) {
                console.log('Error al registrarse:', error);
                showModal("Error al registrarte. Vuelve a intentarlo")

            }

        }

    const showModal = (message: string) => {
        setMessageModal(message)
        setVisible(true)
    }
    return (
        <View style = {styles.container}>
            <Text style = {styles.subtitle}>Registro</Text>
            <Text style = {styles.inputTitle}>Nombre de usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="black"
                value={username}
                onChangeText={setUsername}
            />
            <Text style = {styles.inputTitle}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email."
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
            />
            <Text style = {styles.inputTitle}>Contraseña</Text>
            <View style = {{flexDirection: "row",alignItems: "center"}}>
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
           
            <Text style = {styles.inputTitle}>Repetir contraseña</Text>

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="black"
                secureTextEntry={showPassword}
                value={passwordRepeat}
                onChangeText={setPasswordRepeat}
            />
           
            <ComponentModal />
            <TouchableOpacity onPress={() => register()} style ={styles.btn}>
                <Text>Registrar</Text>
            </TouchableOpacity>
          
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        backgroundColor: 'black'
    },
    title: {
        fontSize: 30,
        color: "#00FFFF"
    },
    subtitle: {
        marginTop: 50,
        color: "#00FFFF",
        fontSize: 24
    },
    inputTitle: {
        marginTop: 30,
        color: "#00FFFF",
    },
    input: {
        borderRadius: 25,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        width: "60%"
    },
    btn: {
        marginTop: 50,
        backgroundColor: "rgb(125, 202, 222)",
        borderRadius: 20,
        padding: 7,
        width: 100,
        alignItems:"center"
    },
    modalBackground: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer: {
        width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10
    },
    btnShowPassword: {
        justifyContent: "center",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 10,
        marginLeft: 10
    }
})