import DeleteUserService from '../DeleteUserService'
import AppError from '../../../../middlewares/errors/AppError'
import CreateUserService from '../CreateUserService'
import { User } from '../../model/User'

describe('DeleteUserService', () => {

    let name: any
    let email: any
    let password: any

    let createUser: any
    let deleteUser: any

    beforeEach(() => {

        name = 'Roberto Lima'
        email = 'robertolima+delete@gmail.com'
        password = '123456'

        createUser = new CreateUserService()
        deleteUser = new DeleteUserService()
    })

    // it('test description', () => {
    //     expect(1).toBe(1)
    // })

    it('should delete a user by id', async () => {
        const user: User = await createUser.execute({ name, email, password })
        const id = user.id
        const deleteNewUser = await deleteUser.execute({ id })

        // teste
        expect(deleteNewUser).toBeUndefined()
    })

    it('should return 404 for user not found', async () => {
        const id = jest.mock('uuid')

        try {
            await deleteUser.execute({ id })
        } catch (error: any) {

            // testes
            expect(error.message).toBe('User not found!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(404)
        }
    })
})
