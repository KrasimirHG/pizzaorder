import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const testUser = {
  "email": "aaa@gmail.com",
  "password": "123",
  "firstName": "Aaaa",
  "lastName": "Bbbbb",
  "phoneNumber": "+359888111111",
  "city": "Varna",
  "address": "adasdsaad",
  "role": "admin"
}

const testPizza = {
  "name": "pepperoni",
  "description": "Classic pizza with tomato, pepperoni, sause and olive oil",
  "size": "small",
  "price": 10
}

const testOrder = {
  "orders": [
  {
      "pizzaId": 1,
      "quantity": 5
  }]
}

describe('Authentication and order', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('signup as admin, add pizza and make an order', async () => {
    const signupResponse = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser)
      .expect(201);

    const cookie = signupResponse.get('Set-Cookie');

    await request(app.getHttpServer())
      .post('/pizzas/add')
      .set('Cookie', cookie)
      .send(testPizza)
      .expect(201);

    await request(app.getHttpServer())
      .post('/orders/create')
      .set('Cookie', cookie)
      .send(testOrder)
      .expect(201)
      .then((res) => {
        expect(res.text).toEqual('Hello Aaaa, your order is pepperoni x 5. It will cost you only 50EUR. Enjoy :)')
      })
  });
});
