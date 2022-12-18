const API_KEY = "NxmoiyGhG7hNBxNS2pffT6ps1F7kj0w34QpoqqtP";
// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const marspic = document.querySelector("#marspic")

async function getImage(date) {
    try {
      const response = await fetch(
        `http://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=NAVCAM&api_key=${API_KEY}`
      );
    //   console.log(response);
      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.statusText}`);
      }
      const data = await response.json();
      let img = (data.photos[9].img_src);
      console.log(img);
      marspic.src = img
    } catch (error) {
      console.error(error);
      return null;
    }
}

getImage("2016-12-12")

  