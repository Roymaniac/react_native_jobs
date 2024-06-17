export const checkImageURL = (url) => {
    if(!url) return false;
    const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp|svg)$', 'i');
    return pattern.test(url) ? true : url;
}