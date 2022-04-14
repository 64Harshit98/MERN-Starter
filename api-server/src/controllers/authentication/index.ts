import { Response, Request } from "express"
import { IUser } from "../../types/user"
import User from "../../models/user"
import { compareHashedPassword, hashPassword } from "../../utils/hashPassword"


const addUser = (req: Request, res: Response) => {
    try {
        const body = req.body as Pick<IUser, "name" | "email" | "password">
        hashPassword(body.password).then(async (hash) => {
            const user: IUser = new User({
                name: body.name,
                email: body.email,
                password: hash
            })
            const newUser: IUser = await user.save()

            res
                .status(201)
                .json({ message: "User added", user: newUser })
        }).catch(err => { throw err })


    } catch (error) {
        throw error
    }
}

const verifyUser = async (req: Request, res: Response) => {
    try {
        const body = req.body as Pick<IUser, "email" | "password">
        // Checking user in database
        const user = await User.findOne({ email: body.email })
        if (!user) res.status(404).json({ "msg": "User not found" })
        const hashedPassword: string | any = user?.password
        compareHashedPassword(body.password, hashedPassword).then(isMatch => {
            if (isMatch) res.status(201).json({ "msg": "User verified!", isMatch })
        }).catch(err => {
            res.status(201).json({ "msg": "User not verified!", err })
        })

    } catch (error) {
        res.status(400).json({ "msg": "User not found", "error": error });
    }
}
export { addUser, verifyUser }