import image from './image.jpg';
import './index.scss';

var img = document.createElement('img');
img.src = image;
img.classList.add('img');
document.body.append(img);
