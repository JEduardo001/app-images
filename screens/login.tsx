import {View,Text,StyleSheet, TextInput,TouchableOpacity,Image} from 'react-native'
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import {categories} from '../constants/index'

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Login = () => {
    const navigation = useNavigation<NavigationProp>()
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')
    const genRandomColor = () => {
        return Math.floor(Math.random() * 249) + 1; 

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
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => navigation.replace('home')} style ={styles.btn}>
                    <Text style ={styles.subtitle}>Iniciar Sesión</Text>
                </TouchableOpacity>
                <Text style = {[styles.inputTitle, {marginTop: 50}]}>¿ Aún no tienes cuenta ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('register', {})} style ={styles.btn}>
                    <Text style ={styles.subtitle}>Regístrate</Text>
                </TouchableOpacity>
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
    }
})