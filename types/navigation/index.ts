import CategoriaFoto, { RandomImage } from "..";

type RootStackParamList = {
    home: undefined;
    albumImages: { dataCategory: CategoriaFoto };
    detailImage: { dataImage: RandomImage}
};
export default RootStackParamList