import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidatoEntity } from './candidato.entity';
import { CandidatoRepository } from './candidato.repository';
import { CandidatoDto } from './dto/candidatoDto';
import { PuestoRepository } from 'src/puesto/puesto.repository';
import { PuestoEntity } from 'src/puesto/puesto.entity';
import { CapacitacionesRepository } from 'src/capacitaciones/capacitaciones.repository';
import { CapacitacionesEntity } from 'src/capacitaciones/capacitaciones.entity';
import { CompetenciasRepository } from 'src/competencias/competencias.repository';
import { CompetenciasEntity } from 'src/competencias/competencias.entity';
import { IdiomaRepository } from 'src/idioma/idioma.repository';
import { IdiomaEntity } from 'src/idioma/idioma.entity';
import { ExpLabRepository } from 'src/exp-lab/exp-lab.repository';
import { ExpLabEntity } from 'src/exp-lab/exp-lab.entity';
import { UserEntity } from 'src/users/user.entity';
import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class CandidatoService {
    constructor(
        @InjectRepository(CandidatoEntity)
        private candidatoRepository: CandidatoRepository,
        @InjectRepository(PuestoEntity)
        private puestoRepository: PuestoRepository,
        @InjectRepository(CapacitacionesEntity)
        private capacitacionRepository: CapacitacionesRepository,
        @InjectRepository(CompetenciasEntity)
        private competenciasRepository: CompetenciasRepository,
        @InjectRepository(IdiomaEntity)
        private idiomaRepository: IdiomaRepository,
        @InjectRepository(ExpLabEntity)
        private expLabRepository: ExpLabRepository,
        @InjectRepository(UserEntity)
        private userRepository: UserRepository,
    ) { }

    async getAll(): Promise<CandidatoEntity[]> {
        const list = await this.candidatoRepository.find({ relations: ['puestos', 'capacitaciones','user', 'competencias', 'idiomas', 'experiencias'] })

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de candidatos esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<CandidatoEntity> {
        const candidato = await this.candidatoRepository.findOneBy({ id: id })

        if (!candidato) {
            throw new NotFoundException({ message: 'Candidato no existente' })
        }

        return candidato
    }

    async findByName(nombre: string): Promise<CandidatoEntity> {
        const candidato = await this.candidatoRepository.findOneBy({ nombre: nombre })

        if (!candidato) {
            throw new NotFoundException({ message: 'Candidato no existente' })
        }

        return candidato
    }

    async create(dto: CandidatoDto, userId: number): Promise<any> {
        const candidato = this.candidatoRepository.create(dto)
        const user = await this.userRepository.findOneBy({id: userId});
        candidato.user = user;

        await this.candidatoRepository.save(candidato)

        return { message: 'Candidato creado' }
    }

    async assignPuesto(candidatoId: number, puestoId: number): Promise<void> {
        const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId }, relations: ['puestos'] });
        const puesto = await this.puestoRepository.findOne({ where: { id: puestoId } })

        if (!candidato || !puesto) {
            throw new Error('Candidato o puesto no encontrado');
        }

        candidato.puestos.push(puesto);
        await this.candidatoRepository.save(candidato);
    }

    async addCapacitacion(candidatoId: number, capacitacion: CapacitacionesEntity): Promise<CapacitacionesEntity> {
        const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId }, relations: ['capacitaciones'] });

        if (!candidato) {
            throw new Error('Candidato no encontrado');
        }

        capacitacion.candidato = candidato;
        const nuevaCapacitacion = await this.capacitacionRepository.save(capacitacion);
        candidato.capacitaciones.push(nuevaCapacitacion);
        await this.candidatoRepository.save(candidato);

        return nuevaCapacitacion;
    }

    async addCompetencia(candidatoId: number, competencia: CompetenciasEntity): Promise<CompetenciasEntity> {
        const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId }, relations: ['competencias'] });

        if (!candidato) {
            throw new Error('Candidato no encontrado');
        }

        competencia.candidato = candidato;
        const nuevaCompetencia = await this.competenciasRepository.save(competencia);
        candidato.competencias.push(nuevaCompetencia);
        await this.candidatoRepository.save(candidato);

        return nuevaCompetencia;
    }

    async addExperienciaLaboral(candidatoId: number, experiencia: ExpLabEntity): Promise<ExpLabEntity> {
        const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId }, relations: ['experiencias'] });

        if (!candidato) {
            throw new Error('Candidato no encontrado');
        }

        experiencia.candidato = candidato;
        const nuevaExperiencia = await this.expLabRepository.save(experiencia);
        candidato.experiencias.push(nuevaExperiencia);
        await this.candidatoRepository.save(candidato);

        return nuevaExperiencia;
    }

    async addIdioma(candidatoId: number, idiomaId: number): Promise<IdiomaEntity> {
        const candidato = await this.candidatoRepository.findOne({ where: { id: candidatoId }, relations: ['idiomas'] });

        if (!candidato) {
            throw new Error('Candidato no encontrado');
        }

        const idioma = await this.idiomaRepository.findOneBy({ id: idiomaId });
        candidato.idiomas.push(idioma);
        await this.candidatoRepository.save(candidato);

        return idioma;
    }

    async update(id: number, dto: CandidatoDto): Promise<any> {
        const candidato = await this.findById(id)

        candidato.nombre = dto.nombre ?? candidato.nombre
        candidato.cedula = dto.cedula ?? candidato.cedula
        candidato.departamento = dto.departamento ?? candidato.departamento
        candidato.salarioAspirante = dto.salarioAspirante ?? candidato.salarioAspirante
        candidato.recomendado = dto.recomendado ?? candidato.recomendado

        await this.candidatoRepository.save(candidato)

        return { message: 'Candidato actualizado' }
    }

    async delete(id: number): Promise<any> {
        const candidato = await this.findById(id)

        await this.candidatoRepository.delete(candidato)

        return { message: 'Candidato eliminado' }
    }
}
