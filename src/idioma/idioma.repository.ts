import { EntityRepository, Repository } from "typeorm";
import { IdiomaEntity } from "./Idioma.entity";

@EntityRepository(IdiomaEntity)
export class IdiomaRepository extends Repository<IdiomaEntity> {

}