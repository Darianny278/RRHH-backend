import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoDto } from './dto/candidatoDto';

@Controller('candidato')
export class CandidatoController {
    constructor(private readonly candidatoService: CandidatoService) { }

    @Get()
    async getAll() {
        return await this.candidatoService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.candidatoService.findById(id)
    }

    @Post()
    async create(
        @Body() { userId, dto}: any
        ) {
        return await this.candidatoService.create(dto, userId)
    }

    @Post('/addPuesto')
    async addPuestoToCandidato(
        @Body() { candidatoId, puestoId }: any
    ) {
        return await this.candidatoService.assignPuesto(candidatoId, puestoId);
    }

    @Post('/addCapacitaciones')
    async addCapacitacionesToCandidato(
        @Body() { candidatoId, capacitacionDto }: any
    ) {
        return await this.candidatoService.addCapacitacion(candidatoId, capacitacionDto);
    }

    @Post('/addCompetencias')
    async addCompetenciasToCandidato(
        @Body() { candidatoId, competenciaDto: competenciaDto }: any
    ) {
        return await this.candidatoService.addCompetencia(candidatoId, competenciaDto);
    }

    @Post('/addExpLab')
    async addExpLabToCandidato(
        @Body() { candidatoId, expLabDto: expLabDto }: any
    ) {
        return await this.candidatoService.addExperienciaLaboral(candidatoId, expLabDto);
    }

    @Post('/addIdioma')
    async addIdiomaToCandidato(
        @Body() { candidatoId, idiomaId }: any
    ) {
        return await this.candidatoService.addIdioma(candidatoId, idiomaId);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CandidatoDto) {
        return await this.candidatoService.update(id, dto)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.candidatoService.delete(id)
    }
}
