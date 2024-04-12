import mongoose from "mongoose"

const PersonaSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"]
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        },
        confirmPassword: {
            type: String,
            required: [true, "Password is required"]
        }
    },
    { timesstamps: true }
)
const Persona = mongoose.model('Persona', PersonaSchema);
export default Persona;

