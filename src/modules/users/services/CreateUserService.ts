import { User } from "../model/User";
import UserRepositoy from "../repositories/sequelize/UserRepository";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import AppError from "../../../middlewares/errors/AppError";
const saltRounds = 10

interface IRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {

        const userRepositoy = new UserRepositoy()

        const hasUser = await userRepositoy.findByEmail(email)

        if (hasUser) {
            throw new AppError("Email is already in use!", 409);
        }

        const passwordHashed = bcrypt.hashSync(password, saltRounds);

        const data = {
            id: uuidv4(),
            password: passwordHashed,
            name,
            email,
        }

        let user = await userRepositoy.create(data)

        user = await userRepositoy.findById(user.id)

        return user;
    }
}

export default CreateUserService;
