import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1616624091457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE testing ( column1 varchar, column2 varchar)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE testing`);
  }
}
