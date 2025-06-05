import CategoriaFoto, { RandomImage } from "../types";

export const categories: CategoriaFoto[] = [
    {
        _id: '1',
        name: 'Espacio',
        imageUrl: 'https://imgs.search.brave.com/H18aCc6RhQMW-9gbb-YoYmDmsoCxAH3uX6ZcPTPy0-Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY5LzcyLzAy/LzM2MF9GXzU2OTcy/MDIzN181OHJob1Fv/TWp4eUIwUUNlWFFL/ME9WVUEwcU5vZ1Rt/cS5qcGc',
        gifUrl: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWVtMmNlaDJ6a2d5cTg3eWNoOHQ3NzY2cXY4cWZwZHQ0MXJudHVvYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sJvz8Qnfly3BOuotGx/giphy.gif"
    },
    {
        _id: '2',  
        name: 'Naturaleza',
        imageUrl: 'https://imgs.search.brave.com/QDUPl0yfXwtEkhDyA6thfot4VVm15Cx3EONv6tHDXzA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzE1LzQyLzQ0/LzM2MF9GXzEwMTU0/MjQ0NTNfNDlDUm9H/Y0FkN2Z5Wkd4VUx1/N1JYYXJnTHE2SXlL/WHkuanBn',
        gifUrl: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGd5NjdmdmIzNW5kZ29yM3kwbjNya2Z2c2w5bnVpd3pxc3Rtcjh0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12qHWnTUBzLWXS/giphy.gif"
    },
    {
        _id: '3',
        name: 'Carros',
        imageUrl: 'https://imgs.search.brave.com/LYg0ri_Imc5omAuydGHXtBcWEcKTyuKuA4PF87sO_ok/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGV2b3JlY29sbGVj/dGlvbi5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMDQv/TGFtYm9yZ2hpbmkt/QXZlbnRhZG9yLVNW/Si1Sb2Fkc3Rlci00/LTEwMjR4NzY4Lmpw/Zw',
        gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWM2YWo2dGM2bnhuNDB1Z2JhYjlrZTI5cDluZjZmdm95OG1idTFvZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6swcfDQHr3UTm/giphy.gif'
    },
    {
        _id: '4',
        name: 'Arquitectura',
        imageUrl: 'https://imgs.search.brave.com/xur2erVn_o9DYQM7oVAb2uCx735rtfxquQVRoBCo48A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9ybWF0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvQnJvd25f/YnVpbGRpbmcuanBn',
        gifUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmVzOTc1MHY5YTc5dHJ0cnBheWFyZHp6eHE1azR2enZlNGE3YmNtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/18NQ6eJEert9PhTYl4/giphy.gif'
    },
    {
        _id: '5',
        name: 'Animales',
        imageUrl: 'https://imgs.search.brave.com/81Gk4fXS1qGHt8o5Jw9R_ZpBEjpX38AhN2K_WxV0JsM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9iYWJ5/LWFuaW1hbHMtYWxw/YWNhLTY1ZjliYTIw/ZDFjNzQuanBnP2Ny/b3A9MC42NjI5MDU1/MDA3MDUyMTg2eHc6/MXhoO2NlbnRlcix0/b3AmcmVzaXplPTk4/MDoq',
        gifUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXF4NWZ0NWY0bThsbHgwNW9zcDdmNXN1NXlnaHg4M2pqZ285aXdidSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/E8BKRmebpiire/giphy.gif'
      },
]

export const randomImages: RandomImage[] = [
    {
      id: '1',
      nombre: 'Espacio',
      imageUrl: 'https://imgs.search.brave.com/H18aCc6RhQMW-9gbb-YoYmDmsoCxAH3uX6ZcPTPy0-Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzY5LzcyLzAy/LzM2MF9GXzU2OTcy/MDIzN181OHJob1Fv/TWp4eUIwUUNlWFFL/ME9WVUEwcU5vZ1Rt/cS5qcGc',
    },
    {
      id: '2',
      nombre: 'Naturaleza',
      imageUrl: 'https://imgs.search.brave.com/QDUPl0yfXwtEkhDyA6thfot4VVm15Cx3EONv6tHDXzA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzE1LzQyLzQ0/LzM2MF9GXzEwMTU0/MjQ0NTNfNDlDUm9H/Y0FkN2Z5Wkd4VUx1/N1JYYXJnTHE2SXlL/WHkuanBn',
    },
    {
      id: '3',
      nombre: 'Carros',
      imageUrl: 'https://imgs.search.brave.com/LYg0ri_Imc5omAuydGHXtBcWEcKTyuKuA4PF87sO_ok/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bGV2b3JlY29sbGVj/dGlvbi5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMDQv/TGFtYm9yZ2hpbmkt/QXZlbnRhZG9yLVNW/Si1Sb2Fkc3Rlci00/LTEwMjR4NzY4Lmpw/Zw',
    },
    {
      id: '4',
      nombre: 'Arquitectura',
      imageUrl: 'https://imgs.search.brave.com/xur2erVn_o9DYQM7oVAb2uCx735rtfxquQVRoBCo48A/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9ybWF0LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvQnJvd25f/YnVpbGRpbmcuanBn',
    },
    {
      id: '5',
      nombre: 'Animales',
      imageUrl: 'https://imgs.search.brave.com/81Gk4fXS1qGHt8o5Jw9R_ZpBEjpX38AhN2K_WxV0JsM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9iYWJ5/LWFuaW1hbHMtYWxw/YWNhLTY1ZjliYTIw/ZDFjNzQuanBnP2Ny/b3A9MC42NjI5MDU1/MDA3MDUyMTg2eHc6/MXhoO2NlbnRlcix0/b3AmcmVzaXplPTk4/MDoq',
    },
    {
        id: '6',
        nombre: 'Carros',
        imageUrl: 'https://imgs.search.brave.com/gEXS0rvJ1r_Rvsfiae2m4c1Fd348kif7PpSGTAaa534/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS81/ZWM4NTUyMGM0ZGZm/ZjAzNGIwMzZiZTIv/NjY0ZTQ1YjY1ZDE4/NWNiNjk1MGM1MjQ5/X3RvcC1mdWVsLWVm/ZmljaWVudC1zcG9y/dHMtY2Fyc19tYWlu/LndlYnA',
    },
    {
        id: '7',
        nombre: 'Animales',
        imageUrl: 'https://imgs.search.brave.com/IDxGTF6FhXLRx-5EIhrqMk8Bb6cuwlNcERNso03BOwY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTcw/MDQ4ODMwL3Bob3Rv/L2xhdWdoaW5nLXpl/YnJhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz12SnRNVkQ3/bG8zYjh1MDVzNmxv/ZGxkeUFmRHZ6TTBQ/NUtQYjYxLWhkcXdV/PQ',
    },
    {
        id: '8',
        nombre: 'Naturaleza',
        imageUrl: 'https://imgs.search.brave.com/k0qIgLtAssyeDLwFYdNuVJdu_DT4htfscjLTuQNVP8Q/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE3/MzczMzY0MC9lcy9m/b3RvL2Jvc3F1ZS12/ZXJkZS5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9a3BzUUtW/NVVSMnE4M3NTUktQ/TGQtM3lfMVhoTjdf/YjI1ek5Od0tBRkV2/bz0',
    },

];

export const  categoriesDefault = [
  
  require("../assets/tecnologia.jpg"),
  require("../assets/deportes.jpg"),
  require("../assets/comida.jpg"),
  
]
export const  categoriesDefaultData = [
  {
    id: "684112384d17950d2b5c62f3",
    name: "Tecnologia"
  },
  {
    id: "684112384d17950d2b5c62f5",
    name: "Cocina"
  },
  {
    id: "684112384d17950d2b5c62f4",
    name: "Deportes"
  }
 
]

