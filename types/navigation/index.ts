import CategoriaFoto, { ImageDetails } from "..";

type RootStackParamList = {
    home: undefined
    albumImages: { dataCategory: CategoriaFoto,index:number }
    detailImage: { dataImage: ImageDetails}
    login: {}
    register: {}
};
export default RootStackParamList