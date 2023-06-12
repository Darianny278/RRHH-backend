import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdiomaEntity } from './idioma.entity';
import { IdiomaRepository } from './idioma.repository';
import { IdiomaDto } from './dto/idiomaDto';

@Injectable()
export class IdiomaService {
    constructor(
        @InjectRepository(IdiomaEntity)
        private idiomaRepository: IdiomaRepository
    ){}

    async getAll(): Promise<IdiomaEntity[]> {
        const list = await this.idiomaRepository.find()

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de idiomas esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<IdiomaEntity> {
        const idioma = await this.idiomaRepository.findOneBy({ id: id })

        if (!idioma) {
            throw new NotFoundException({ message: 'Idioma no existente' })
        }

        return idioma
    }

    async findByName(nombre: string): Promise<IdiomaEntity> {
        const idioma = await this.idiomaRepository.findOneBy({ nombre: nombre })

        if (!idioma) {
            throw new NotFoundException({ message: 'Idioma no existente' })
        }

        return idioma
    }

    async create(dto: IdiomaDto): Promise<any> {
        const idioma = this.idiomaRepository.create(dto)

        await this.idiomaRepository.save(idioma)

        return { message: 'Idioma creado' }
    }

    
    async update(id: number, dto: IdiomaDto): Promise<any> {
        const idioma = await this.findById(id)

        idioma.nombre = dto.nombre ?? idioma.nombre
        idioma.estado = dto.estado ?? idioma.estado

        await this.idiomaRepository.save(idioma)

        return { message: 'Idioma actualizado' }
    }

    async delete(id: number): Promise<any> {
        const idioma = await this.findById(id)

        await this.idiomaRepository.delete(idioma)

        return { message: 'Idioma eliminado' }
    }
}
