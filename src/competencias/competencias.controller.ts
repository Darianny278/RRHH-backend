import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CompetenciasDto } from './dto/competenciasDto';
import { CompetenciasService } from './competencias.service';

@Controller('competencias')
export class CompetenciasController {
    constructor(private readonly competenciasService: CompetenciasService){}

    @Get()
    async getAll() {
        return await this.competenciasService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.competenciasService.findById(id)
    }

    @Post()
    async create(@Body() dto: CompetenciasDto) {
        return await this.competenciasService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CompetenciasDto) {
        return await this.competenciasService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.competenciasService.delete(id)
    }
}
