const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://equiposEDI:sharedLogin@cluster0-yur6w.mongodb.net/equiposARCO",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
