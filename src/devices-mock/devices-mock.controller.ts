import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('health')
export class DevicesMockController {
  @Get()
  async getHealth() {
    const rand = Math.random();

    // Simulate timeout (no response)
    if (rand < 0.1) {
      console.log('[FlakyDevice] Simulating timeout...');
      await new Promise(() => {}); // Infinite pending promise
    }

    // Simulate slow response
    if (rand < 0.25) {
      console.log('[FlakyDevice] Simulating delay...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    // Simulate 500 error
    if (rand < 0.35) {
      console.log('[FlakyDevice] Simulating 500 error...');
      throw new HttpException(
        { error: 'Internal Device Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Simulate malformed response
    if (rand < 0.45) {
      console.log('[FlakyDevice] Simulating malformed response...');
      return '<<BAD DATA>>'; // Returns plain string instead of JSON
    }

    // Default: good response
    console.log('[FlakyDevice] Sending healthy response.');
    return {
      status: 200,
      mac: 'AA:BB:CC:DD:EE:FF',
      cpuLoad: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      swVersion: 'v1.2.3',
      fwVersion: 'v2.1.0',
      hwVersion: 'v3.2.1',
    };
  }

  @GrpcMethod('DeviceService', 'Health')
  async health(): Promise<any> {
    const rand = Math.random();

    if (rand < 0.1) {
      console.log('[gRPC] Simulating timeout...');
      await new Promise(() => {});
    }

    if (rand < 0.25) {
      console.log('[gRPC] Simulating delay...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (rand < 0.35) {
      console.log('[gRPC] Simulating error...');
      throw new Error('Internal Device Error');
    }

    if (rand < 0.45) {
      console.log('[gRPC] Simulating malformed response...');
      return '<<BAD DATA>>'; // Not matching expected response schema
    }

    console.log('[gRPC] Sending healthy response...');
    return {
      status: 200,
      mac: 'AA:BB:CC:DD:EE:FF',
      cpuLoad: Math.random() * 100,
      memoryUsage: Math.random() * 100,
      swVersion: 'v1.2.3',
      fwVersion: 'v2.1.0',
      hwVersion: 'v3.2.1',
    };
  }
}
