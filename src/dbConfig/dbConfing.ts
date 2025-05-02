
import mongoose from "mongoose";

export async function connect(){

try {
  mongoose.connect(process.env.MONGO_URI!)
  const connection = mongoose.connection;

  connection.on('coonected',()=>{
    console.log('MOngoDB coonected successfully');
    
  })

  connection.on('error',(err) =>{
    console.log('MOngoDB connection error. Please make sure MongoDB is ruuning.'+ err);

    process.exit();
    
  })
  
} catch (error) {
  console.log('Sometong went wrong')
  console.log(error);
  

  
}

}