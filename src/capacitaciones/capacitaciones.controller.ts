import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CapacitacionesService } from './capacitaciones.service';
import { CapacitacionesDto } from './dto/capacitacionesDto';

@Controller('capacitaciones')
export class CapacitacionesController {
    constructor(private readonly capacitacionesService: CapacitacionesService){}

    @Get()
    async getAll() {
        return await this.capacitacionesService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.capacitacionesService.findById(id)
    }

    @Post()
    async create(@Body() dto: CapacitacionesDto) {
        return await this.capacitacionesService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CapacitacionesDto) {
        return await this.capacitacionesService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.capacitacionesService.delete(id)
    }
}
