import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { NodesModule } from './nodes/nodes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, NodesModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
