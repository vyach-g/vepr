import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import { NodesModule } from './nodes/nodes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UsersModule, NodesModule, ProfilesModule, AuthModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
