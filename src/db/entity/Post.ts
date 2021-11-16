import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: number;

    @Column()
    title: string;

    @Column()
    body: string;
    
}