import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne, JoinTable, ManyToMany} from "typeorm";
import { Answer } from "./answer.model";
import { Comment } from "./comment.model"
import { Commentable } from "./commentable.model";
import { Tag } from "./tag.model";
@Entity()
export class Question extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @OneToOne(() => Commentable)
    @JoinColumn({ name: "commentable_id", referencedColumnName: "id" })
    commentable: Commentable;

    @Column()
    commentable_id: number

    @OneToMany(() => Answer, answers => answers.question)
    answers: Answer[];

    @ManyToMany(() => Tag, tags => tags.questions)
    tags: Tag[];
}