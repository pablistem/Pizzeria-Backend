import { Injectable } from '@nestjs/common';
import { fixturesTree } from 'src/common/fixtures/fixtureTree';
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

  async load(entities: IEntity[]): Promise<void> {
    for (const entity of entities.sort((a, b) => a.order - b.order)) {
      try {
        const repository = this.connectionManager.getRepository(entity.name);
        const items = fixturesTree[entity.name];

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

  async getEntities(): Promise<IEntity[]> {
    const entities = [];
    this.connectionManager.connection.entityMetadatas.forEach(entity => {
      entities.push({
        name: entity.name,
        tableName: entity.tableName,
        order: this.getOrder(entity.name),
        relations: entity.relations.forEach(relation => relation.inverseEntityMetadata.name)
      });
    });
    console.log(entities)
    return entities;
  }

  getOrder(entityName: string): number {
    return Object.keys(fixturesTree).indexOf(entityName);
  }

  entitiesWithFixtures(entities) {
    return entities.filter(
      (entity) => Object.keys(fixturesTree).indexOf(entity.name) !== -1,
    );
  }
}
