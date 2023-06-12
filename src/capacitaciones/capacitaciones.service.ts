import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CapacitacionesEntity } from './capacitaciones.entity';
import { CapacitacionesRepository } from './capacitaciones.repository';
import { CapacitacionesDto } from './dto/capacitacionesDto';

@Injectable()
export class CapacitacionesService {
    constructor(
        @InjectRepository(CapacitacionesEntity)
        private capacitacionesRepository: CapacitacionesRepository
    ){}

    async getAll(): Promise<CapacitacionesEntity[]> {
        const list = await this.capacitacionesRepository.find({ relations: ['candidato']})

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de capacitaciones esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<CapacitacionesEntity> {
        const capacitacion = await this.capacitacionesRepository.findOneBy({ id: id })

        if (!capacitacion) {
            throw new NotFoundException({ message: 'Capacitacion no existente' })
        }

        return capacitacion
    }

    async create(dto: CapacitacionesDto): Promise<any> {
        const capacitacion = this.capacitacionesRepository.create(dto)

        await this.capacitacionesRepository.save(capacitacion)

        return { message: 'Capacitacion creado' }
    }

    
    async update(id: number, dto: CapacitacionesDto): Promise<any> {
        const capacitacion = await this.findById(id)

        capacitacion.descripcion = dto.descripcion ?? capacitacion.descripcion
        capacitacion.nivel = dto.nivel ?? capacitacion.nivel
        capacitacion.desde = dto.desde ?? capacitacion.desde
        capacitacion.hasta = dto.hasta ?? capacitacion.hasta
        capacitacion.institucion = dto.institucion ?? capacitacion.institucion
        capacitacion.estado = dto.estado ?? capacitacion.estado

        await this.capacitacionesRepository.save(capacitacion)

        return { message: 'Capacitacion actualizada' }
    }

    async delete(id: number): Promise<any> {
        const capacitacion = await this.findById(id)

        await this.capacitacionesRepository.delete(capacitacion)

        return { message: 'Capacitacion eliminado' }
    }
}
