import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';
import {v4 as uuid} from 'uuid';


@Entity("surveys")
class Survey {
        //decorator para chave primária
        @PrimaryColumn()
        readonly id: string;

        //Apenas se o nome do atributo for igual ao nome da coluna
        //é permitido utilizar essa expressão, se não, terá que ser definida
        //dentro da função Column() como parametro. EX: @Column("name").
        @Column()
        title: string;

        @Column()
        description: string;

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
export { Survey }