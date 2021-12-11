import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

@Entity({name: "user"})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;
}