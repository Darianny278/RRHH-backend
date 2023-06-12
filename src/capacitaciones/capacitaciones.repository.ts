import { EntityRepository, Repository } from "typeorm";
import { CapacitacionesEntity } from "./capacitaciones.entity";

@EntityRepository(CapacitacionesEntity)
export class CapacitacionesRepository extends Repository<CapacitacionesEntity> {

}