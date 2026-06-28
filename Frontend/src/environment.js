let IS_PROD = import.meta.env.PROD;


const server = IS_PROD?
  "https://rentalapp-l7zy.onrender.com"  :
     "http://localhost:5000"
   


export default server;