import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1705755098825 implements MigrationInterface {
  name = 'Migrations1705755098825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE TABLE "users" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4 ( ),
        "fullName" CHARACTER VARYING NOT NULL,
        "email" CHARACTER VARYING NOT NULL,
        "password" CHARACTER VARYING NOT NULL,
        "role" CHARACTER VARYING NOT NULL DEFAULT 'blogger',
        CONSTRAINT "UQ_email" UNIQUE ( "email" ), 
        CONSTRAINT "PK_id" PRIMARY KEY ( "id" ) 
    )
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
