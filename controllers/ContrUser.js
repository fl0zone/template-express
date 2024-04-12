import User from "../models/ModelUser.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email });
        if (user) {
            const passwordIsValid = await bcrypt.compare(password, user.password);

            if (passwordIsValid) {
                const newJWT = jwt.sign({ _id: user._id }, "mysecret");
                console.log(newJWT);
                res.cookie("usertoken", newJWT, { httpOnly: true }).json({ success: true, user: user });
            } else {
                res.status(500).json({ success: false });
            }
        } else {
            res.status(500).json({ success: false });
        }
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ success: false, error: 'Error en la autenticación' });
    }
};

const registerUser = async (req, res) => {
    try {
        // Extraer datos del cuerpo de la solicitud
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        // Verificar si la contraseña y la confirmación coinciden
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Password and confirmPassword do not match' });
        }
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear una instancia del modelo User
        const user = new User({ firstName, lastName, email, password: hashedPassword, confirmPassword: hashedPassword });
        // Guardar el usuario en la base de datos
        await user.save();
        // Devolver una respuesta exitosa
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        // Manejar errores durante el registro
        console.error(error);
        // Verificar si el error es de validación (por ejemplo, contraseña no coincidente)
        if (error.errors) {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ success: false, errors: validationErrors });
        }
        // Otros errores, devolver un mensaje genérico de error
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
};

const logoutUser = (req, res) => {
    try {
        // Eliminar la cookie del token de usuario
        res.clearCookie('usertoken', { httpOnly: true });
        // Respondemos con un código 200 (OK) para indicar que el cierre de sesión fue exitoso
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ success: false, error: 'Error during logout' });
    }
};


const createUser = async (req, res) => {
    try {
        console.log(req.body);
        let personData = req.body;
        let newUser = await User.create(personData)
        res.status(200).json(newUser);
    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const getUser = async (req, res) => {
    try {
        let userList = await User.find();
        res.status(200).json(userList);
    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const getOneUser = async (req, res) => {
    try {

        let id = req.params.id;
        let userList = await User.find(id);
        res.status(200).json(userList);

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updateUser);

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};

const deleteUser = async (req, res) => {
    try {

        let user = await User.findById(id);
        if (!user) {

            res.status(400).json({ message: "User not found", });

        }
        await User.findByIdAndDelete(id)

    } catch (e) {
        console.log("Error", + e)
        res.status(400).json({ message: e.message, });
    }
};


export {
    createUser,
    getUser,
    getOneUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    logoutUser
};