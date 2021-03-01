import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614303858732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			//criação das tabelas
    		new Table({
                name: "surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true

                    },
                    {
                        name: "Title",
                        type: "varchar"
                    },
                    {
                        name: "Description",
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
        await queryRunner.dropTable("surveys");

        }

}
