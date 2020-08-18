---
kind: InterfaceDeclaration
name: EntityActionPayload
module: data
---

# EntityActionPayload

```ts
interface EntityActionPayload<P = any> {
  readonly entityName: string;
  readonly entityOp: EntityOp;
  readonly data?: P;

  // inherited from EntityActionOptions
  readonly correlationId?: any;
  readonly isOptimistic?: boolean;
  readonly mergeStrategy?: MergeStrategy;
  readonly tag?: string;
  error?: Error;
  skip?: boolean;
}
```