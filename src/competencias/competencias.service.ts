import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompetenciasEntity } from './competencias.entity';
import { CompetenciasRepository } from './competencias.repository';
import { CompetenciasDto } from './dto/competenciasDto';

@Injectable()
export class CompetenciasService {
    constructor(
        @InjectRepository(CompetenciasEntity)
        private competenciasRepository: CompetenciasRepository
    ){}

    async getAll(): Promise<CompetenciasEntity[]> {
        const list = await this.competenciasRepository.find()

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de competencias esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<CompetenciasEntity> {
        const competencias = await this.competenciasRepository.findOneBy({ id: id })

        if (!competencias) {
            throw new NotFoundException({ message: 'competencias no existente' })
        }

        return competencias
    }

    async findByName(nombre: string): Promise<CompetenciasEntity> {
        const competencias = await this.competenciasRepository.findOneBy({ nombre: nombre })

        if (!competencias) {
            throw new NotFoundException({ message: 'competencias no existente' })
        }

        return competencias
    }

    async create(dto: CompetenciasDto): Promise<any> {
        const competencias = this.competenciasRepository.create(dto)

        await this.competenciasRepository.save(competencias)

        return { message: 'competencias creado' }
    }

    
    async update(id: number, dto: CompetenciasDto): Promise<any> {
        const competencias = await this.findById(id)

        competencias.nombre = dto.nombre ?? competencias.nombre
        competencias.estado = dto.estado ?? competencias.estado

        await this.competenciasRepository.save(competencias)

        return { message: 'competencias actualizado' }
    }

    async delete(id: number): Promise<any> {
        const competencias = await this.findById(id)

        await this.competenciasRepository.delete(competencias)

        return { message: 'competencias eliminado' }
    }
}
