import { EntityRepository, Repository } from "typeorm";
import { PuestoEntity } from "./puesto.entity";

@EntityRepository(PuestoEntity)
export class PuestoRepository extends Repository<PuestoEntity> {

}