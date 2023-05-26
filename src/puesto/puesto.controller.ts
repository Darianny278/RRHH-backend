import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PuestoDto } from './dto/puestoDto';
import { PuestoService } from './puesto.service';

@Controller('puesto')
export class PuestoController {
    constructor(private readonly puestoService: PuestoService){}

    @Get()
    async getAll() {
        return await this.puestoService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.puestoService.findById(id)
    }

    @Post()
    async create(@Body() dto: PuestoDto) {
        return await this.puestoService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: PuestoDto) {
        return await this.puestoService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.puestoService.delete(id)
    }
}
