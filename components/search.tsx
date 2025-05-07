import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

const SearchComponent = () => {
    const [text,setText] = useState('')
    return  (
        <View style = {styles.container}>
            <TextInput
                style={styles.search}
                placeholder="Encuentra una categoria.."
                placeholderTextColor="black"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity style = {styles.btnSearch}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent


const styles = StyleSheet.create({
    container: {
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
    }
})