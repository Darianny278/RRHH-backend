import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PuestoDto } from './dto/puestoDto';
import { PuestoEntity } from './puesto.entity';
import { PuestoRepository } from './puesto.repository';

@Injectable()
export class PuestoService {
    constructor(
        @InjectRepository(PuestoEntity)
        private puestoRepository: PuestoRepository
    ){}

    async getAll(): Promise<PuestoEntity[]> {
        const list = await this.puestoRepository.find()

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<PuestoEntity> {
        const puesto = await this.puestoRepository.findOneBy({ id: id })

        if (!puesto) {
            throw new NotFoundException({ message: 'Puesto no existente' })
        }

        return puesto
    }

    async findByName(nombre: string): Promise<PuestoEntity> {
        const puesto = await this.puestoRepository.findOneBy({ nombre: nombre })

        if (!puesto) {
            throw new NotFoundException({ message: 'Puesto no existente' })
        }

        return puesto
    }

    async create(dto: PuestoDto): Promise<any> {
        const puesto = this.puestoRepository.create(dto)

        await this.puestoRepository.save(puesto)

        return { message: 'Puesto creado' }
    }

    
    async update(id: number, dto: PuestoDto): Promise<any> {
        const puesto = await this.findById(id)

        puesto.nombre = dto.nombre ?? puesto.nombre
        puesto.nivelDeRiesgo = dto.nivelDeRiesgo ?? puesto.nivelDeRiesgo
        puesto.nivelMinimoSalario = dto.nivelMinimoSalario ?? puesto.nivelMinimoSalario
        puesto.nivelMaximoSalario = dto.nivelMaximoSalario ?? puesto.nivelMaximoSalario
        puesto.estado = dto.estado ?? puesto.estado

        await this.puestoRepository.save(puesto)

        return { message: 'Puesto actualizado' }
    }

    async delete(id: number): Promise<any> {
        const puesto = await this.findById(id)

        await this.puestoRepository.delete(puesto)

        return { message: 'Puesto eliminado' }
    }
}
