import {StyleSheet,View,Text,TouchableOpacity,Image, Dimensions} from 'react-native'
import { RandomImage } from '../types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../types/navigation';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const TarjetImage = ({item}: {item: RandomImage}) => {
    const navigation = useNavigation<NavigationProp>()
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate('detailImage', {dataImage: item})} style = {styles.cardImage}>
            <Image
                source={{uri: item.imageUrl}}
                style={styles.image}
            />
        </TouchableOpacity>
    )
}
export default TarjetImage

const styles = StyleSheet.create({
    cardImage: {
        
    },
    image: {
        height: 200,
        width: width / 2,
        //borderWidth: 1,
        //borderColor: "black"
    }
})