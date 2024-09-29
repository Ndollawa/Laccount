import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { SeederModule } from './seeder/seeder.module';
import { RedisModule } from './redis/redis.module';
import { Appsetting } from 'src/appsetting/entities/appsetting.entity';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [Appsetting, SeederModule, RedisModule],
})
export class CommonModule {}
