import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoDto } from './dto/empleadoDto';

@Controller('empleado')
export class EmpleadoController {
    constructor(private readonly empleadoService: EmpleadoService){}

    @Get()
    async getAll() {
        return await this.empleadoService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.empleadoService.findById(id)
    }

    @Post()
    async create(@Body() dto: EmpleadoDto) {
        return await this.empleadoService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: EmpleadoDto) {
        return await this.empleadoService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.empleadoService.delete(id)
    }
}
