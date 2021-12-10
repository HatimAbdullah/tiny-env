import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne} from "typeorm";
import { Commentable } from "./commentable.model";
import { Question } from "./question.model";

@Entity()
export class Answer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(() => Question, question => question.answers, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "question_id", referencedColumnName: "id" })
    question: Question;

    @Column()
    question_id: number;

    @OneToOne(() => Commentable)
    @JoinColumn({ name: "commentable_id", referencedColumnName: "id" })
    commentable: Commentable;

    @Column()
    commentable_id: number;
}