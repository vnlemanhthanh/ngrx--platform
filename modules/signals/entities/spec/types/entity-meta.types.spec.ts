import { expecter } from 'ts-snippet';
import { compilerOptions } from './helpers';

describe('entityMeta', () => {
  const expectSnippet = expecter(
    (code) => `
        import { type } from '@ngrx/signals';
        import { entityMeta, SelectEntityId } from '@ngrx/signals/entities';

        type User = { key: number; name: string };

        ${code}
      `,
    compilerOptions()
  );

  it('fails when empty object is passed', () => {
    expectSnippet('entityMeta({})').toFail(
      /Property 'entity' is missing in type '{}'/
    );
  });

  it('succeeds when entity is passed', () => {
    const snippet = `
      const userMeta = entityMeta({ entity: type<User>() });
    `;

    expectSnippet(snippet).toSucceed();
    expectSnippet(snippet).toInfer('userMeta', '{ entity: User; }');
  });

  it('succeeds when entity and collection are passed', () => {
    const snippet = `
      const userMeta = entityMeta({
        entity: type<User>(),
        collection: 'user',
      });
    `;

    expectSnippet(snippet).toSucceed();
    expectSnippet(snippet).toInfer(
      'userMeta',
      '{ entity: User; collection: "user"; }'
    );
  });

  it('succeeds when entity and selectId are passed', () => {
    const snippet = `
      const userMeta1 = entityMeta({
        entity: type<User>(),
        selectId: (user) => user.key,
      });

      const selectId2 = (user: User) => user.key;
      const userMeta2 = entityMeta({
        entity: type<User>(),
        selectId: selectId2,
      });

      const selectId3: SelectEntityId<User> = (user) => user.key;
      const userMeta3 = entityMeta({
        entity: type<User>(),
        selectId: selectId3,
      });
    `;

    expectSnippet(snippet).toSucceed();
    expectSnippet(snippet).toInfer(
      'userMeta1',
      '{ entity: User; selectId: SelectEntityId<NoInfer<User>>; }'
    );
    expectSnippet(snippet).toInfer(
      'userMeta2',
      '{ entity: User; selectId: SelectEntityId<NoInfer<User>>; }'
    );
    expectSnippet(snippet).toInfer(
      'userMeta3',
      '{ entity: User; selectId: SelectEntityId<NoInfer<User>>; }'
    );
  });

  it('fails when entity and wrong selectId are passed', () => {
    expectSnippet(`
      const userMeta = entityMeta({
        entity: type<User>(),
        selectId: (user) => user.id,
      });
    `).toFail(/Property 'id' does not exist on type 'NoInfer<User>'/);

    expectSnippet(`
      const selectId = (entity: { key: number; foo: string }) => entity.key;

      const userMeta = entityMeta({
        entity: type<User>(),
        selectId,
      });
    `).toFail(/No overload matches this call/);

    expectSnippet(`
      const selectId: SelectEntityId<{ key: string }> = (entity) => entity.key;

      const userMeta = entityMeta({
        entity: type<User>(),
        selectId,
      });
    `).toFail(/No overload matches this call/);
  });

  it('succeeds when entity, collection, and selectId are passed', () => {
    const snippet = `
      const userMeta1 = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId: (user) => user.key,
      });

      const selectId2 = (user: { key: number }) => user.key;
      const userMeta2 = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId: selectId2,
      });

      const selectId3: SelectEntityId<User> = (user) => user.key;
      const userMeta3 = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId: selectId3,
      });
    `;

    expectSnippet(snippet).toSucceed();
    expectSnippet(snippet).toInfer(
      'userMeta1',
      '{ entity: User; collection: "user"; selectId: SelectEntityId<NoInfer<User>>; }'
    );
    expectSnippet(snippet).toInfer(
      'userMeta2',
      '{ entity: User; collection: "user"; selectId: SelectEntityId<NoInfer<User>>; }'
    );
    expectSnippet(snippet).toInfer(
      'userMeta3',
      '{ entity: User; collection: "user"; selectId: SelectEntityId<NoInfer<User>>; }'
    );
  });

  it('fails when entity, collection, and wrong selectId are passed', () => {
    expectSnippet(`
      const userMeta = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId: (user) => user.id,
      });
    `).toFail(/Property 'id' does not exist on type 'NoInfer<User>'/);

    expectSnippet(`
      const selectId = (entity: { key: number; foo: string }) => entity.key;

      const userMeta = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId,
      });
    `).toFail(/No overload matches this call/);

    expectSnippet(`
      const selectId: SelectEntityId<{ key: string }> = (entity) => entity.key;

      const userMeta = entityMeta({
        entity: type<User>(),
        collection: 'user',
        selectId,
      });
    `).toFail(/No overload matches this call/);
  });
});
