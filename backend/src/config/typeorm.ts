import { createConnection } from "typeorm";
import path from "path";

export async function connect(){
    await createConnection(
    )

    console.log('Database is Connected');
}