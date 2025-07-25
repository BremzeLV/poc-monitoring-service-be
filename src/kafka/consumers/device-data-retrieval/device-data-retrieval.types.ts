import { Device } from '../../../devices/domain/device';

export type DeviceDataRetrievalMessage = {
  device: Device;
  retryCount: number;
};
