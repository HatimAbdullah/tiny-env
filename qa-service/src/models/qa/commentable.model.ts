import {Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Comment } from "./comment.model"

@Entity({name: "commentable"})
export class Commentable extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Comment, comments => comments.commentable)
    comments: Comment[];
}