import { EntityRepository, Repository } from "typeorm";
import { CompetenciasEntity } from "./competencias.entity";

@EntityRepository(CompetenciasEntity)
export class CompetenciasRepository extends Repository<CompetenciasEntity> {

}