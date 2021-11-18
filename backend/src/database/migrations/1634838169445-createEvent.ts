import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createEvent1634838169445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'events',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isNullable:false,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'description',
                        isNullable:false,
                        type: 'varchar',
                    },
                    {
                        name: 'init_date',
                        isNullable:false,
                        type: 'timestamp',
                        isUnique: true,
                    },
                    {
                        name: 'end_date',
                        isNullable:false,
                        type: 'timestamp',
                        isUnique: true,
                    },
                    {
                        name: 'user_id',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }

}
