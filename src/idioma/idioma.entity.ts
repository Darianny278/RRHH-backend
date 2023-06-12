import { CandidatoEntity } from "src/candidato/candidato.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'idioma' })
export class IdiomaEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    nombre: string

    @Column({ type: 'boolean', default: true })
    estado: boolean

    @ManyToMany(() => CandidatoEntity, candidato => candidato.puestos)
    candidatos: CandidatoEntity[];
}