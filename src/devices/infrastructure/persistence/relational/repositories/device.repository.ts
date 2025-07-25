import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository, In, FindManyOptions } from 'typeorm';
import { DeviceEntity } from '../entities/device.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { DeviceRepository } from '../../device.repository';
import { DeviceMapper } from '../mappers/device.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Device } from '../../../../domain/device';
import { UpdateDeviceDto } from '../../../../dto/update-device.dto';

@Injectable()
export class DevicesRelationalRepository implements DeviceRepository {
  constructor(
    @InjectRepository(DeviceEntity)
    private readonly devicesRepository: Repository<DeviceEntity>,
  ) {}

  async create(data: Device): Promise<Device> {
    const persistenceModel = DeviceMapper.toPersistence(data);
    const newEntity = await this.devicesRepository.save(
      this.devicesRepository.create(persistenceModel),
    );
    return DeviceMapper.toDomain(newEntity);
  }

  async find(options: FindManyOptions<Device>): Promise<Device[]> {
    const entities = await this.devicesRepository.find(options);
    return entities.map(DeviceMapper.toDomain);
  }

  async findManyWithPagination({
    // filterOptions,
    // sortOptions,
    paginationOptions,
  }: {
    // filterOptions?: FilterUserDto | null;
    // sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Device[]> {
    const where: FindOptionsWhere<DeviceEntity> = {};

    const entities = await this.devicesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      // order: sortOptions?.reduce(
      //   (accumulator, sort) => ({
      //     ...accumulator,
      //     [sort.orderBy]: sort.order,
      //   }),
      //   {},
      // ),
    });

    return entities.map((device) => DeviceMapper.toDomain(device));
  }

  async findById(id: Device['id']): Promise<NullableType<Device>> {
    const entities = await this.find({
      where: { id: Number(id) },
    });

    if (!entities.length) {
      return null;
    }

    return entities[0];
  }

  async findByIds(ids: Device['id'][]): Promise<Device[]> {
    const entities = await this.find({
      where: { id: In(ids) },
    });

    return entities;
  }

  async update(
    id: Device['id'],
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<Device> {
    const entity = await this.devicesRepository.findOne({
      where: { id: Number(id) },
    });

    if (!entity) {
      throw new Error('Device not found');
    }

    const updatedEntity = await this.devicesRepository.save(
      this.devicesRepository.create(
        DeviceMapper.toPersistence({
          ...DeviceMapper.toDomain(entity),
          ...updateDeviceDto,
        }),
      ),
    );

    return DeviceMapper.toDomain(updatedEntity);
  }

  async remove(id: Device['id']): Promise<void> {
    await this.devicesRepository.softDelete(id);
  }
}
