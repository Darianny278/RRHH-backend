import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoDto } from './dto/empleadoDto';
import { EmpleadoEntity } from './empleado.entity';
import { EmpleadoRepository } from './empleado.repository';

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(EmpleadoEntity)
        private empleadoRepository: EmpleadoRepository
    ){}

    async getAll(): Promise<EmpleadoEntity[]> {
        const list = await this.empleadoRepository.find()

        if (!list.length) {
            throw new NotFoundException({ message: 'La lista de empleados esta vacia' })
        }

        return list
    }

    async findById(id: number): Promise<EmpleadoEntity> {
        const empleado = await this.empleadoRepository.findOneBy({ id: id })

        if (!empleado) {
            throw new NotFoundException({ message: 'Empleado no existente' })
        }

        return empleado
    }

    async findByName(nombre: string): Promise<EmpleadoEntity> {
        const empleado = await this.empleadoRepository.findOneBy({ nombre: nombre })

        if (!empleado) {
            throw new NotFoundException({ message: 'Empleado no existente' })
        }

        return empleado
    }

    async create(dto: EmpleadoDto): Promise<any> {
        const empleado = this.empleadoRepository.create(dto)

        await this.empleadoRepository.save(empleado)

        return { message: 'Empleado creado' }
    }

    
    async update(id: number, dto: EmpleadoDto): Promise<any> {
        const empleado = await this.findById(id)

        empleado.nombre = dto.nombre ?? empleado.nombre
        empleado.cedula = dto.cedula ?? empleado.cedula
        empleado.fechaIngreso = dto.fechaIngreso ?? empleado.fechaIngreso
        empleado.departamento = dto.departamento ?? empleado.departamento
        empleado.puesto = dto.puesto ?? empleado.puesto
        empleado.salario = dto.salario ?? empleado.salario
        empleado.estado = dto.estado ?? empleado.estado

        await this.empleadoRepository.save(empleado)

        return { message: 'Empleado actualizado' }
    }

    async delete(id: number): Promise<any> {
        const empleado = await this.findById(id)

        await this.empleadoRepository.delete(empleado)

        return { message: 'Empleado eliminado' }
    }
}
