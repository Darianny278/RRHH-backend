import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'puesto' })
export class PuestoEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 30, nullable: false })
    nombre: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    nivelDeRiesgo: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    nivelMinimoSalario: string

    @Column({ type: 'varchar', length: 30, nullable: false })
    nivelMaximoSalario: string

    @Column({ type: 'boolean', nullable: false })
    estado: boolean
}