import { BadRequestException, NotFoundException } from '@nestjs/common';

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

const testUser = {
  "email": "aaa@gmail.com",
  "password": "123",
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "phoneNumber": "+359888111111",
  "city": "Varna",
  "address": "adasdsaad",
}

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    mockUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (user: User) => {
        users.push(user);
        return Promise.resolve(user);
      }
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('create an auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user', async () => {
    const user = await service.signup(testUser);

    expect(user.password).not.toEqual('adasdsaad');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('error for email duplication', async () => {
    await service.signup(testUser);
    await expect(service.signup(testUser)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('error for unexisting email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('error for invalid password', async () => {
    await service.signup(testUser);
    await expect(
      service.signin('aaa@gmail.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

});
