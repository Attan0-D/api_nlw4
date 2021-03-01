import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {v4 as uuid} from 'uuid';
import { Survey } from './Survey';
import { User } from './User';


@Entity("surveys_users")
class SurveyUser {
        //decorator para chave primária
        @PrimaryColumn()
        readonly id: string;

        //Apenas se o nome do atributo for igual ao nome da coluna
        //é permitido utilizar essa expressão, se não, terá que ser definida
        //dentro da função Column() como parametro. EX: @Column("name").
        @Column()
        user_id: string;

        @ManyToOne(() => User)
        @JoinColumn({name: "user_id"})
        user: User
        
        @Column()
        survey_id: string;

        @ManyToOne(() => Survey)
        @JoinColumn({name: "survey_id"})
        survey: Survey 

        @Column()
        value: number;

        //decorator para coluna de data
        @CreateDateColumn()
        created_at: Date;

        //construtor para criação de um uuid para o usuario
        constructor(){
            if(!this.id){
                this.id = uuid();
            }
        }
    }
export { SurveyUser }