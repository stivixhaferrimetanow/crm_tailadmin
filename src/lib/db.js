import mongoose from 'mongoose'


const connect = async () => {
  
    if(mongoose.connections[0].readyState) return;

    try{
        
        await mongoose.connect('mongodb+srv://stivimetanow:XwGopksKM2kVgSjH@cluster0.pdlbhvy.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 30000 
        });
        console.log('DB connected')
    }catch(error){
        console.log('DB not connected' , error)
    }
}


export default connect