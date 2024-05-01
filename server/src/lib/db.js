import mongoose from 'mongoose'


const connect = async () => {
  
    if(mongoose.connections[0].readyState) return;

    try{
        
        await mongoose.connect('mongodb+srv://johnvanderbilttop9:4thxKzpvNmEnsgzy@cluster0.avh6wtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {});
        console.log('DB connected')
    }catch(error){
        console.log('DB not connected')
    }
}


export default connect