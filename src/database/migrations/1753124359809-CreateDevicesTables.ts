import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevicesTables1753124359809 implements MigrationInterface {
  name = 'CreateDevicesTables1753124359809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."device-log_status_enum" AS ENUM('online', 'offline', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TABLE "device-log" ("id" SERIAL NOT NULL, "deviceId" integer NOT NULL, "status" "public"."device-log_status_enum" NOT NULL DEFAULT 'unknown', "pingAt" TIMESTAMP NOT NULL, "cpuLoad" integer NOT NULL, "memoryUsage" integer NOT NULL, "softwareVersion" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_507730148d7e78fb383a19f37e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_052c7be0e4d83b72dcb85cf2d0" ON "device-log" ("deviceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e03fe6677d310a9d0f472ead5" ON "device-log" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cfff4a3b0902723d2496803239" ON "device-log" ("pingAt") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."device_status_enum" AS ENUM('online', 'offline', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "status" "public"."device_status_enum" NOT NULL DEFAULT 'unknown', "lastPing" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2dc10972aa4e27c01378dad2c72" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6e1daf1f4034e482d158095373" ON "device" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2670264110f040366d132e954d" ON "device" ("lastPing") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2670264110f040366d132e954d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6e1daf1f4034e482d158095373"`,
    );
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TYPE "public"."device_status_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_cfff4a3b0902723d2496803239"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e03fe6677d310a9d0f472ead5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_052c7be0e4d83b72dcb85cf2d0"`,
    );
    await queryRunner.query(`DROP TABLE "device-log"`);
    await queryRunner.query(`DROP TYPE "public"."device-log_status_enum"`);
  }
}
