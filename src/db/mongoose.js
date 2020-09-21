const mongoose = require('mongoose')

//established connection with MongoDB; it requires the connection string
mongoose.connect("mongodb+srv://ubaida:personal_cluster@medicine-sheba.0wsoq.mongodb.net/medicine-sheba?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})