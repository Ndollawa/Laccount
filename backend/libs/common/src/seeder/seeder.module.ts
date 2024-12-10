import { Module, forwardRef } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { AppsettingModule } from 'src/appsetting';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [forwardRef(() => AppsettingModule), forwardRef(() => UserModule)],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
