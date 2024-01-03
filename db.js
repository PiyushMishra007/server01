import mongoose from "mongoose";
const connection=async ()=>{
    const URL='mongodb+srv://piyushmishrasushma:G9O9afindRviINfd@cluster0.penxhpw.mongodb.net/'
    try{
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("successfully connected")
    }
    catch(error)
    {
        console.log("unabale to connect",error)
    }
};
export default connection