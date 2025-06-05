import { useEffect, useState } from 'react';
import {StyleSheet,View,Text,Image,TextInput,TouchableOpacity, Dimensions,SectionList,ScrollView, Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import {categoriesDefaultData} from "../constants/index"
import {createWallpaper} from "../services/api"
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const UploadImage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [id,setId] = useState('');
    const [description, setDescription] = useState<string>('');


    useEffect(() => {
         const getDataUser = async () => {
            try {
                const id = await AsyncStorage.getItem('id');
                if (id !== null) {
                   setId(id)

                }else{
                  console.log("No hay datos del usuario en asyngStorage")
                }
            } catch (e) {
                console.error('Error al obtener los datos del usuario de asyng storage:', e);
            }
        };
        getDataUser()
    },[])

    const handleUploadWallpaper = async () => {
        if (!image || !selectedCategory || selectedCategory == "") {
          Alert.alert('Porfavor Selecciona una imagen y una categoría');
          return;
        }
    
        //setIsLoading(true);
        try {
          const formData = new FormData();
          formData.append('userId', id);
          formData.append('categoryId', selectedCategory);
          formData.append('description', description);

          //formData.append('description', wallpaperDescription);
    
          const fileInfo = await FileSystem.getInfoAsync(image);
          const fileType = fileInfo.uri.split('.').pop();
    
          formData.append('image', {
            uri: image,
            name: `wallpaper.${fileType}`,
            type: `image/${fileType}`,
          }as unknown as Blob);
    
          const responseCreateWallpaper = await createWallpaper(formData);
          console.log("respuesta crear wallpaper ",responseCreateWallpaper.status)
        /*   const res = await getWallpapersByUser(user._id);
          setWallpapers(res.data);
          setShowWallpaperForm(false);
          setWallpaperImage(null); */
          Alert.alert('Éxito', 'Wallpaper subido correctamente');
        } catch (err: any) {
          Alert.alert('Error', err.response?.data?.error || 'Error al subir el wallpaper');
        } finally {
          //setIsLoading(false);
        }
      };
   
  const pickImage = async () => {
    // Pide permisos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Se requieren permisos para acceder a la galería.');
      return;
    }

    // Abre la galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


    return (
        <ScrollView style ={styles.container}>
           {
            image 
             ?
                <Image source={{ uri: image }} style={styles.image} />
             :
                <Image
                    source={require('../assets/noImg.png')}
                    style={styles.imageNoImage}
                />
           }
           <TouchableOpacity onPress={() => pickImage()}  style = {styles.btnSelectImage}>
            <Text>Seleccionar imagen</Text>
           </TouchableOpacity>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe una descripción"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4} 
                textAlignVertical="top" 
            />
           <Text style = {[styles.text, {fontSize: 30, marginTop: 40}]}>Categorías</Text>
          
           <View style={styles.containerCategories}>
                {categoriesDefaultData.map((cat, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.row}
                        onPress={() => {
                            setSelectedCategory(cat.id)
                            setSelectedIndex(index)
                        }}
                        activeOpacity={0.7}
                    >
                    <View style={[styles.circle, selectedIndex === index && styles.circleSelected]} />
                    <Text style={styles.textCategories}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
           {/* <SectionList
                 scrollEnabled={false}
                style={{marginTop: 30}}
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Text style = {[styles.text, {marginLeft: 20}]}>{item}</Text>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ fontWeight: 'bold', marginLeft: 10, fontSize: 18, color: "white" }}>{title}</Text>
                )}
            /> */}

            <View style = {{width: "100%", alignItems: "center"}}>
                <TouchableOpacity onPress={() => handleUploadWallpaper()} style = {styles.btnUploadImage}>
                    <Text>Subir imagen</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default UploadImage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 50, 
    },
    image: {  
        height: height * 0.4,
        width: "100%",
        borderRadius: 30,
    },
    imageNoImage: {
        height: height * 0.4,
        width: "100%",
        borderRadius: 30,
        tintColor: "white"
    },
    btnSelectImage: {
        marginTop: 40,
        backgroundColor: "rgb(201, 92, 234)",
        borderRadius: 15,
        padding: 10,
        width: 120,
    },
    text: {
        color: "white"
    },
    btnUploadImage: {
        marginTop: 40,
        marginBottom: 100,
        backgroundColor: "rgb(201, 92, 234)",
        borderRadius: 15,
        padding: 10,
        width: 120,
    },
    containerCategories: {
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#777',
        marginRight: 10,
    },
    circleSelected: {
        backgroundColor: '#3aff00',
        borderColor: '#40b01f',
    },
    textCategories: {
        fontSize: 16,
        color: "white"
    },
    label: {
        margin: 15,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: '600',
        color: "white"

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 14,
        backgroundColor: '#fff',
    },

})