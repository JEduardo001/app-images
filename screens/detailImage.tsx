import { RouteProp, useRoute } from '@react-navigation/native';
import {StyleSheet,View,Text,Image, Dimensions,TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import RootStackParamList from '../types/navigation';

type AlbumImagesRouteProp = RouteProp<RootStackParamList, 'detailImage'>;
const { width, height } = Dimensions.get('window');

const DetailImage = () => {
    const route = useRoute<AlbumImagesRouteProp>();
    const { dataImage } = route.params;
    
    return (
        <View style = {styles.container}>
            <Image
                source={{ uri: dataImage.imageUrl }}
                style={styles.image}
            />
            <View style ={styles.containerMenu}>
                <Text style = {styles.textName}>caca</Text>
                <View style = {styles.containerDetails}>
                    <TouchableOpacity>
                        <Ionicons name="heart" size={32} color="red" />
                    </TouchableOpacity>
                    <Text style = {styles.textDetails}>1.7 k!</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Ionicons name="download-outline" size={32} color="blue" />
                    </TouchableOpacity>
                    <Text style = {styles.textDetails}>134</Text>
                </View>

            </View>
        </View>
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

    }
})