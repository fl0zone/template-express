import mongoose from "mongoose";
//{ useNewUrlParser: true, useUnifiedTopology: true }
const createConnection = () => {
    mongoose
        .connect("mongodb+srv://lguerrero:aR2dde7ea0UZYGXN@atlasmongofullstackmern.nglsbuq.mongodb.net/Persona")
        .then(() => {
            console.log("conectado a la BD correctamente");
        })
        .catch((e) => {
            console.log(e);
        });
};

export default createConnection;
