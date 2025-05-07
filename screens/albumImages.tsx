import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import CategoriaFoto from '../types';
import RootStackParamList from '../types/navigation';
import TarjetImage from '../components/tarjetImage';
import { randomImages } from '../constants';
import { Ionicons } from '@expo/vector-icons';


type AlbumImagesRouteProp = RouteProp<RootStackParamList, 'albumImages'>;

const AlbumImages = () => {
  const route = useRoute<AlbumImagesRouteProp>();
  const { dataCategory } = route.params;

  useEffect(() => {
    console.log("jplaaa", dataCategory.id);
  }, []);

  return (
    <View style = {styles.container}>
        <FlatList
            data={randomImages}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <TarjetImage item={item}/>}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
                <>
                <Image
                    source={{ uri: dataCategory.gifUrl }}
                    style={styles.image}
                />
                <View style={styles.containerInfo}>
                    <Text style={styles.textInfo}>{dataCategory.nombre}</Text>
                    <View style = {styles.containerPopularity}>
                      <Ionicons name="heart" size={28} color="white" />
                      <Text style={styles.textInfo}>52.4 k!</Text>
                    </View>
                </View>

                <Text style={styles.textMoreImages}>Más imágenes</Text>
                </>
            }
        />
    </View>
  );
};

export default AlbumImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {  
    height: 400,
    width: "100%",
    borderRadius: 30,
  },
  containerInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    marginTop: "85%",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent : "space-between"
  },
  containerPopularity: {
    flexDirection: "row"
  },
  textInfo: {
    color: "white",
    fontSize: 20,
  },
  textMoreImages: {
    fontSize: 25,
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 40,
    color: "white",
  },
});
