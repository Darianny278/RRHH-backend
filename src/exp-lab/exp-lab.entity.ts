import { CandidatoEntity } from "src/candidato/candidato.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'expLab' })
export class ExpLabEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    empresa: string

    @Column({ type: 'varchar' })
    puesto: string

    @Column({ type: 'varchar' })
    desde: string

    @Column({ type: 'varchar' })
    hasta: string

    @Column({ type: 'varchar' })
    salario: string

    @ManyToOne(() => CandidatoEntity, candidato => candidato.experiencias)
    candidato: CandidatoEntity;
}