import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUserFieldProfileImg1690168960601 implements MigrationInterface {
    name = 'RemoveUserFieldProfileImg1690168960601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_image" character varying(127)`);
    }

}
