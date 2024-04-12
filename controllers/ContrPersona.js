import Persona from "../models/ModelPersona.js";


const createPersona = async (req, res) => {
    try {
        console.log(req.body);
        let personData = req.body;
        let newPersona = await Persona.create(personData)
        res.status(200).json(newPersona);
    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const getPersona = async (req, res) => {
    try {
        let personaList = await Persona.find();
        res.status(200).json(personaList);
    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const getOnePersona = async (req, res) => {
    try {

        let id = req.params.id;
        let personaList = await Persona.find(id);
        res.status(200).json(personaList);

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const updatePersona = async (req, res) => {
    try {
        let id = req.params.id;
        let updatePersona = await Persona.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatePersona);

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const deletePersona = async (req, res) => {
    try {

        let persona = await Persona.findById(id);
        if (!persona) {

            res.status(400).json({ message: "Persona not found", });

        }
        await Persona.findByIdAndDelete(id)

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};


export {
    createPersona,
    getPersona,
    getOnePersona,
    updatePersona,
    deletePersona
};