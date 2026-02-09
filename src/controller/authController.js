import { prisma } from "../config/db.js";
import bcrypt, { hash } from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

const register = async (req, res) => {
    const  { name, email, password } = req.body;

    //checks if the user email exists
    const userExists = await prisma.user.findUnique({
        where: { email: email},
    });

    //condition if email exists
    if (userExists) {
        return res
        .status(400)
        .json({ error: "user with email exists!"});
    }

    //generates salt and hashes password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
        data:{
            name,
            password: hashedPassword,
            email
        },
    });
    const token = generateToken(user.id, res);
    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            },
            token,
        }
    })
};


const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {email: email},
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid email or password"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ error: "InvalidInvalid email or password email or password"});
    }

    const token = generateToken(user.id, res);
    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: email,
            },
            token,
        },
    })

};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires:  new Date(0)
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
};

export { register, login, logout } 