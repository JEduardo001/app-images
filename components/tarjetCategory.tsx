import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import CategoriaFoto from '../types'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import  RootStackParamList  from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const TarjetCategory = ({item}: {item: CategoriaFoto}) => {
    const navigation = useNavigation<NavigationProp>()

    return (
        <TouchableOpacity onPress={() => navigation.navigate('albumImages',{ dataCategory: item })} style = {styles.tarjetCategory}>
             <Image
                source={{ uri: item.gifUrl}}
                style={styles.image}
            />
            <View style = {styles.containerInfo}>
                <Text style = {styles.textInfo}>{item.nombre}</Text>
                <View style = {styles.containerPopularity}>
                    <Ionicons name="heart" size={20} color="red" />
                    <Text style = {styles.textInfo}>28.5k</Text>    
                </View>            
            </View>
        </TouchableOpacity>
    )
}

export default TarjetCategory

const styles = StyleSheet.create({
    tarjetCategory: {
        borderRadius: 15,
        width: 250,
        height: 150,
        margin: 10,
        backgroundColor: "white"

    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 15
    },
    containerInfo: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        marginTop: "40%",
        width: "100%",
        padding: 15,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    textInfo: {
        color: "white",
        fontSize: 15
    },
    containerPopularity: {
        flexDirection: "row",
        alignItems: "center"
    }
})