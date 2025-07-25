import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceAndDeviceLogAdditionalFields1753405363438
  implements MigrationInterface
{
  name = 'CreateDeviceAndDeviceLogAdditionalFields1753405363438';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device-log" DROP COLUMN "softwareVersion"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "swVersion" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "fwVersion" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "hwVersion" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD "checksum" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "device-log" DROP COLUMN "cpuLoad"`);
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "cpuLoad" numeric(5,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" DROP COLUMN "memoryUsage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "memoryUsage" numeric(5,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device-log" DROP COLUMN "memoryUsage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "memoryUsage" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "device-log" DROP COLUMN "cpuLoad"`);
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "cpuLoad" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "checksum"`);
    await queryRunner.query(`ALTER TABLE "device-log" DROP COLUMN "hwVersion"`);
    await queryRunner.query(`ALTER TABLE "device-log" DROP COLUMN "fwVersion"`);
    await queryRunner.query(`ALTER TABLE "device-log" DROP COLUMN "swVersion"`);
    await queryRunner.query(
      `ALTER TABLE "device-log" ADD "softwareVersion" character varying NOT NULL`,
    );
  }
}
