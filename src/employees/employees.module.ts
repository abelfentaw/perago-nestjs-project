import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { UserEntity} from 'src/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],

  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
