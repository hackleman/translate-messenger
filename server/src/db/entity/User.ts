import {Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, BeforeInsert, AfterLoad, ManyToMany, JoinTable } from "typeorm";
import Conversation from "./Conversation";
import crypto from 'crypto';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    photoUrl: string

    @Column()
    salt: string;

    @Column()
    email: string;

    @ManyToMany(() => Conversation,  conversation => conversation.users, { onDelete: 'CASCADE' })
    conversations: Conversation[]
    
    private tempPassword: string;
    
    static createSalt: () => string;
    static encryptPassword: (plainPassword: any, salt: any) => string;
    public checkPassword: (password: any) => Boolean;

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
