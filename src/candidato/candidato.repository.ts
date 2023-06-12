import { EntityRepository, Repository } from "typeorm";
import { CandidatoEntity } from "./candidato.entity";

@EntityRepository(CandidatoEntity)
export class CandidatoRepository extends Repository<CandidatoEntity> {

}