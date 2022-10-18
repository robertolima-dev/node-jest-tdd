import CreateUserService from '../CreateUserService'
import ListUsersService from '../ListUsersService'
import { User } from '../../model/User'

describe('ListUsersService', () => {

    let createUser: any
    let listUser: any

    beforeEach(() => {

        createUser = new CreateUserService()
        listUser = new ListUsersService()
    })

    // it('test description', () => {
    //     expect(1).toBe(1)
    // })

    it('should list users', async () => {

        for (let i = 0; i < 5; i++) {
            await createUser.execute({
                name: `Roberto ${i}`,
                email: `robertolima+create${i}@gmail.com`,
                password: '123456'
            })
        }

        const users: User[] = await listUser.execute()

        // testes
        expect(users).not.toBeNull()
        expect(Array.isArray(users)).toBe(true)
        expect(typeof users[0]).toBe('object')
    })
})
