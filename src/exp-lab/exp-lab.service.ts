import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpLabDto } from './dto/exp-labDto';
import { ExpLabEntity } from './exp-lab.entity';
import { ExpLabRepository } from './exp-lab.repository';

@Injectable()
export class ExpLabService {
    constructor(
        @InjectRepository(ExpLabEntity)
        private experienciasRepository: ExpLabRepository
    ){}

    async getAll(): Promise<ExpLabEntity[]> {
        const list = await this.experienciasRepository.find({ relations: ['candidato']})

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de expLab esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<ExpLabEntity> {
        const expLab = await this.experienciasRepository.findOneBy({ id: id })

        if (!expLab) {
            throw new NotFoundException({ message: 'ExpLab no existente' })
        }

        return expLab
    }

    async create(dto: ExpLabDto): Promise<any> {
        const expLab = this.experienciasRepository.create(dto)

        await this.experienciasRepository.save(expLab)

        return { message: 'expLab creado' }
    }

    
    async update(id: number, dto: ExpLabDto): Promise<any> {
        const expLab = await this.findById(id)

        expLab.empresa = dto.empresa ?? expLab.empresa
        expLab.puesto = dto.puesto ?? expLab.puesto
        expLab.desde = dto.desde ?? expLab.desde
        expLab.hasta = dto.hasta ?? expLab.hasta
        expLab.salario = dto.salario ?? expLab.salario

        await this.experienciasRepository.save(expLab)

        return { message: 'expLab actualizada' }
    }

    async delete(id: number): Promise<any> {
        const expLab = await this.findById(id)

        await this.experienciasRepository.delete(expLab)

        return { message: 'expLab eliminado' }
    }
}
