const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/medicine-sheba-server', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
//mongodb+srv:ubaida:medicinesheba12345@medicine-sheba.0wsoq.mongodb.net/medicine-sheba?retryWrites=true&w=majority})//