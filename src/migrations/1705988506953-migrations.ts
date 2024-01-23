import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1705988506953 implements MigrationInterface {
  name = 'Migrations1705988506953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4 ( ),
        "title" CHARACTER VARYING NOT NULL,
        "created_at" TIMESTAMP ( 3 ) NOT NULL DEFAULT now( ),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now( ),
        "userId" UUID,
        CONSTRAINT "PK_categories_id" PRIMARY KEY ( "id" ) 
    )`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4 ( ),
        "name" CHARACTER VARYING NOT NULL,
        "created_at" TIMESTAMP ( 3 ) NOT NULL DEFAULT now( ),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now( ),
        CONSTRAINT "PK_tags_id" PRIMARY KEY ( "id" ) 
    )`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" (
        "id" UUID NOT NULL DEFAULT uuid_generate_v4 ( ),
        "title" CHARACTER VARYING NOT NULL,
        "content" TEXT NOT NULL,
        "created_at" TIMESTAMP ( 3 ) NOT NULL DEFAULT now( ),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now( ),
        CONSTRAINT "PK_posts_ts" PRIMARY KEY ( "id" ) 
    )
    `,
    );
    await queryRunner.query(
      `CREATE TABLE "categories_posts_posts" (
        "categoriesId" uuid NOT NULL, 
        "postsId" uuid NOT NULL, 
        CONSTRAINT "PK_categories_posts_posts" PRIMARY KEY ("categoriesId", "postsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_categories_posts_posts_categoriesId" ON "categories_posts_posts" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_categories_posts_posts_postsId" ON "categories_posts_posts" ("postsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tags_posts_posts" ( 
        "tagsId" UUID NOT NULL, 
        "postsId" UUID NOT NULL, 
        CONSTRAINT "PK_tags_posts_posts" PRIMARY KEY ( "tagsId", "postsId" ) )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tags_posts_posts_tagsId" ON "tags_posts_posts" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tags_posts_posts_postsId" ON "tags_posts_posts" ("postsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "posts_categories_categories" (
        "postsId" uuid NOT NULL, 
        "categoriesId" uuid NOT NULL, 
        CONSTRAINT "PK_dcb828476cfb3dac4d2eb823faf" PRIMARY KEY ("postsId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f50a96e3d32263cc97588d91d6" ON "posts_categories_categories" ("postsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bb4ea8658b6d38df2a5f93cd50" ON "posts_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "posts_tags_tags" ("postsId" uuid NOT NULL, "tagsId" uuid NOT NULL, CONSTRAINT "PK_0102fd077ecbe473388af8f3358" PRIMARY KEY ("postsId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cf364c7e6905b285c4b55a0034" ON "posts_tags_tags" ("postsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ce163a967812183a51b044f740" ON "posts_tags_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP(3)`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Moderator'`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" ADD CONSTRAINT "FK_e24774f82f518838b1acbe7addb" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" ADD CONSTRAINT "FK_8a6e72a6e55b4cabe31d04975b4" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_c24352ded9a4768d79a9456ec98" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories_categories" ADD CONSTRAINT "FK_f50a96e3d32263cc97588d91d6e" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories_categories" ADD CONSTRAINT "FK_bb4ea8658b6d38df2a5f93cd506" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_cf364c7e6905b285c4b55a00343" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_tags_tags" ADD CONSTRAINT "FK_ce163a967812183a51b044f7404" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_ce163a967812183a51b044f7404"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_tags_tags" DROP CONSTRAINT "FK_cf364c7e6905b285c4b55a00343"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories_categories" DROP CONSTRAINT "FK_bb4ea8658b6d38df2a5f93cd506"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts_categories_categories" DROP CONSTRAINT "FK_f50a96e3d32263cc97588d91d6e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_c24352ded9a4768d79a9456ec98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" DROP CONSTRAINT "FK_8a6e72a6e55b4cabe31d04975b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_posts_posts" DROP CONSTRAINT "FK_e24774f82f518838b1acbe7addb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_13e8b2a21988bec6fdcbb1fa741"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'Author'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" TYPE TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ce163a967812183a51b044f740"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cf364c7e6905b285c4b55a0034"`,
    );
    await queryRunner.query(`DROP TABLE "posts_tags_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bb4ea8658b6d38df2a5f93cd50"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f50a96e3d32263cc97588d91d6"`,
    );
    await queryRunner.query(`DROP TABLE "posts_categories_categories"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c24352ded9a4768d79a9456ec9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fff7d6237fcff2a66b701d6995"`,
    );
    await queryRunner.query(`DROP TABLE "tags_posts_posts"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a6e72a6e55b4cabe31d04975b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e24774f82f518838b1acbe7add"`,
    );
    await queryRunner.query(`DROP TABLE "categories_posts_posts"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
