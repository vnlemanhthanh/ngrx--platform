import { SelectEntityId } from './models';

export function entityMeta<Entity, Collection extends string>(meta: {
  entity: Entity;
  collection: Collection;
  selectId: SelectEntityId<NoInfer<Entity>>;
}): typeof meta;
export function entityMeta<Entity>(meta: {
  entity: Entity;
  selectId: SelectEntityId<NoInfer<Entity>>;
}): typeof meta;
export function entityMeta<Entity, Collection extends string>(meta: {
  entity: Entity;
  collection: Collection;
}): typeof meta;
export function entityMeta<Entity>(meta: { entity: Entity }): typeof meta;
export function entityMeta<Entity>(meta: {
  entity: Entity;
  collection?: string;
  selectId?: SelectEntityId<Entity>;
}): typeof meta {
  return meta;
}
