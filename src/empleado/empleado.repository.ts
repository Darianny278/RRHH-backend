import { EntityRepository, Repository } from "typeorm";
import { EmpleadoEntity } from "./empleado.entity";

@EntityRepository(EmpleadoEntity)
export class EmpleadoRepository extends Repository<EmpleadoEntity> {

}