import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne} from "typeorm";
import { Answer } from "./answer.model";
import { Comment } from "./comment.model"

@Entity()
export class Commentable extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Comment, comments => comments.commentable)
    comments: Comment[];
}