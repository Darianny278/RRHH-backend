import { CandidatoEntity } from "src/candidato/candidato.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'puesto' })
export class PuestoEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    nombre: string

    @Column({ type: 'varchar' })
    nivelDeRiesgo: string

    @Column({ type: 'varchar' })
    nivelMinimoSalario: string

    @Column({ type: 'varchar' })
    nivelMaximoSalario: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @ManyToMany(() => CandidatoEntity, candidato => candidato.puestos)
    candidatos: CandidatoEntity[];
}