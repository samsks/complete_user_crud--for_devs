import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileImgRelation1690061618181 implements MigrationInterface {
    name = 'UserProfileImgRelation1690061618181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users-profile_img" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" ADD CONSTRAINT "UQ_a7d2bd401af6bac97f0598298e2" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" ADD "name" character varying(127) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" ADD CONSTRAINT "FK_a7d2bd401af6bac97f0598298e2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users-profile_img" DROP CONSTRAINT "FK_a7d2bd401af6bac97f0598298e2"`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" DROP CONSTRAINT "UQ_a7d2bd401af6bac97f0598298e2"`);
        await queryRunner.query(`ALTER TABLE "users-profile_img" DROP COLUMN "userId"`);
    }

}
