import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Card1700709065947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "card",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        
                    },
                    {
                        name: "account_id",
                        type: "uuid",
                        
                    },
                    {
                        name: "type",
                        type: "varchar",
                        enum: ["physical", "virtual"]
                    },
                    {
                        name: "number",
                        type: "varchar",
                    },
                    {
                        name: "cvv",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("card");
    }

}
