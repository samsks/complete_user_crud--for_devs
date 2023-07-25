import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCUDInAvatarTable1690242062624 implements MigrationInterface {
    name = 'AddCUDInAvatarTable1690242062624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatars" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "avatars" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "avatars" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avatars" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "avatars" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "avatars" DROP COLUMN "created_at"`);
    }

}
