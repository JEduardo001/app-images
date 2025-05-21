import {View,Text,StyleSheet, TextInput,TouchableOpacity,Modal,Button} from 'react-native'
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Register = () => {
    const navigation = useNavigation<NavigationProp>()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
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
                <Text>Ya tienes cuenta!</Text>
                <Button title="Iniciar Sesión" onPress={() => {setVisible(false); navigation.replace('login',{})}} />
            </View>
            </View>
        </Modal>
        )
    }
    return (
        <View style = {styles.container}>
            <Text style = {styles.subtitle}>Registro</Text>
            <Text style = {styles.inputTitle}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email."
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
            />
            <Text style = {styles.inputTitle}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
            />
              <Text style = {styles.inputTitle}>Repetir contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
            />
              <Text style = {styles.inputTitle}>Nombre de usuario</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
            />
            <ComponentModal />
            <TouchableOpacity onPress={() => setVisible(true)} style ={styles.btn}>
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
    }
})