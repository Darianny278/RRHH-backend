import { CapacitacionesEntity } from 'src/capacitaciones/capacitaciones.entity';
import { CompetenciasEntity } from 'src/competencias/competencias.entity';
import { ExpLabEntity } from 'src/exp-lab/exp-lab.entity';
import { IdiomaEntity } from 'src/idioma/idioma.entity';
import { PuestoEntity } from 'src/puesto/puesto.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'candidato' })
export class CandidatoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar', unique: true })
  cedula: string;

  @Column({ type: 'varchar' })
  departamento: string;

  @Column({ type: 'varchar' })
  salarioAspirante: string;

  @Column({ type: 'varchar' })
  recomendado: string;

  @ManyToMany(() => PuestoEntity, (puesto) => puesto.candidatos)
  @JoinTable()
  puestos: PuestoEntity[];

  @OneToMany(
    () => CapacitacionesEntity,
    (capacitacion) => capacitacion.candidato,
  )
  @JoinTable()
  capacitaciones: CapacitacionesEntity[];

  @OneToMany(() => CompetenciasEntity, (competencia) => competencia.candidato)
  @JoinTable()
  competencias: CompetenciasEntity[];

  @OneToMany(() => ExpLabEntity, (experiencias) => experiencias.candidato)
  @JoinTable()
  experiencias: ExpLabEntity[];

  @ManyToMany(() => IdiomaEntity, (idioma) => idioma.candidatos)
  @JoinTable()
  idiomas: IdiomaEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
