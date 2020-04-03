import milk from "../assets/milky-way.jpeg";
import bluePurple from "../assets/blue-and-purple.jpg";
import blueRed from "../assets/blue-and-red.jpg";
import closeUp from "../assets/close-up-photo.jpg";
import snowTop from "../assets/snow-top.jpg";
import sunsetStorm from "../assets/sunset-storm.jpg";

const backgrounds = [milk, bluePurple, blueRed, closeUp, snowTop, sunsetStorm];

const RandomBackground = () => {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
};

export default RandomBackground;
