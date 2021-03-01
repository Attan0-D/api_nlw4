import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Users", async () => {

    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    
   

    it("Shoud be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example",
        });

    expect(response.status).toBe(201);
    
    });

    it("Shoud not be able to create an user with same emails", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example",
        });

    expect(response.status).toBe(400);
    
    });
});
