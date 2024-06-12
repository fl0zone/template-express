import mongoose, { get, set } from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
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
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be 8 characters or longer"]
        }
    },
    { timesstamps: true }
)

UserSchema.virtual('confirmPassword')
    .get(function () {
        return this._confirmPassword
    })
    .set(function (value) {
        this._confirmPassword = value;
    });

// Middleware para validar la confirmación de contraseña
UserSchema.pre('validate', function (next) {
    console.log(this.password)
    console.log(this.confirmPassword)
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

/*
    UserSchema.pre('save', function (next) {
        bcrypt.hash(this.password, 10)
            .then(hash => {
                this.password = hash;
                next();
            });
    });
*/

const User = mongoose.model('User', UserSchema);
export default User;

