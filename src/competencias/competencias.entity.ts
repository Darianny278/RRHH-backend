import { CandidatoEntity } from "src/candidato/candidato.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'competencias' })
export class CompetenciasEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    nombre: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @ManyToOne(() => CandidatoEntity, candidato => candidato.capacitaciones)
    candidato: CandidatoEntity;
}