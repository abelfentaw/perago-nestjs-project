import {Post,Body,Get,Param,Patch,Put,Delete,ValidationPipe, Controller } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { updateEmployeesDto } from './dto/update-employees.dto';
import { UserEntity} from 'src/entities/user.entity';


@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService:EmployeesService) {}
    @Post()             
    createEmployee(@Body(ValidationPipe) createEmployeeDto: CreateEmployeesDto ){
        return this.employeesService.createEmployee(createEmployeeDto); }

    @Patch(':id')        
     
        updateEmployee(@Param('id') id:number,@Body(ValidationPipe) updateEmployeeDto: updateEmployeesDto){
           return this.employeesService.updateEmployee(id,updateEmployeeDto);
       }

       @Get('hierarchy')
       async getEmployeeHierarchy(): Promise<any> {
      return this.employeesService.getEmployeeHierarchy();
         }

    @Get(':id')          
   
       getoneEmployee(@Param('id')id:number){
       return this.employeesService.getoneEmployee(id);
       }

   
       
    @Get()       
       getAllEmployee(){
           return this.employeesService.getAllEmployee();
       }
    @Delete(':id')       
    
        delateEmployee(@Param('id') id:number){
           return this.employeesService.deleteEmployee(id);
           }
 
    @Get(':id/child')    
    async getChildren(@Param('id') id: number): Promise<UserEntity[]> {
      return this.employeesService.getChild(id);
    }
   
}
