import mongoose from 'mongoose'


async function connectDB(){
    try {
        mongoose.connect('mongodb://localhost:27017/test')
        console.log('connect successfully')
        
    } catch (error) {       
        console.log(error)
    }

}

export default connectDB