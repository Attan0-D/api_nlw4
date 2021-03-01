import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614133770973 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.createTable(
			//criação das tabelas
    		new Table({
				//nome da tabela
    			name: "users",

				//coluna da tabela 
    			columns: [
    				{
    				 name: "id",
    				 type: "uuid",
    				 isPrimary: true 
    				},
    				 
    				{
    				  name: "name",
    				  type: "varchar"
    				},

    				{
    				  name: "email",
    				  type: "varchar"
    				},
    				 
    				{
    				  name: "created_at",
    				  type: "timestamp",
    				  default: "now()"
    				}
    			]
    		})
    	)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		//drop da tabela
    	await queryRunner.dropTable("users");
    }

}
