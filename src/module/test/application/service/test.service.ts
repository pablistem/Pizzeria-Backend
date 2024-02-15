import { Injectable } from '@nestjs/common';
import { fixturesTree } from 'src/common/fixtures/fixtureTree';
import { FixturesTree } from 'src/common/fixtures/types.fixture';
import { DataSource, EntityManager } from 'typeorm';

export interface IEntity {
  name: string;
  tableName: string;
  order: number;
}

@Injectable()
export class TestService {
  connectionManager: EntityManager;
  constructor(private dataSource: DataSource) {
    this.connectionManager = this.dataSource.createEntityManager();
  }

  async load(entities: IEntity[], fixture): Promise<void> {
    for (const entity of entities.sort((a, b) => a.order - b.order)) {
      try {
        const repository = this.connectionManager.getRepository(entity.name);
        const items = fixture[entity.name];

        await repository
          .createQueryBuilder(entity.name)
          .insert()
          .values(items)
          .execute();
      } catch (error) {
        throw new Error(
          `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
        );
      }
    }
  }

  async getEntities(fixture: FixturesTree): Promise<IEntity[]> {
    const entities = [];
    this.connectionManager.connection.entityMetadatas.forEach((entity) => {
      entities.push({
        name: entity.name,
        tableName: entity.tableName,
        order: this.getOrder(entity.name, fixture),
      });
    });
    return entities;
  }

  getOrder(entityName: string, fixture: FixturesTree): number {
    return Object.keys(fixture).indexOf(entityName);
  }

  entitiesWithFixtures(entities: IEntity[], fixture: FixturesTree) {
    return entities.filter(
      (entity) => Object.keys(fixture).indexOf(entity.name) !== -1,
    );
  }

  async loadDefault() {
    const entities = await this.getEntities(fixturesTree);
    const entitiesWithFixtures = this.entitiesWithFixtures(
      entities,
      fixturesTree,
    );
    await this.load(entities, entitiesWithFixtures);
  }
}
