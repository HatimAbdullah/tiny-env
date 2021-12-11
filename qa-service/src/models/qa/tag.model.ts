import {Entity, BaseEntity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany} from "typeorm";
import { Question } from "./question.model";

@Entity({name: "tag"})
export class Tag extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    body: string;

    @ManyToMany(() => Question, questions => questions.tags, {
        cascade: true
    })
    @JoinTable()
    questions: Question[];
}