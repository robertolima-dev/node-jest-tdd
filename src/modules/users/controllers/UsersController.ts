import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUsersService';
import MathCountService from '../services/MathCountService';
import ShowUserService from '../services/ShowUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UsersController {

    public async index(request: Request, response: Response): Promise<Response> {

        const listUser = new ListUserService();

        const users = await listUser.execute();

        return response.json(users)
    }

    public async show(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const showUser = new ShowUserService();

        const user = await showUser.execute({ id });

        return response.json(user)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, email, password } = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        return response.json(user)
    }

    public async update(request: Request, response: Response): Promise<Response> {

        const { id } = request.params
        const { name, email } = request.body

        const updateUser = new UpdateUserService();

        const user = await updateUser.execute({ id, name, email });

        return response.json(user)
    }

    public async delete(request: Request, response: Response): Promise<Response> {

        const { id } = request.params

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ id });

        return response.status(204).json()
    }

    public async math(request: Request, response: Response): Promise<Response> {

        const { n1, n2, n3, isRadius, isSum, isSumThree, isBaskara } = request.body

        const mathService = new MathCountService();

        const result = await mathService.execute({ n1, n2, n3, isRadius, isSum, isSumThree, isBaskara });

        return response.json(result)
    }
}
