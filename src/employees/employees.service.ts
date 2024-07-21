import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { updateEmployeesDto } from './dto/update-employees.dto';
import { Repository } from 'typeorm';
import { UserEntity} from 'src/entities/user.entity';



@Injectable()
export class EmployeesService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async createEmployee(createmployeesDto: CreateEmployeesDto): Promise<UserEntity> {
        const employee: UserEntity =this.userRepository.create(createmployeesDto);
         await this.userRepository.insert(employee);
         return employee;}

      
        buildHierarchy(employees) {
          const userMap = {};
          const hierarchy = {};
      
          // Create a map of all users
          employees.forEach(user => {
            userMap[user.id] = { ...user, children: [] };
          });
      
          // Build the hierarchy
          employees.forEach(employee => {
            if (employee.parentId === null) {
              hierarchy[employee.id] = userMap[employee.id];
            } else {
              if (userMap[employee.parentId]) {
                userMap[employee.parentId].children.push(userMap[employee.id]);
              }
            }
          });
      
          return hierarchy;
        }
      
        async getEmployeeHierarchy() {
          const users = await this.userRepository.find();
          // users.sort((a, b) => a.parentId - b.parentId);
          const hierarchy = this.buildHierarchy(users);
          return hierarchy;
        }
      
    getAllEmployee():
    Promise<UserEntity[]> {
    return this.userRepository.find();
       }
    
   getoneEmployee(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
       }

  updateEmployee(id: number, updateEmployeesDto: Partial<updateEmployeesDto>) {
    return this.userRepository.update(id,updateEmployeesDto);
      }
      async getChild(id: number): Promise<UserEntity[]> {
        return this.userRepository.find({
          where: {
            parentId: id,
          },
        });
      }

     deleteEmployee(id: number) {

    return this.userRepository.delete(id);
    
}
}
