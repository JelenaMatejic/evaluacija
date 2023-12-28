import {MigrationInterface, QueryRunner} from "typeorm";

export class groupToAdd1654807483033 implements MigrationInterface {
    name = 'groupToAdd1654807483033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ADD "toAdd" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "toAdd"`);
    }

}
