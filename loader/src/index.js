import image from './image.jpg';
import style from  './index.scss';

var img = document.createElement('img');
img.src = image;
img.classList.add(style.img);
document.body.append(img);
