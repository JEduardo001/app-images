type CategoriaFoto = {
    _id: string;
    name: string;
    imageUrl: string;
    gifUrl: string
};

export type RandomImage = {
    id: string;
    nombre: string;
    imageUrl: string;
}

export type ImageDetails = {
  _id: string;
  userId: string;
  categoryId: string;
  imageUrl: string;
  likes: number;
  likedBy: string[]; 
  description: string | null;
  createdAt: string; 
};



export default CategoriaFoto
  