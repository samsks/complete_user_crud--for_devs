import { MigrationInterface, QueryRunner } from "typeorm";

export class UserBaseEntity1688747037976 implements MigrationInterface {
    name = 'UserBaseEntity1688747037976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(127) NOT NULL, "profile_image" character varying(127), "first_name" character varying(30) NOT NULL, "middle_name" character varying(30), "last_name" character varying(20) NOT NULL, "phone_number" character varying(18) NOT NULL, "birthday" date NOT NULL, "is_superuser" boolean NOT NULL DEFAULT false, "reset_token" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
