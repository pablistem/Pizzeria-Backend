import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common/decorators';
import { IAuthRepository } from '../application/repository/auth.repository.interface';
import { Auth } from '../domain/auth.entity';


@Injectable()
export class AuthRepository implements IAuthRepository {
  repository: Repository<Auth>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Auth);
  }
  async saveRefreshToken(session: Auth):Promise<Auth>{
    const savedToken = this.repository.create(session)
    const newSession = await this.repository.save(savedToken)
    return newSession
  }

  async removeRefreshToken(id:number){
    const session = await this.repository.findOne({where:{id}})
    await this.repository.remove(session)
  }

}
