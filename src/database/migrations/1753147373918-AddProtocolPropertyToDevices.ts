import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProtocolPropertyToDevices1753147373918
  implements MigrationInterface
{
  name = 'AddProtocolPropertyToDevices1753147373918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."device_protocol_enum" AS ENUM('http', 'https', 'gRPC')`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD "protocol" "public"."device_protocol_enum" NOT NULL DEFAULT 'https'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "device" DROP COLUMN "protocol"`);
    await queryRunner.query(`DROP TYPE "public"."device_protocol_enum"`);
  }
}
