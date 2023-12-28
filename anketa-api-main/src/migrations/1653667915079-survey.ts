import {MigrationInterface, QueryRunner} from "typeorm";

export class survey1653667915079 implements MigrationInterface {
    name = 'survey1653667915079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "questions" jsonb, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "survey_groups_group" ("surveyId" uuid NOT NULL, "groupId" uuid NOT NULL, CONSTRAINT "PK_6266035d1f5ce30295a36aeccea" PRIMARY KEY ("surveyId", "groupId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_12e4b683f926596c0efa362921" ON "survey_groups_group" ("surveyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_72ece90f3fc0386f5563799877" ON "survey_groups_group" ("groupId") `);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" ADD CONSTRAINT "FK_12e4b683f926596c0efa3629210" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" ADD CONSTRAINT "FK_72ece90f3fc0386f55637998771" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_groups_group" DROP CONSTRAINT "FK_72ece90f3fc0386f55637998771"`);
        await queryRunner.query(`ALTER TABLE "survey_groups_group" DROP CONSTRAINT "FK_12e4b683f926596c0efa3629210"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72ece90f3fc0386f5563799877"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12e4b683f926596c0efa362921"`);
        await queryRunner.query(`DROP TABLE "survey_groups_group"`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }

}
