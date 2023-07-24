import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserProfileImgTable1690059744040 implements MigrationInterface {
    name = 'CreateUserProfileImgTable1690059744040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users-profile_img" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "path" text NOT NULL, CONSTRAINT "PK_94681d374ac0560bc29b189827b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users-profile_img"`);
    }

}
