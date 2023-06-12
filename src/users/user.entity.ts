import { CandidatoEntity } from 'src/candidato/candidato.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nombre: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @OneToOne(() => CandidatoEntity, (candidato) => candidato.user)
  candidato: CandidatoEntity;
}
