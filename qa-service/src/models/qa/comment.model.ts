import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne} from "typeorm";
import { Commentable } from "./commentable.model";

@Entity({name: "comment"})
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(() => Commentable, commentable => commentable.comments, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "commentable_id", referencedColumnName: "id" })
    commentable: Commentable;

    @Column()
    commentable_id: number;
}