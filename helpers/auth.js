import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataAsyncStorage = async (data) => {
  try {
    await AsyncStorage.setItem('id', data._id);
    await AsyncStorage.setItem('email', data.email);
    await AsyncStorage.setItem('username', data.username);
    if(data.profilePic != null){
     await AsyncStorage.setItem('profilePic', data.profilePic);

    }
   // await AsyncStorage.setItem('password', data.password);

    console.log('Dato guardado');
  } catch (e) {
    console.error('Error guardando dato:', e);
  }
};

export const closeSession = async () => {
    try {
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('username');
        await AsyncStorage.removeItem('profilePic');
        await AsyncStorage.removeItem('password');

        console.log('Dato eliminado');
    } catch (e) {
        console.error('Error eliminando dato:', e);
    }
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
