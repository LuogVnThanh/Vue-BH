// http://127.0.0.1:8000/storage/ 
export function getProductImage(imagePath) { 
    const defaultImage = "https://bulma.io/assets/images/placeholders/1280x960.png"
    const baseUrl = 'http://127.0.0.1:8000/storage/'
    return imagePath? baseUrl + imagePath: defaultImage;
}