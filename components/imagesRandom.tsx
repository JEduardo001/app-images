import {StyleSheet,View,Text,TouchableOpacity,Image, FlatList} from 'react-native'
import { RandomImage } from '../types'
import TarjetImage from './tarjetImage'

const ImagesRandom = ({item}: {item: RandomImage[]}) => {
    return (
        <View style = {styles.containerImagesRandom}>
            <FlatList 
                data={item}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <TarjetImage item={item}/>}
                numColumns={2}
                scrollEnabled={false}
            />
        </View>
    )
}

export default ImagesRandom

const styles = StyleSheet.create({
    containerImagesRandom: {
        marginTop: 50,
        backgroundColor: "black",
        width: "100%"
    },
})