import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'empleado' })
export class EmpleadoEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    nombre: string

    @Column({ type: 'varchar', unique: true })
    cedula: string

    @Column({ type: 'varchar' })
    fechaIngreso: string

    @Column({ type: 'varchar' })
    departamento: string

    @Column({ type: 'varchar' })
    puesto: string

    @Column({ type: 'varchar' })
    salario: string

    @Column({ type: 'boolean', default: true })
    estado: boolean
}