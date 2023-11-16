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
  async saveRefreshToken(session: Auth): Promise<Auth> {
    const newSession = await this.repository.save(session);
    return newSession;
  }

  async removeRefreshToken(token: string) {
    const session = await this.repository.findOne({
      where: { refreshToken: token },
    });
    await this.repository.remove(session);
  }
}
