import {MigrationInterface, QueryRunner} from "typeorm";

export class answeredFrom1654606091121 implements MigrationInterface {
    name = 'answeredFrom1654606091121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_groups_group" DROP CONSTRAINT "FK_72ece90f3fc0386f55637998771"`);
        await queryRunner.query(`ALTER TABLE "group_users_user" DROP CONSTRAINT "FK_55edea38fece215a3b66443a498"`);
        await queryRunner.query(`ALTER TABLE "survey" ADD "answeredFrom" jsonb`);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" ADD CONSTRAINT "FK_72ece90f3fc0386f55637998771" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_users_user" ADD CONSTRAINT "FK_55edea38fece215a3b66443a498" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group_users_user" DROP CONSTRAINT "FK_55edea38fece215a3b66443a498"`);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" DROP CONSTRAINT "FK_72ece90f3fc0386f55637998771"`);
        await queryRunner.query(`ALTER TABLE "survey" DROP COLUMN "answeredFrom"`);
        await queryRunner.query(`ALTER TABLE "group_users_user" ADD CONSTRAINT "FK_55edea38fece215a3b66443a498" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" ADD CONSTRAINT "FK_72ece90f3fc0386f55637998771" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
