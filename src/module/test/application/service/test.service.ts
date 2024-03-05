import { Injectable } from '@nestjs/common';
import { fixturesTree } from 'src/common/fixtures/fixtureTree';
import { FixturesTree } from 'src/common/fixtures/types.fixture';
import { DataSource, EntityManager } from 'typeorm';

export interface IEntity {
  name: string;
  tableName: string;
  order: number;
  relations: string;
}

@Injectable()
export class TestService {
  connectionManager: EntityManager;
  constructor(private dataSource: DataSource) {
    this.connectionManager = this.dataSource.createEntityManager();
  }

  async load(fixture: FixturesTree): Promise<void> {
    const entities = await this.getEntities(fixture);
    const entitiesWithFixtures = this.entitiesWithFixtures(entities, fixture);
    for (const entity of entitiesWithFixtures.sort(
      (a, b) => a.order - b.order,
    )) {
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
    this.connectionManager.connection.entityMetadatas.forEach(entity => {
      entities.push({
        name: entity.name,
        tableName: entity.tableName,
        order: this.getOrder(entity.name, fixture),
        relation: entity.relations.forEach(relation => relation.foreignKeys)
      });
    });
    return entities;
  }

  getOrder(entityName: string, fixture: FixturesTree): number {
    return Object.keys(fixture).indexOf(entityName);
  }

  entitiesWithFixtures(entities: IEntity[], fixture: FixturesTree): IEntity[] {
    return entities.filter(
      (entity) => Object.keys(fixture).indexOf(entity.name) !== -1,
    );
  }

  async loadDefault() {
    await this.load(fixturesTree);
  }
}
