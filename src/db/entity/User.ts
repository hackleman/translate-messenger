import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert, AfterLoad } from "typeorm";
import crypto from 'crypto';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    email: string;

    private tempPassword: string;

    static createSalt: () => string;
    static encryptPassword: (plainPassword: any, salt: any) => string;
    checkPassword: (password: any) => Boolean;

    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    private setSaltAndPassword() {
        if (this.tempPassword !== this.password) {
            this.salt = User.createSalt();
            this.password = User.encryptPassword(this.password, this.salt);
        }
    }
}

User.prototype.checkPassword = function(password): Boolean {
    return User.encryptPassword(password, this.salt) === this.password;
}

User.createSalt = function () {
    return crypto.randomBytes(16).toString("base64");
}

User.encryptPassword = function (plainPassword, salt) {
    return crypto.createHash("RSA-SHA256").update(plainPassword).update(salt).digest("hex");
}
