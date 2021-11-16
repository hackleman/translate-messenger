import { createConnection } from "typeorm";
import { User } from "./entity/User";

export const startDB = async (): Promise<void> => {
    try {
        const connection = await createConnection();
        const users = await connection.manager.find(User);
        console.log("Loaded users: ", users);
    } catch (err) {
        console.log(err);
    }
}
