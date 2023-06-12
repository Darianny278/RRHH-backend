import { EntityRepository, Repository } from "typeorm";
import { ExpLabEntity } from "./exp-lab.entity";

@EntityRepository(ExpLabEntity)
export class ExpLabRepository extends Repository<ExpLabEntity> {

}