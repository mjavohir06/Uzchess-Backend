import 'dotenv/config';
import {INestApplication} from '@nestjs/common';
import request from 'supertest';
// @ts-ignore
import {createTestApp} from './utils/test-app';
// @ts-ignore
import {teardownTestApp} from './utils/teardown';
import {DataSource} from 'typeorm';
import argon2 from 'argon2';

describe('BookCategoryControllerAdmin (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let jwtToken: string;

  beforeAll(async () => {
    ({app, dataSource} = await createTestApp());
    let password = await argon2.hash('12345');
    await dataSource.query(`
      INSERT INTO users ("fullName", "login", "loginType", "isVerified", "isActive", "role", "password")
      VALUES ('Solih Coder', 'solihcoder@gmail.com', 'email', true, true, 'superAdmin', '${password}')
    `);
  });
  afterAll(async () => await teardownTestApp(app, dataSource));

  it(
    'POST /auth/sign-in -> should respond with a jwt token and 201',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({login: 'solihcoder@gmail.com', password: '12345'})
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      jwtToken = res.body.accessToken;
    },
  );

  it(
    'POST /admin/book-category -> should return 401',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/book-category')
        .send({title: 'Tarix'})
        .expect(401);
    }
  );

  it(
    'POST /admin/book-category',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/book-category')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({title: 'Tarix'})
        .expect(201);

      expect(res.body.id).toEqual(1);
      expect(res.body.title).toEqual('Tarix');
    }
  );

  it(
    'POST /admin/book-category -> should conflic with the existing Tarix category',
    async () => {
      const res = await request(app.getHttpServer())
        .post('/admin/book-category')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send({title: 'Tarix'})
        .expect(400);
    }
  );
});
