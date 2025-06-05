import {StyleSheet,View,Text,FlatList, ScrollView,TextInput,TouchableOpacity, Dimensions} from "react-native"
import CategoriaFoto, { RandomImage } from "../types";
import TarjetCategory from "../components/tarjetCategory";
import SearchComponent from "../components/search";
import TarjetImage from '../components/tarjetImage'
import { randomImages,categories } from "../constants";
import ImagesRandom from "../components/imagesRandom";
import { useState,useEffect } from 'react';
import {getCategories,getAllWallpapers} from "../services/api"
import { Ionicons } from '@expo/vector-icons';
import {ImageDetails} from "../types/index"
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get('window');
type ImageItem = {
  id: string;
  title: string;
  url: string;
};

const Home = () => {

    const [categories,setCategories] = useState()
    const [txtSearch,setTxtSearch] = useState("")
    const [idUser,setIdUser] = useState("")

    const [images, setImages] = useState<ImageDetails[]>([]);
    const [imagesBySearch, setImagesBySearch] = useState<ImageDetails[]>([]);

    useEffect(() => {
        if (txtSearch.trim() === '') {
        setImagesBySearch(images);
        } else {
            const filtered = images.filter(image =>
                image.description !== null &&
                image.description.toLowerCase().includes(txtSearch.toLowerCase())
            );

            setImagesBySearch(filtered);
        }
    }, [txtSearch, images]);

    useEffect(() => {
       const categoriesGet = async ()  => {
        try {
          
            const responseGetCategories = await getCategories()
            setCategories(responseGetCategories.data)
            //console.log("r  ",responseGetsCategories.data)
        } catch (error) {
            console.log("Error al obtener categorias: ",error)
        }

       }
       categoriesGet()
       
       getImages()
    },[])

    const getImages = async ()  => {
        try {
            const responseGetAllImages = await getAllWallpapers()
            //console.log("imagenes ",responseGetAllImages.data)
            setImages(responseGetAllImages.data)
        } catch (error) {
            console.log("Error al obtener todas las imagenes: ",error)
        }

    }

    return (
        <ScrollView style ={styles.container}>
            <Text style = {styles.textTittle}>Sabira</Text>
{/*             <SearchComponent /> */}
            <View style = {styles.containerSearch}>
                <TextInput
                    style={styles.search}
                    placeholder="Busca alguna imagen"
                    placeholderTextColor="black"
                    value={txtSearch}
                    onChangeText={setTxtSearch}
                />
                <TouchableOpacity style = {styles.btnSearch}>
                    <Ionicons name="search" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={categories}
                    horizontal
                    keyExtractor={item => item._id.toString()}
                    renderItem={({item,index}) => <TarjetCategory item={item}  index={index} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                />
            </View>

            <TouchableOpacity onPress = {() => getImages()} style = {styles.btnRefresh}>
                <Ionicons name="refresh" size={24} color="black" />
            </TouchableOpacity>

            {/* <ImagesRandom itseem={imsages}/> */}
            <View style = {styles.containerImagesRandom}>
                <FlatList 
                    data={imagesBySearch}
                    keyExtractor={item => item._id.toString()}
                    renderItem={({item}) => <TarjetImage item={item}/>}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
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
     containerImagesRandom: {
        marginTop: 50,
        backgroundColor: "black",
        width: "100%",
        marginBottom: 50
    },
     containerSearch: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 30,
        marginTop: 20
    },
    search:{
        backgroundColor: "white",
        borderRadius: 15,
        width: width * 0.6,
        height: 40,
        padding: 7,
        fontSize: 12,
    },
    btnSearch: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 9,
        marginLeft: 30
    },
    btnRefresh: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 9,
        marginLeft: 30,
        width: 45,
    }
   
})