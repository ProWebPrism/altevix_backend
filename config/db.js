const mongoose = require('mongoose')

const dbConnect = async () => {
 try {
    await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true  
    })
    console.log('Connected to mongoDb');
 } catch (error) {
    console.error(error);
    
 }
}
module.exports = dbConnect