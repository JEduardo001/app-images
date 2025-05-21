import CategoriaFoto, { RandomImage } from "..";

type RootStackParamList = {
    home: undefined
    albumImages: { dataCategory: CategoriaFoto }
    detailImage: { dataImage: RandomImage}
    login: {}
    register: {}
};
export default RootStackParamList