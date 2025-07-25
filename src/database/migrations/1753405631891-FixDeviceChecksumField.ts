import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixDeviceChecksumField1753405631891 implements MigrationInterface {
  name = 'FixDeviceChecksumField1753405631891';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" ALTER COLUMN "checksum" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "device" ALTER COLUMN "checksum" SET NOT NULL`,
    );
  }
}
