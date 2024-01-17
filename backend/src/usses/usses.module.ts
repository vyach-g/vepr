import { Module } from '@nestjs/common';
import { UssesService } from './usses.service';
import { UssesController } from './usses.controller';

@Module({
  controllers: [UssesController],
  providers: [UssesService],
})
export class UssesModule {}
