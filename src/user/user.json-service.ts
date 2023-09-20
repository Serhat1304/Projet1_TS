import { readFileSync, writeFileSync } from 'fs';
import { User } from './user';
import { UserService } from './user.service';

export class UserJSONService implements UserService {

    add(username: string): User {
        const buffer = readFileSync("./src/user/user.json")
        const users = JSON.parse(buffer.toString()) as User[];

        let maxId = 0;
        for(const user of users) {
            if (user.id > maxId) {
                maxId = user.id;
            }
        }

        const newUser = new User(
            maxId + 1,
            username,
        );

        users.push(newUser);
        writeFileSync("./src/user/user.json", JSON.stringify(users));

        return newUser;
    }


    getById(id: number): User | null {
        const buffer = readFileSync("./src/user/user.json")
        const users = JSON.parse(buffer.toString()) as User[];
        
        const existingUser = users.find(user => user.id === id)

        return existingUser || null;
    }
}