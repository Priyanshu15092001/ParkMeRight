const express = require('express');
var cors=require('cors');
const connectToMongo=require('./db');
connectToMongo();

const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth',require('./routes/customer'))
app.use('/api/admin',require('./routes/admin'))
app.use('/api/location',require('./routes/location'))
app.use('/api/rate',require('./routes/rate'))
app.use('/api/locrate',require('./routes/locrate'))
app.use('/api/parkingbooking',require('./routes/parkingbooking'))

//app.use(path)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})