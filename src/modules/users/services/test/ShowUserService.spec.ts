import CreateUserService from '../CreateUserService'
import ShowUserService from '../ShowUserService'
import AppError from '../../../../middlewares/errors/AppError'
import { User } from '../../model/User'

describe('ShowUserService', () => {

    let name: any
    let email: any
    let password: any
    let createUser: any
    let showUser: any

    beforeEach(() => {

        name = 'Roberto Lima'
        email = 'robertolima+show01@gmail.com'
        password = '123456'

        createUser = new CreateUserService()
        showUser = new ShowUserService()
    })

    // it('test description', () => {
    //     expect(1).toBe(1)
    // })

    it('should show a user by id', async () => {
        const newUser: User = await createUser.execute({ name, email, password })
        const id = newUser.id
        const user = await showUser.execute({ id })

        // testes
        expect(user.id).not.toBeNull()
        expect(user.name).toBe(name)
        expect(typeof user).toBe('object');
    })

    it('should return 404 for user not found', async () => {
        const id = jest.mock('uuid')

        try {
            await showUser.execute({ id })
        } catch (error: any) {

            // testes
            expect(error.message).toBe('User not found!')
            expect(error).toBeInstanceOf(AppError)
            expect(error.statusCode).toBe(404)
        }
    })
})
