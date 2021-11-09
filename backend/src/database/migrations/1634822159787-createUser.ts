import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1634822159787 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isNullable:false,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'name',
                        isNullable:false,
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        isNullable:false,
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password_hash',
                        isNullable:false,
                        type: 'varchar',
                        isUnique: true,
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
