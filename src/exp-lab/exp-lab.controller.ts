import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ExpLabService } from './exp-lab.service';
import { ExpLabDto } from './dto/exp-labDto';

@Controller('exp-lab')
export class ExpLabController {
    constructor(private readonly experienciasService: ExpLabService){}

    @Get()
    async getAll() {
        return await this.experienciasService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.experienciasService.findById(id)
    }

    @Post()
    async create(@Body() dto: ExpLabDto) {
        return await this.experienciasService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ExpLabDto) {
        return await this.experienciasService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.experienciasService.delete(id)
    }
}
