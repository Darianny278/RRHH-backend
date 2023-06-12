import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { IdiomaDto } from './dto/idiomaDto';
import { IdiomaService } from './idioma.service';

@Controller('idioma')
export class IdiomaController {
    constructor(private readonly idiomaService: IdiomaService){}

    @Get()
    async getAll() {
        return await this.idiomaService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.idiomaService.findById(id)
    }

    @Post()
    async create(@Body() dto: IdiomaDto) {
        return await this.idiomaService.create(dto)
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: IdiomaDto) {
        return await this.idiomaService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.idiomaService.delete(id)
    }
}
