import {StyleSheet,View,Text,FlatList, ScrollView} from "react-native"
import CategoriaFoto, { RandomImage } from "../types";
import TarjetCategory from "../components/tarjetCategory";
import SearchComponent from "../components/search";
import TarjetImage from '../components/tarjetImage'
import { randomImages,categories } from "../constants";
import ImagesRandom from "../components/imagesRandom";

const Home = () => {

    return (
        <ScrollView style ={styles.container}>
            <Text style = {styles.textTittle}>Sabira</Text>
            <SearchComponent />
            <View>
                <FlatList
                    data={categories}
                    horizontal
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item}) => <TarjetCategory item={item}/>}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            <ImagesRandom item={randomImages}/>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(0, 0, 0)",
        paddingTop: 50,
        
    },
    textTittle: {
        fontSize: 35,
        padding: 15,
        color: "rgb(0, 234, 255)"
    },
   
})