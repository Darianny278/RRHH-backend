import { CandidatoEntity } from "src/candidato/candidato.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'capacitaciones' })
export class CapacitacionesEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    descripcion: string

    @Column({ type: 'varchar' })
    nivel: string

    @Column({ type: 'varchar' })
    desde: string

    @Column({ type: 'varchar' })
    hasta: string

    @Column({ type: 'varchar' })
    institucion: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @ManyToOne(() => CandidatoEntity, candidato => candidato.capacitaciones)
    candidato: CandidatoEntity;
}