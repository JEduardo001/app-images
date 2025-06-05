import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import RootStackParamList from '../types/navigation';
import { ImageDetails } from "../types/index";
import { getIdUser } from "../helpers/auth";

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const TarjetImage = ({ item }: { item: ImageDetails }) => {
  const navigation = useNavigation<NavigationProp>();
  const [idUser, setIdUser] = useState<string | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getIdUser();
        setIdUser(id);
      } catch (error) {
        console.error('Error fetching user id:', error);
        setIdUser(null); 
      } finally {
        setLoading(false);
      }
    };
    fetchUserId();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!idUser) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No se pudo cargar el usuario</Text>
      </View>
    );
  }

  const isOwner = item.userId === idUser;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(isOwner ? 'editImage' : 'detailImage', { dataImage: item })}
      style={styles.cardImage}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default TarjetImage;

const styles = StyleSheet.create({
  cardImage: {},
  image: {
    height: 200,
    width: width / 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
