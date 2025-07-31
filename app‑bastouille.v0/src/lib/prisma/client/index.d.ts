
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Culture
 * Defines the Culture table. A culture describes a plant variety you grow
 * (e.g. tomato, basil, rose). Each culture has a UUID primary key, a name,
 * an image filename (PNG) used for display, a category, and a harvesting
 * mode. A culture can have many harvests associated with it.
 */
export type Culture = $Result.DefaultSelection<Prisma.$CulturePayload>
/**
 * Model Recolte
 * Defines the Recolte table. A recolte (harvest) records the details of a
 * specific harvesting event: the culture harvested, the datetime, the
 * weight harvested (in grams), and optionally the number of units harvested
 * when the culture's mode is poids_unite. Weather data are stored
 * alongside the harvest to help analyse growing conditions.
 */
export type Recolte = $Result.DefaultSelection<Prisma.$RecoltePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Categorie: {
  fruit: 'fruit',
  legume: 'legume',
  aromatique: 'aromatique',
  fleur: 'fleur'
};

export type Categorie = (typeof Categorie)[keyof typeof Categorie]


export const ModeRecolte: {
  poids: 'poids',
  poids_unite: 'poids_unite'
};

export type ModeRecolte = (typeof ModeRecolte)[keyof typeof ModeRecolte]

}

export type Categorie = $Enums.Categorie

export const Categorie: typeof $Enums.Categorie

export type ModeRecolte = $Enums.ModeRecolte

export const ModeRecolte: typeof $Enums.ModeRecolte

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Cultures
 * const cultures = await prisma.culture.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Cultures
   * const cultures = await prisma.culture.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.culture`: Exposes CRUD operations for the **Culture** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cultures
    * const cultures = await prisma.culture.findMany()
    * ```
    */
  get culture(): Prisma.CultureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recolte`: Exposes CRUD operations for the **Recolte** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recoltes
    * const recoltes = await prisma.recolte.findMany()
    * ```
    */
  get recolte(): Prisma.RecolteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Culture: 'Culture',
    Recolte: 'Recolte'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "culture" | "recolte"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Culture: {
        payload: Prisma.$CulturePayload<ExtArgs>
        fields: Prisma.CultureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CultureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CultureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          findFirst: {
            args: Prisma.CultureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CultureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          findMany: {
            args: Prisma.CultureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>[]
          }
          create: {
            args: Prisma.CultureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          createMany: {
            args: Prisma.CultureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CultureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>[]
          }
          delete: {
            args: Prisma.CultureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          update: {
            args: Prisma.CultureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          deleteMany: {
            args: Prisma.CultureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CultureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CultureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>[]
          }
          upsert: {
            args: Prisma.CultureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CulturePayload>
          }
          aggregate: {
            args: Prisma.CultureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCulture>
          }
          groupBy: {
            args: Prisma.CultureGroupByArgs<ExtArgs>
            result: $Utils.Optional<CultureGroupByOutputType>[]
          }
          count: {
            args: Prisma.CultureCountArgs<ExtArgs>
            result: $Utils.Optional<CultureCountAggregateOutputType> | number
          }
        }
      }
      Recolte: {
        payload: Prisma.$RecoltePayload<ExtArgs>
        fields: Prisma.RecolteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecolteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecolteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          findFirst: {
            args: Prisma.RecolteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecolteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          findMany: {
            args: Prisma.RecolteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>[]
          }
          create: {
            args: Prisma.RecolteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          createMany: {
            args: Prisma.RecolteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecolteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>[]
          }
          delete: {
            args: Prisma.RecolteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          update: {
            args: Prisma.RecolteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          deleteMany: {
            args: Prisma.RecolteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecolteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecolteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>[]
          }
          upsert: {
            args: Prisma.RecolteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecoltePayload>
          }
          aggregate: {
            args: Prisma.RecolteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecolte>
          }
          groupBy: {
            args: Prisma.RecolteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecolteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecolteCountArgs<ExtArgs>
            result: $Utils.Optional<RecolteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    culture?: CultureOmit
    recolte?: RecolteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CultureCountOutputType
   */

  export type CultureCountOutputType = {
    recoltes: number
  }

  export type CultureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recoltes?: boolean | CultureCountOutputTypeCountRecoltesArgs
  }

  // Custom InputTypes
  /**
   * CultureCountOutputType without action
   */
  export type CultureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CultureCountOutputType
     */
    select?: CultureCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CultureCountOutputType without action
   */
  export type CultureCountOutputTypeCountRecoltesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecolteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Culture
   */

  export type AggregateCulture = {
    _count: CultureCountAggregateOutputType | null
    _min: CultureMinAggregateOutputType | null
    _max: CultureMaxAggregateOutputType | null
  }

  export type CultureMinAggregateOutputType = {
    id: string | null
    nom: string | null
    img: string | null
    categorie: $Enums.Categorie | null
    modeRecolte: $Enums.ModeRecolte | null
  }

  export type CultureMaxAggregateOutputType = {
    id: string | null
    nom: string | null
    img: string | null
    categorie: $Enums.Categorie | null
    modeRecolte: $Enums.ModeRecolte | null
  }

  export type CultureCountAggregateOutputType = {
    id: number
    nom: number
    img: number
    categorie: number
    modeRecolte: number
    _all: number
  }


  export type CultureMinAggregateInputType = {
    id?: true
    nom?: true
    img?: true
    categorie?: true
    modeRecolte?: true
  }

  export type CultureMaxAggregateInputType = {
    id?: true
    nom?: true
    img?: true
    categorie?: true
    modeRecolte?: true
  }

  export type CultureCountAggregateInputType = {
    id?: true
    nom?: true
    img?: true
    categorie?: true
    modeRecolte?: true
    _all?: true
  }

  export type CultureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Culture to aggregate.
     */
    where?: CultureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cultures to fetch.
     */
    orderBy?: CultureOrderByWithRelationInput | CultureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CultureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cultures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cultures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cultures
    **/
    _count?: true | CultureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CultureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CultureMaxAggregateInputType
  }

  export type GetCultureAggregateType<T extends CultureAggregateArgs> = {
        [P in keyof T & keyof AggregateCulture]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCulture[P]>
      : GetScalarType<T[P], AggregateCulture[P]>
  }




  export type CultureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CultureWhereInput
    orderBy?: CultureOrderByWithAggregationInput | CultureOrderByWithAggregationInput[]
    by: CultureScalarFieldEnum[] | CultureScalarFieldEnum
    having?: CultureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CultureCountAggregateInputType | true
    _min?: CultureMinAggregateInputType
    _max?: CultureMaxAggregateInputType
  }

  export type CultureGroupByOutputType = {
    id: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
    _count: CultureCountAggregateOutputType | null
    _min: CultureMinAggregateOutputType | null
    _max: CultureMaxAggregateOutputType | null
  }

  type GetCultureGroupByPayload<T extends CultureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CultureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CultureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CultureGroupByOutputType[P]>
            : GetScalarType<T[P], CultureGroupByOutputType[P]>
        }
      >
    >


  export type CultureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    img?: boolean
    categorie?: boolean
    modeRecolte?: boolean
    recoltes?: boolean | Culture$recoltesArgs<ExtArgs>
    _count?: boolean | CultureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["culture"]>

  export type CultureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    img?: boolean
    categorie?: boolean
    modeRecolte?: boolean
  }, ExtArgs["result"]["culture"]>

  export type CultureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nom?: boolean
    img?: boolean
    categorie?: boolean
    modeRecolte?: boolean
  }, ExtArgs["result"]["culture"]>

  export type CultureSelectScalar = {
    id?: boolean
    nom?: boolean
    img?: boolean
    categorie?: boolean
    modeRecolte?: boolean
  }

  export type CultureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nom" | "img" | "categorie" | "modeRecolte", ExtArgs["result"]["culture"]>
  export type CultureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recoltes?: boolean | Culture$recoltesArgs<ExtArgs>
    _count?: boolean | CultureCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CultureIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CultureIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CulturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Culture"
    objects: {
      /**
       * List of harvests associated with this culture
       */
      recoltes: Prisma.$RecoltePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * Universally unique identifier for the culture
       */
      id: string
      /**
       * Human‑readable name of the culture
       */
      nom: string
      /**
       * Filename of the illustration PNG stored in the `public` folder
       */
      img: string
      /**
       * Category of the culture (fruit, legume, aromatique, fleur)
       */
      categorie: $Enums.Categorie
      /**
       * How harvests for this culture are measured (poids or poids_unite)
       */
      modeRecolte: $Enums.ModeRecolte
    }, ExtArgs["result"]["culture"]>
    composites: {}
  }

  type CultureGetPayload<S extends boolean | null | undefined | CultureDefaultArgs> = $Result.GetResult<Prisma.$CulturePayload, S>

  type CultureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CultureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CultureCountAggregateInputType | true
    }

  export interface CultureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Culture'], meta: { name: 'Culture' } }
    /**
     * Find zero or one Culture that matches the filter.
     * @param {CultureFindUniqueArgs} args - Arguments to find a Culture
     * @example
     * // Get one Culture
     * const culture = await prisma.culture.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CultureFindUniqueArgs>(args: SelectSubset<T, CultureFindUniqueArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Culture that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CultureFindUniqueOrThrowArgs} args - Arguments to find a Culture
     * @example
     * // Get one Culture
     * const culture = await prisma.culture.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CultureFindUniqueOrThrowArgs>(args: SelectSubset<T, CultureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Culture that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureFindFirstArgs} args - Arguments to find a Culture
     * @example
     * // Get one Culture
     * const culture = await prisma.culture.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CultureFindFirstArgs>(args?: SelectSubset<T, CultureFindFirstArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Culture that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureFindFirstOrThrowArgs} args - Arguments to find a Culture
     * @example
     * // Get one Culture
     * const culture = await prisma.culture.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CultureFindFirstOrThrowArgs>(args?: SelectSubset<T, CultureFindFirstOrThrowArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cultures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cultures
     * const cultures = await prisma.culture.findMany()
     * 
     * // Get first 10 Cultures
     * const cultures = await prisma.culture.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cultureWithIdOnly = await prisma.culture.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CultureFindManyArgs>(args?: SelectSubset<T, CultureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Culture.
     * @param {CultureCreateArgs} args - Arguments to create a Culture.
     * @example
     * // Create one Culture
     * const Culture = await prisma.culture.create({
     *   data: {
     *     // ... data to create a Culture
     *   }
     * })
     * 
     */
    create<T extends CultureCreateArgs>(args: SelectSubset<T, CultureCreateArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cultures.
     * @param {CultureCreateManyArgs} args - Arguments to create many Cultures.
     * @example
     * // Create many Cultures
     * const culture = await prisma.culture.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CultureCreateManyArgs>(args?: SelectSubset<T, CultureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cultures and returns the data saved in the database.
     * @param {CultureCreateManyAndReturnArgs} args - Arguments to create many Cultures.
     * @example
     * // Create many Cultures
     * const culture = await prisma.culture.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cultures and only return the `id`
     * const cultureWithIdOnly = await prisma.culture.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CultureCreateManyAndReturnArgs>(args?: SelectSubset<T, CultureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Culture.
     * @param {CultureDeleteArgs} args - Arguments to delete one Culture.
     * @example
     * // Delete one Culture
     * const Culture = await prisma.culture.delete({
     *   where: {
     *     // ... filter to delete one Culture
     *   }
     * })
     * 
     */
    delete<T extends CultureDeleteArgs>(args: SelectSubset<T, CultureDeleteArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Culture.
     * @param {CultureUpdateArgs} args - Arguments to update one Culture.
     * @example
     * // Update one Culture
     * const culture = await prisma.culture.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CultureUpdateArgs>(args: SelectSubset<T, CultureUpdateArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cultures.
     * @param {CultureDeleteManyArgs} args - Arguments to filter Cultures to delete.
     * @example
     * // Delete a few Cultures
     * const { count } = await prisma.culture.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CultureDeleteManyArgs>(args?: SelectSubset<T, CultureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cultures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cultures
     * const culture = await prisma.culture.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CultureUpdateManyArgs>(args: SelectSubset<T, CultureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cultures and returns the data updated in the database.
     * @param {CultureUpdateManyAndReturnArgs} args - Arguments to update many Cultures.
     * @example
     * // Update many Cultures
     * const culture = await prisma.culture.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cultures and only return the `id`
     * const cultureWithIdOnly = await prisma.culture.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CultureUpdateManyAndReturnArgs>(args: SelectSubset<T, CultureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Culture.
     * @param {CultureUpsertArgs} args - Arguments to update or create a Culture.
     * @example
     * // Update or create a Culture
     * const culture = await prisma.culture.upsert({
     *   create: {
     *     // ... data to create a Culture
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Culture we want to update
     *   }
     * })
     */
    upsert<T extends CultureUpsertArgs>(args: SelectSubset<T, CultureUpsertArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cultures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureCountArgs} args - Arguments to filter Cultures to count.
     * @example
     * // Count the number of Cultures
     * const count = await prisma.culture.count({
     *   where: {
     *     // ... the filter for the Cultures we want to count
     *   }
     * })
    **/
    count<T extends CultureCountArgs>(
      args?: Subset<T, CultureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CultureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Culture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CultureAggregateArgs>(args: Subset<T, CultureAggregateArgs>): Prisma.PrismaPromise<GetCultureAggregateType<T>>

    /**
     * Group by Culture.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CultureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CultureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CultureGroupByArgs['orderBy'] }
        : { orderBy?: CultureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CultureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCultureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Culture model
   */
  readonly fields: CultureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Culture.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CultureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recoltes<T extends Culture$recoltesArgs<ExtArgs> = {}>(args?: Subset<T, Culture$recoltesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Culture model
   */
  interface CultureFieldRefs {
    readonly id: FieldRef<"Culture", 'String'>
    readonly nom: FieldRef<"Culture", 'String'>
    readonly img: FieldRef<"Culture", 'String'>
    readonly categorie: FieldRef<"Culture", 'Categorie'>
    readonly modeRecolte: FieldRef<"Culture", 'ModeRecolte'>
  }
    

  // Custom InputTypes
  /**
   * Culture findUnique
   */
  export type CultureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter, which Culture to fetch.
     */
    where: CultureWhereUniqueInput
  }

  /**
   * Culture findUniqueOrThrow
   */
  export type CultureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter, which Culture to fetch.
     */
    where: CultureWhereUniqueInput
  }

  /**
   * Culture findFirst
   */
  export type CultureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter, which Culture to fetch.
     */
    where?: CultureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cultures to fetch.
     */
    orderBy?: CultureOrderByWithRelationInput | CultureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cultures.
     */
    cursor?: CultureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cultures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cultures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cultures.
     */
    distinct?: CultureScalarFieldEnum | CultureScalarFieldEnum[]
  }

  /**
   * Culture findFirstOrThrow
   */
  export type CultureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter, which Culture to fetch.
     */
    where?: CultureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cultures to fetch.
     */
    orderBy?: CultureOrderByWithRelationInput | CultureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cultures.
     */
    cursor?: CultureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cultures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cultures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cultures.
     */
    distinct?: CultureScalarFieldEnum | CultureScalarFieldEnum[]
  }

  /**
   * Culture findMany
   */
  export type CultureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter, which Cultures to fetch.
     */
    where?: CultureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cultures to fetch.
     */
    orderBy?: CultureOrderByWithRelationInput | CultureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cultures.
     */
    cursor?: CultureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cultures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cultures.
     */
    skip?: number
    distinct?: CultureScalarFieldEnum | CultureScalarFieldEnum[]
  }

  /**
   * Culture create
   */
  export type CultureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * The data needed to create a Culture.
     */
    data: XOR<CultureCreateInput, CultureUncheckedCreateInput>
  }

  /**
   * Culture createMany
   */
  export type CultureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cultures.
     */
    data: CultureCreateManyInput | CultureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Culture createManyAndReturn
   */
  export type CultureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * The data used to create many Cultures.
     */
    data: CultureCreateManyInput | CultureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Culture update
   */
  export type CultureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * The data needed to update a Culture.
     */
    data: XOR<CultureUpdateInput, CultureUncheckedUpdateInput>
    /**
     * Choose, which Culture to update.
     */
    where: CultureWhereUniqueInput
  }

  /**
   * Culture updateMany
   */
  export type CultureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cultures.
     */
    data: XOR<CultureUpdateManyMutationInput, CultureUncheckedUpdateManyInput>
    /**
     * Filter which Cultures to update
     */
    where?: CultureWhereInput
    /**
     * Limit how many Cultures to update.
     */
    limit?: number
  }

  /**
   * Culture updateManyAndReturn
   */
  export type CultureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * The data used to update Cultures.
     */
    data: XOR<CultureUpdateManyMutationInput, CultureUncheckedUpdateManyInput>
    /**
     * Filter which Cultures to update
     */
    where?: CultureWhereInput
    /**
     * Limit how many Cultures to update.
     */
    limit?: number
  }

  /**
   * Culture upsert
   */
  export type CultureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * The filter to search for the Culture to update in case it exists.
     */
    where: CultureWhereUniqueInput
    /**
     * In case the Culture found by the `where` argument doesn't exist, create a new Culture with this data.
     */
    create: XOR<CultureCreateInput, CultureUncheckedCreateInput>
    /**
     * In case the Culture was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CultureUpdateInput, CultureUncheckedUpdateInput>
  }

  /**
   * Culture delete
   */
  export type CultureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
    /**
     * Filter which Culture to delete.
     */
    where: CultureWhereUniqueInput
  }

  /**
   * Culture deleteMany
   */
  export type CultureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cultures to delete
     */
    where?: CultureWhereInput
    /**
     * Limit how many Cultures to delete.
     */
    limit?: number
  }

  /**
   * Culture.recoltes
   */
  export type Culture$recoltesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    where?: RecolteWhereInput
    orderBy?: RecolteOrderByWithRelationInput | RecolteOrderByWithRelationInput[]
    cursor?: RecolteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecolteScalarFieldEnum | RecolteScalarFieldEnum[]
  }

  /**
   * Culture without action
   */
  export type CultureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Culture
     */
    select?: CultureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Culture
     */
    omit?: CultureOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CultureInclude<ExtArgs> | null
  }


  /**
   * Model Recolte
   */

  export type AggregateRecolte = {
    _count: RecolteCountAggregateOutputType | null
    _avg: RecolteAvgAggregateOutputType | null
    _sum: RecolteSumAggregateOutputType | null
    _min: RecolteMinAggregateOutputType | null
    _max: RecolteMaxAggregateOutputType | null
  }

  export type RecolteAvgAggregateOutputType = {
    poids: number | null
    quantite: number | null
    meteoTemperature: number | null
    meteoHumidite: number | null
    meteoPression: number | null
    meteoVent: number | null
    meteoUV: number | null
  }

  export type RecolteSumAggregateOutputType = {
    poids: number | null
    quantite: number | null
    meteoTemperature: number | null
    meteoHumidite: number | null
    meteoPression: number | null
    meteoVent: number | null
    meteoUV: number | null
  }

  export type RecolteMinAggregateOutputType = {
    id: string | null
    cultureId: string | null
    date: Date | null
    poids: number | null
    quantite: number | null
    meteoTemperature: number | null
    meteoHumidite: number | null
    meteoPression: number | null
    meteoVent: number | null
    meteoUV: number | null
  }

  export type RecolteMaxAggregateOutputType = {
    id: string | null
    cultureId: string | null
    date: Date | null
    poids: number | null
    quantite: number | null
    meteoTemperature: number | null
    meteoHumidite: number | null
    meteoPression: number | null
    meteoVent: number | null
    meteoUV: number | null
  }

  export type RecolteCountAggregateOutputType = {
    id: number
    cultureId: number
    date: number
    poids: number
    quantite: number
    meteoTemperature: number
    meteoHumidite: number
    meteoPression: number
    meteoVent: number
    meteoUV: number
    _all: number
  }


  export type RecolteAvgAggregateInputType = {
    poids?: true
    quantite?: true
    meteoTemperature?: true
    meteoHumidite?: true
    meteoPression?: true
    meteoVent?: true
    meteoUV?: true
  }

  export type RecolteSumAggregateInputType = {
    poids?: true
    quantite?: true
    meteoTemperature?: true
    meteoHumidite?: true
    meteoPression?: true
    meteoVent?: true
    meteoUV?: true
  }

  export type RecolteMinAggregateInputType = {
    id?: true
    cultureId?: true
    date?: true
    poids?: true
    quantite?: true
    meteoTemperature?: true
    meteoHumidite?: true
    meteoPression?: true
    meteoVent?: true
    meteoUV?: true
  }

  export type RecolteMaxAggregateInputType = {
    id?: true
    cultureId?: true
    date?: true
    poids?: true
    quantite?: true
    meteoTemperature?: true
    meteoHumidite?: true
    meteoPression?: true
    meteoVent?: true
    meteoUV?: true
  }

  export type RecolteCountAggregateInputType = {
    id?: true
    cultureId?: true
    date?: true
    poids?: true
    quantite?: true
    meteoTemperature?: true
    meteoHumidite?: true
    meteoPression?: true
    meteoVent?: true
    meteoUV?: true
    _all?: true
  }

  export type RecolteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recolte to aggregate.
     */
    where?: RecolteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recoltes to fetch.
     */
    orderBy?: RecolteOrderByWithRelationInput | RecolteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecolteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recoltes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recoltes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recoltes
    **/
    _count?: true | RecolteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecolteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecolteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecolteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecolteMaxAggregateInputType
  }

  export type GetRecolteAggregateType<T extends RecolteAggregateArgs> = {
        [P in keyof T & keyof AggregateRecolte]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecolte[P]>
      : GetScalarType<T[P], AggregateRecolte[P]>
  }




  export type RecolteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecolteWhereInput
    orderBy?: RecolteOrderByWithAggregationInput | RecolteOrderByWithAggregationInput[]
    by: RecolteScalarFieldEnum[] | RecolteScalarFieldEnum
    having?: RecolteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecolteCountAggregateInputType | true
    _avg?: RecolteAvgAggregateInputType
    _sum?: RecolteSumAggregateInputType
    _min?: RecolteMinAggregateInputType
    _max?: RecolteMaxAggregateInputType
  }

  export type RecolteGroupByOutputType = {
    id: string
    cultureId: string
    date: Date
    poids: number
    quantite: number | null
    meteoTemperature: number | null
    meteoHumidite: number | null
    meteoPression: number | null
    meteoVent: number | null
    meteoUV: number | null
    _count: RecolteCountAggregateOutputType | null
    _avg: RecolteAvgAggregateOutputType | null
    _sum: RecolteSumAggregateOutputType | null
    _min: RecolteMinAggregateOutputType | null
    _max: RecolteMaxAggregateOutputType | null
  }

  type GetRecolteGroupByPayload<T extends RecolteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecolteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecolteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecolteGroupByOutputType[P]>
            : GetScalarType<T[P], RecolteGroupByOutputType[P]>
        }
      >
    >


  export type RecolteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cultureId?: boolean
    date?: boolean
    poids?: boolean
    quantite?: boolean
    meteoTemperature?: boolean
    meteoHumidite?: boolean
    meteoPression?: boolean
    meteoVent?: boolean
    meteoUV?: boolean
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recolte"]>

  export type RecolteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cultureId?: boolean
    date?: boolean
    poids?: boolean
    quantite?: boolean
    meteoTemperature?: boolean
    meteoHumidite?: boolean
    meteoPression?: boolean
    meteoVent?: boolean
    meteoUV?: boolean
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recolte"]>

  export type RecolteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cultureId?: boolean
    date?: boolean
    poids?: boolean
    quantite?: boolean
    meteoTemperature?: boolean
    meteoHumidite?: boolean
    meteoPression?: boolean
    meteoVent?: boolean
    meteoUV?: boolean
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recolte"]>

  export type RecolteSelectScalar = {
    id?: boolean
    cultureId?: boolean
    date?: boolean
    poids?: boolean
    quantite?: boolean
    meteoTemperature?: boolean
    meteoHumidite?: boolean
    meteoPression?: boolean
    meteoVent?: boolean
    meteoUV?: boolean
  }

  export type RecolteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cultureId" | "date" | "poids" | "quantite" | "meteoTemperature" | "meteoHumidite" | "meteoPression" | "meteoVent" | "meteoUV", ExtArgs["result"]["recolte"]>
  export type RecolteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }
  export type RecolteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }
  export type RecolteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    culture?: boolean | CultureDefaultArgs<ExtArgs>
  }

  export type $RecoltePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recolte"
    objects: {
      /**
       * The culture associated with this harvest
       */
      culture: Prisma.$CulturePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      /**
       * Universally unique identifier for the harvest
       */
      id: string
      /**
       * Foreign key referencing the culture that was harvested
       */
      cultureId: string
      /**
       * Date and time of the harvest (ISO timestamp)
       */
      date: Date
      /**
       * Weight of the harvest in grams; should always be provided
       */
      poids: number
      /**
       * Number of units harvested (only for cultures with modeRecolte=poids_unite)
       */
      quantite: number | null
      /**
       * Weather temperature in degrees Celsius
       */
      meteoTemperature: number | null
      /**
       * Weather humidity percentage
       */
      meteoHumidite: number | null
      /**
       * Weather pressure in hPa
       */
      meteoPression: number | null
      /**
       * Wind speed in m/s
       */
      meteoVent: number | null
      /**
       * UV index
       */
      meteoUV: number | null
    }, ExtArgs["result"]["recolte"]>
    composites: {}
  }

  type RecolteGetPayload<S extends boolean | null | undefined | RecolteDefaultArgs> = $Result.GetResult<Prisma.$RecoltePayload, S>

  type RecolteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecolteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecolteCountAggregateInputType | true
    }

  export interface RecolteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recolte'], meta: { name: 'Recolte' } }
    /**
     * Find zero or one Recolte that matches the filter.
     * @param {RecolteFindUniqueArgs} args - Arguments to find a Recolte
     * @example
     * // Get one Recolte
     * const recolte = await prisma.recolte.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecolteFindUniqueArgs>(args: SelectSubset<T, RecolteFindUniqueArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recolte that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecolteFindUniqueOrThrowArgs} args - Arguments to find a Recolte
     * @example
     * // Get one Recolte
     * const recolte = await prisma.recolte.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecolteFindUniqueOrThrowArgs>(args: SelectSubset<T, RecolteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recolte that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteFindFirstArgs} args - Arguments to find a Recolte
     * @example
     * // Get one Recolte
     * const recolte = await prisma.recolte.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecolteFindFirstArgs>(args?: SelectSubset<T, RecolteFindFirstArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recolte that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteFindFirstOrThrowArgs} args - Arguments to find a Recolte
     * @example
     * // Get one Recolte
     * const recolte = await prisma.recolte.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecolteFindFirstOrThrowArgs>(args?: SelectSubset<T, RecolteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recoltes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recoltes
     * const recoltes = await prisma.recolte.findMany()
     * 
     * // Get first 10 Recoltes
     * const recoltes = await prisma.recolte.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recolteWithIdOnly = await prisma.recolte.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecolteFindManyArgs>(args?: SelectSubset<T, RecolteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recolte.
     * @param {RecolteCreateArgs} args - Arguments to create a Recolte.
     * @example
     * // Create one Recolte
     * const Recolte = await prisma.recolte.create({
     *   data: {
     *     // ... data to create a Recolte
     *   }
     * })
     * 
     */
    create<T extends RecolteCreateArgs>(args: SelectSubset<T, RecolteCreateArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recoltes.
     * @param {RecolteCreateManyArgs} args - Arguments to create many Recoltes.
     * @example
     * // Create many Recoltes
     * const recolte = await prisma.recolte.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecolteCreateManyArgs>(args?: SelectSubset<T, RecolteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recoltes and returns the data saved in the database.
     * @param {RecolteCreateManyAndReturnArgs} args - Arguments to create many Recoltes.
     * @example
     * // Create many Recoltes
     * const recolte = await prisma.recolte.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recoltes and only return the `id`
     * const recolteWithIdOnly = await prisma.recolte.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecolteCreateManyAndReturnArgs>(args?: SelectSubset<T, RecolteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recolte.
     * @param {RecolteDeleteArgs} args - Arguments to delete one Recolte.
     * @example
     * // Delete one Recolte
     * const Recolte = await prisma.recolte.delete({
     *   where: {
     *     // ... filter to delete one Recolte
     *   }
     * })
     * 
     */
    delete<T extends RecolteDeleteArgs>(args: SelectSubset<T, RecolteDeleteArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recolte.
     * @param {RecolteUpdateArgs} args - Arguments to update one Recolte.
     * @example
     * // Update one Recolte
     * const recolte = await prisma.recolte.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecolteUpdateArgs>(args: SelectSubset<T, RecolteUpdateArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recoltes.
     * @param {RecolteDeleteManyArgs} args - Arguments to filter Recoltes to delete.
     * @example
     * // Delete a few Recoltes
     * const { count } = await prisma.recolte.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecolteDeleteManyArgs>(args?: SelectSubset<T, RecolteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recoltes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recoltes
     * const recolte = await prisma.recolte.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecolteUpdateManyArgs>(args: SelectSubset<T, RecolteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recoltes and returns the data updated in the database.
     * @param {RecolteUpdateManyAndReturnArgs} args - Arguments to update many Recoltes.
     * @example
     * // Update many Recoltes
     * const recolte = await prisma.recolte.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recoltes and only return the `id`
     * const recolteWithIdOnly = await prisma.recolte.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecolteUpdateManyAndReturnArgs>(args: SelectSubset<T, RecolteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recolte.
     * @param {RecolteUpsertArgs} args - Arguments to update or create a Recolte.
     * @example
     * // Update or create a Recolte
     * const recolte = await prisma.recolte.upsert({
     *   create: {
     *     // ... data to create a Recolte
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recolte we want to update
     *   }
     * })
     */
    upsert<T extends RecolteUpsertArgs>(args: SelectSubset<T, RecolteUpsertArgs<ExtArgs>>): Prisma__RecolteClient<$Result.GetResult<Prisma.$RecoltePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recoltes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteCountArgs} args - Arguments to filter Recoltes to count.
     * @example
     * // Count the number of Recoltes
     * const count = await prisma.recolte.count({
     *   where: {
     *     // ... the filter for the Recoltes we want to count
     *   }
     * })
    **/
    count<T extends RecolteCountArgs>(
      args?: Subset<T, RecolteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecolteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recolte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecolteAggregateArgs>(args: Subset<T, RecolteAggregateArgs>): Prisma.PrismaPromise<GetRecolteAggregateType<T>>

    /**
     * Group by Recolte.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecolteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecolteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecolteGroupByArgs['orderBy'] }
        : { orderBy?: RecolteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecolteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecolteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recolte model
   */
  readonly fields: RecolteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recolte.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecolteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    culture<T extends CultureDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CultureDefaultArgs<ExtArgs>>): Prisma__CultureClient<$Result.GetResult<Prisma.$CulturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recolte model
   */
  interface RecolteFieldRefs {
    readonly id: FieldRef<"Recolte", 'String'>
    readonly cultureId: FieldRef<"Recolte", 'String'>
    readonly date: FieldRef<"Recolte", 'DateTime'>
    readonly poids: FieldRef<"Recolte", 'Float'>
    readonly quantite: FieldRef<"Recolte", 'Int'>
    readonly meteoTemperature: FieldRef<"Recolte", 'Float'>
    readonly meteoHumidite: FieldRef<"Recolte", 'Float'>
    readonly meteoPression: FieldRef<"Recolte", 'Float'>
    readonly meteoVent: FieldRef<"Recolte", 'Float'>
    readonly meteoUV: FieldRef<"Recolte", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Recolte findUnique
   */
  export type RecolteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter, which Recolte to fetch.
     */
    where: RecolteWhereUniqueInput
  }

  /**
   * Recolte findUniqueOrThrow
   */
  export type RecolteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter, which Recolte to fetch.
     */
    where: RecolteWhereUniqueInput
  }

  /**
   * Recolte findFirst
   */
  export type RecolteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter, which Recolte to fetch.
     */
    where?: RecolteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recoltes to fetch.
     */
    orderBy?: RecolteOrderByWithRelationInput | RecolteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recoltes.
     */
    cursor?: RecolteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recoltes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recoltes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recoltes.
     */
    distinct?: RecolteScalarFieldEnum | RecolteScalarFieldEnum[]
  }

  /**
   * Recolte findFirstOrThrow
   */
  export type RecolteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter, which Recolte to fetch.
     */
    where?: RecolteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recoltes to fetch.
     */
    orderBy?: RecolteOrderByWithRelationInput | RecolteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recoltes.
     */
    cursor?: RecolteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recoltes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recoltes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recoltes.
     */
    distinct?: RecolteScalarFieldEnum | RecolteScalarFieldEnum[]
  }

  /**
   * Recolte findMany
   */
  export type RecolteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter, which Recoltes to fetch.
     */
    where?: RecolteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recoltes to fetch.
     */
    orderBy?: RecolteOrderByWithRelationInput | RecolteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recoltes.
     */
    cursor?: RecolteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recoltes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recoltes.
     */
    skip?: number
    distinct?: RecolteScalarFieldEnum | RecolteScalarFieldEnum[]
  }

  /**
   * Recolte create
   */
  export type RecolteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * The data needed to create a Recolte.
     */
    data: XOR<RecolteCreateInput, RecolteUncheckedCreateInput>
  }

  /**
   * Recolte createMany
   */
  export type RecolteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recoltes.
     */
    data: RecolteCreateManyInput | RecolteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recolte createManyAndReturn
   */
  export type RecolteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * The data used to create many Recoltes.
     */
    data: RecolteCreateManyInput | RecolteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recolte update
   */
  export type RecolteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * The data needed to update a Recolte.
     */
    data: XOR<RecolteUpdateInput, RecolteUncheckedUpdateInput>
    /**
     * Choose, which Recolte to update.
     */
    where: RecolteWhereUniqueInput
  }

  /**
   * Recolte updateMany
   */
  export type RecolteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recoltes.
     */
    data: XOR<RecolteUpdateManyMutationInput, RecolteUncheckedUpdateManyInput>
    /**
     * Filter which Recoltes to update
     */
    where?: RecolteWhereInput
    /**
     * Limit how many Recoltes to update.
     */
    limit?: number
  }

  /**
   * Recolte updateManyAndReturn
   */
  export type RecolteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * The data used to update Recoltes.
     */
    data: XOR<RecolteUpdateManyMutationInput, RecolteUncheckedUpdateManyInput>
    /**
     * Filter which Recoltes to update
     */
    where?: RecolteWhereInput
    /**
     * Limit how many Recoltes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recolte upsert
   */
  export type RecolteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * The filter to search for the Recolte to update in case it exists.
     */
    where: RecolteWhereUniqueInput
    /**
     * In case the Recolte found by the `where` argument doesn't exist, create a new Recolte with this data.
     */
    create: XOR<RecolteCreateInput, RecolteUncheckedCreateInput>
    /**
     * In case the Recolte was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecolteUpdateInput, RecolteUncheckedUpdateInput>
  }

  /**
   * Recolte delete
   */
  export type RecolteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
    /**
     * Filter which Recolte to delete.
     */
    where: RecolteWhereUniqueInput
  }

  /**
   * Recolte deleteMany
   */
  export type RecolteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recoltes to delete
     */
    where?: RecolteWhereInput
    /**
     * Limit how many Recoltes to delete.
     */
    limit?: number
  }

  /**
   * Recolte without action
   */
  export type RecolteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recolte
     */
    select?: RecolteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recolte
     */
    omit?: RecolteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecolteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CultureScalarFieldEnum: {
    id: 'id',
    nom: 'nom',
    img: 'img',
    categorie: 'categorie',
    modeRecolte: 'modeRecolte'
  };

  export type CultureScalarFieldEnum = (typeof CultureScalarFieldEnum)[keyof typeof CultureScalarFieldEnum]


  export const RecolteScalarFieldEnum: {
    id: 'id',
    cultureId: 'cultureId',
    date: 'date',
    poids: 'poids',
    quantite: 'quantite',
    meteoTemperature: 'meteoTemperature',
    meteoHumidite: 'meteoHumidite',
    meteoPression: 'meteoPression',
    meteoVent: 'meteoVent',
    meteoUV: 'meteoUV'
  };

  export type RecolteScalarFieldEnum = (typeof RecolteScalarFieldEnum)[keyof typeof RecolteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Categorie'
   */
  export type EnumCategorieFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Categorie'>
    


  /**
   * Reference to a field of type 'Categorie[]'
   */
  export type ListEnumCategorieFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Categorie[]'>
    


  /**
   * Reference to a field of type 'ModeRecolte'
   */
  export type EnumModeRecolteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModeRecolte'>
    


  /**
   * Reference to a field of type 'ModeRecolte[]'
   */
  export type ListEnumModeRecolteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModeRecolte[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CultureWhereInput = {
    AND?: CultureWhereInput | CultureWhereInput[]
    OR?: CultureWhereInput[]
    NOT?: CultureWhereInput | CultureWhereInput[]
    id?: StringFilter<"Culture"> | string
    nom?: StringFilter<"Culture"> | string
    img?: StringFilter<"Culture"> | string
    categorie?: EnumCategorieFilter<"Culture"> | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFilter<"Culture"> | $Enums.ModeRecolte
    recoltes?: RecolteListRelationFilter
  }

  export type CultureOrderByWithRelationInput = {
    id?: SortOrder
    nom?: SortOrder
    img?: SortOrder
    categorie?: SortOrder
    modeRecolte?: SortOrder
    recoltes?: RecolteOrderByRelationAggregateInput
  }

  export type CultureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CultureWhereInput | CultureWhereInput[]
    OR?: CultureWhereInput[]
    NOT?: CultureWhereInput | CultureWhereInput[]
    nom?: StringFilter<"Culture"> | string
    img?: StringFilter<"Culture"> | string
    categorie?: EnumCategorieFilter<"Culture"> | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFilter<"Culture"> | $Enums.ModeRecolte
    recoltes?: RecolteListRelationFilter
  }, "id">

  export type CultureOrderByWithAggregationInput = {
    id?: SortOrder
    nom?: SortOrder
    img?: SortOrder
    categorie?: SortOrder
    modeRecolte?: SortOrder
    _count?: CultureCountOrderByAggregateInput
    _max?: CultureMaxOrderByAggregateInput
    _min?: CultureMinOrderByAggregateInput
  }

  export type CultureScalarWhereWithAggregatesInput = {
    AND?: CultureScalarWhereWithAggregatesInput | CultureScalarWhereWithAggregatesInput[]
    OR?: CultureScalarWhereWithAggregatesInput[]
    NOT?: CultureScalarWhereWithAggregatesInput | CultureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Culture"> | string
    nom?: StringWithAggregatesFilter<"Culture"> | string
    img?: StringWithAggregatesFilter<"Culture"> | string
    categorie?: EnumCategorieWithAggregatesFilter<"Culture"> | $Enums.Categorie
    modeRecolte?: EnumModeRecolteWithAggregatesFilter<"Culture"> | $Enums.ModeRecolte
  }

  export type RecolteWhereInput = {
    AND?: RecolteWhereInput | RecolteWhereInput[]
    OR?: RecolteWhereInput[]
    NOT?: RecolteWhereInput | RecolteWhereInput[]
    id?: StringFilter<"Recolte"> | string
    cultureId?: StringFilter<"Recolte"> | string
    date?: DateTimeFilter<"Recolte"> | Date | string
    poids?: FloatFilter<"Recolte"> | number
    quantite?: IntNullableFilter<"Recolte"> | number | null
    meteoTemperature?: FloatNullableFilter<"Recolte"> | number | null
    meteoHumidite?: FloatNullableFilter<"Recolte"> | number | null
    meteoPression?: FloatNullableFilter<"Recolte"> | number | null
    meteoVent?: FloatNullableFilter<"Recolte"> | number | null
    meteoUV?: FloatNullableFilter<"Recolte"> | number | null
    culture?: XOR<CultureScalarRelationFilter, CultureWhereInput>
  }

  export type RecolteOrderByWithRelationInput = {
    id?: SortOrder
    cultureId?: SortOrder
    date?: SortOrder
    poids?: SortOrder
    quantite?: SortOrderInput | SortOrder
    meteoTemperature?: SortOrderInput | SortOrder
    meteoHumidite?: SortOrderInput | SortOrder
    meteoPression?: SortOrderInput | SortOrder
    meteoVent?: SortOrderInput | SortOrder
    meteoUV?: SortOrderInput | SortOrder
    culture?: CultureOrderByWithRelationInput
  }

  export type RecolteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecolteWhereInput | RecolteWhereInput[]
    OR?: RecolteWhereInput[]
    NOT?: RecolteWhereInput | RecolteWhereInput[]
    cultureId?: StringFilter<"Recolte"> | string
    date?: DateTimeFilter<"Recolte"> | Date | string
    poids?: FloatFilter<"Recolte"> | number
    quantite?: IntNullableFilter<"Recolte"> | number | null
    meteoTemperature?: FloatNullableFilter<"Recolte"> | number | null
    meteoHumidite?: FloatNullableFilter<"Recolte"> | number | null
    meteoPression?: FloatNullableFilter<"Recolte"> | number | null
    meteoVent?: FloatNullableFilter<"Recolte"> | number | null
    meteoUV?: FloatNullableFilter<"Recolte"> | number | null
    culture?: XOR<CultureScalarRelationFilter, CultureWhereInput>
  }, "id">

  export type RecolteOrderByWithAggregationInput = {
    id?: SortOrder
    cultureId?: SortOrder
    date?: SortOrder
    poids?: SortOrder
    quantite?: SortOrderInput | SortOrder
    meteoTemperature?: SortOrderInput | SortOrder
    meteoHumidite?: SortOrderInput | SortOrder
    meteoPression?: SortOrderInput | SortOrder
    meteoVent?: SortOrderInput | SortOrder
    meteoUV?: SortOrderInput | SortOrder
    _count?: RecolteCountOrderByAggregateInput
    _avg?: RecolteAvgOrderByAggregateInput
    _max?: RecolteMaxOrderByAggregateInput
    _min?: RecolteMinOrderByAggregateInput
    _sum?: RecolteSumOrderByAggregateInput
  }

  export type RecolteScalarWhereWithAggregatesInput = {
    AND?: RecolteScalarWhereWithAggregatesInput | RecolteScalarWhereWithAggregatesInput[]
    OR?: RecolteScalarWhereWithAggregatesInput[]
    NOT?: RecolteScalarWhereWithAggregatesInput | RecolteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recolte"> | string
    cultureId?: StringWithAggregatesFilter<"Recolte"> | string
    date?: DateTimeWithAggregatesFilter<"Recolte"> | Date | string
    poids?: FloatWithAggregatesFilter<"Recolte"> | number
    quantite?: IntNullableWithAggregatesFilter<"Recolte"> | number | null
    meteoTemperature?: FloatNullableWithAggregatesFilter<"Recolte"> | number | null
    meteoHumidite?: FloatNullableWithAggregatesFilter<"Recolte"> | number | null
    meteoPression?: FloatNullableWithAggregatesFilter<"Recolte"> | number | null
    meteoVent?: FloatNullableWithAggregatesFilter<"Recolte"> | number | null
    meteoUV?: FloatNullableWithAggregatesFilter<"Recolte"> | number | null
  }

  export type CultureCreateInput = {
    id?: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
    recoltes?: RecolteCreateNestedManyWithoutCultureInput
  }

  export type CultureUncheckedCreateInput = {
    id?: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
    recoltes?: RecolteUncheckedCreateNestedManyWithoutCultureInput
  }

  export type CultureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
    recoltes?: RecolteUpdateManyWithoutCultureNestedInput
  }

  export type CultureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
    recoltes?: RecolteUncheckedUpdateManyWithoutCultureNestedInput
  }

  export type CultureCreateManyInput = {
    id?: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
  }

  export type CultureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
  }

  export type CultureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
  }

  export type RecolteCreateInput = {
    id?: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
    culture: CultureCreateNestedOneWithoutRecoltesInput
  }

  export type RecolteUncheckedCreateInput = {
    id?: string
    cultureId: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
  }

  export type RecolteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
    culture?: CultureUpdateOneRequiredWithoutRecoltesNestedInput
  }

  export type RecolteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cultureId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RecolteCreateManyInput = {
    id?: string
    cultureId: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
  }

  export type RecolteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RecolteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cultureId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumCategorieFilter<$PrismaModel = never> = {
    equals?: $Enums.Categorie | EnumCategorieFieldRefInput<$PrismaModel>
    in?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    not?: NestedEnumCategorieFilter<$PrismaModel> | $Enums.Categorie
  }

  export type EnumModeRecolteFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeRecolte | EnumModeRecolteFieldRefInput<$PrismaModel>
    in?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    not?: NestedEnumModeRecolteFilter<$PrismaModel> | $Enums.ModeRecolte
  }

  export type RecolteListRelationFilter = {
    every?: RecolteWhereInput
    some?: RecolteWhereInput
    none?: RecolteWhereInput
  }

  export type RecolteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CultureCountOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    img?: SortOrder
    categorie?: SortOrder
    modeRecolte?: SortOrder
  }

  export type CultureMaxOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    img?: SortOrder
    categorie?: SortOrder
    modeRecolte?: SortOrder
  }

  export type CultureMinOrderByAggregateInput = {
    id?: SortOrder
    nom?: SortOrder
    img?: SortOrder
    categorie?: SortOrder
    modeRecolte?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumCategorieWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Categorie | EnumCategorieFieldRefInput<$PrismaModel>
    in?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    not?: NestedEnumCategorieWithAggregatesFilter<$PrismaModel> | $Enums.Categorie
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategorieFilter<$PrismaModel>
    _max?: NestedEnumCategorieFilter<$PrismaModel>
  }

  export type EnumModeRecolteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeRecolte | EnumModeRecolteFieldRefInput<$PrismaModel>
    in?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    not?: NestedEnumModeRecolteWithAggregatesFilter<$PrismaModel> | $Enums.ModeRecolte
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModeRecolteFilter<$PrismaModel>
    _max?: NestedEnumModeRecolteFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CultureScalarRelationFilter = {
    is?: CultureWhereInput
    isNot?: CultureWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RecolteCountOrderByAggregateInput = {
    id?: SortOrder
    cultureId?: SortOrder
    date?: SortOrder
    poids?: SortOrder
    quantite?: SortOrder
    meteoTemperature?: SortOrder
    meteoHumidite?: SortOrder
    meteoPression?: SortOrder
    meteoVent?: SortOrder
    meteoUV?: SortOrder
  }

  export type RecolteAvgOrderByAggregateInput = {
    poids?: SortOrder
    quantite?: SortOrder
    meteoTemperature?: SortOrder
    meteoHumidite?: SortOrder
    meteoPression?: SortOrder
    meteoVent?: SortOrder
    meteoUV?: SortOrder
  }

  export type RecolteMaxOrderByAggregateInput = {
    id?: SortOrder
    cultureId?: SortOrder
    date?: SortOrder
    poids?: SortOrder
    quantite?: SortOrder
    meteoTemperature?: SortOrder
    meteoHumidite?: SortOrder
    meteoPression?: SortOrder
    meteoVent?: SortOrder
    meteoUV?: SortOrder
  }

  export type RecolteMinOrderByAggregateInput = {
    id?: SortOrder
    cultureId?: SortOrder
    date?: SortOrder
    poids?: SortOrder
    quantite?: SortOrder
    meteoTemperature?: SortOrder
    meteoHumidite?: SortOrder
    meteoPression?: SortOrder
    meteoVent?: SortOrder
    meteoUV?: SortOrder
  }

  export type RecolteSumOrderByAggregateInput = {
    poids?: SortOrder
    quantite?: SortOrder
    meteoTemperature?: SortOrder
    meteoHumidite?: SortOrder
    meteoPression?: SortOrder
    meteoVent?: SortOrder
    meteoUV?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type RecolteCreateNestedManyWithoutCultureInput = {
    create?: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput> | RecolteCreateWithoutCultureInput[] | RecolteUncheckedCreateWithoutCultureInput[]
    connectOrCreate?: RecolteCreateOrConnectWithoutCultureInput | RecolteCreateOrConnectWithoutCultureInput[]
    createMany?: RecolteCreateManyCultureInputEnvelope
    connect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
  }

  export type RecolteUncheckedCreateNestedManyWithoutCultureInput = {
    create?: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput> | RecolteCreateWithoutCultureInput[] | RecolteUncheckedCreateWithoutCultureInput[]
    connectOrCreate?: RecolteCreateOrConnectWithoutCultureInput | RecolteCreateOrConnectWithoutCultureInput[]
    createMany?: RecolteCreateManyCultureInputEnvelope
    connect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumCategorieFieldUpdateOperationsInput = {
    set?: $Enums.Categorie
  }

  export type EnumModeRecolteFieldUpdateOperationsInput = {
    set?: $Enums.ModeRecolte
  }

  export type RecolteUpdateManyWithoutCultureNestedInput = {
    create?: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput> | RecolteCreateWithoutCultureInput[] | RecolteUncheckedCreateWithoutCultureInput[]
    connectOrCreate?: RecolteCreateOrConnectWithoutCultureInput | RecolteCreateOrConnectWithoutCultureInput[]
    upsert?: RecolteUpsertWithWhereUniqueWithoutCultureInput | RecolteUpsertWithWhereUniqueWithoutCultureInput[]
    createMany?: RecolteCreateManyCultureInputEnvelope
    set?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    disconnect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    delete?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    connect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    update?: RecolteUpdateWithWhereUniqueWithoutCultureInput | RecolteUpdateWithWhereUniqueWithoutCultureInput[]
    updateMany?: RecolteUpdateManyWithWhereWithoutCultureInput | RecolteUpdateManyWithWhereWithoutCultureInput[]
    deleteMany?: RecolteScalarWhereInput | RecolteScalarWhereInput[]
  }

  export type RecolteUncheckedUpdateManyWithoutCultureNestedInput = {
    create?: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput> | RecolteCreateWithoutCultureInput[] | RecolteUncheckedCreateWithoutCultureInput[]
    connectOrCreate?: RecolteCreateOrConnectWithoutCultureInput | RecolteCreateOrConnectWithoutCultureInput[]
    upsert?: RecolteUpsertWithWhereUniqueWithoutCultureInput | RecolteUpsertWithWhereUniqueWithoutCultureInput[]
    createMany?: RecolteCreateManyCultureInputEnvelope
    set?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    disconnect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    delete?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    connect?: RecolteWhereUniqueInput | RecolteWhereUniqueInput[]
    update?: RecolteUpdateWithWhereUniqueWithoutCultureInput | RecolteUpdateWithWhereUniqueWithoutCultureInput[]
    updateMany?: RecolteUpdateManyWithWhereWithoutCultureInput | RecolteUpdateManyWithWhereWithoutCultureInput[]
    deleteMany?: RecolteScalarWhereInput | RecolteScalarWhereInput[]
  }

  export type CultureCreateNestedOneWithoutRecoltesInput = {
    create?: XOR<CultureCreateWithoutRecoltesInput, CultureUncheckedCreateWithoutRecoltesInput>
    connectOrCreate?: CultureCreateOrConnectWithoutRecoltesInput
    connect?: CultureWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CultureUpdateOneRequiredWithoutRecoltesNestedInput = {
    create?: XOR<CultureCreateWithoutRecoltesInput, CultureUncheckedCreateWithoutRecoltesInput>
    connectOrCreate?: CultureCreateOrConnectWithoutRecoltesInput
    upsert?: CultureUpsertWithoutRecoltesInput
    connect?: CultureWhereUniqueInput
    update?: XOR<XOR<CultureUpdateToOneWithWhereWithoutRecoltesInput, CultureUpdateWithoutRecoltesInput>, CultureUncheckedUpdateWithoutRecoltesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCategorieFilter<$PrismaModel = never> = {
    equals?: $Enums.Categorie | EnumCategorieFieldRefInput<$PrismaModel>
    in?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    not?: NestedEnumCategorieFilter<$PrismaModel> | $Enums.Categorie
  }

  export type NestedEnumModeRecolteFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeRecolte | EnumModeRecolteFieldRefInput<$PrismaModel>
    in?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    not?: NestedEnumModeRecolteFilter<$PrismaModel> | $Enums.ModeRecolte
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumCategorieWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Categorie | EnumCategorieFieldRefInput<$PrismaModel>
    in?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    notIn?: $Enums.Categorie[] | ListEnumCategorieFieldRefInput<$PrismaModel>
    not?: NestedEnumCategorieWithAggregatesFilter<$PrismaModel> | $Enums.Categorie
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCategorieFilter<$PrismaModel>
    _max?: NestedEnumCategorieFilter<$PrismaModel>
  }

  export type NestedEnumModeRecolteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModeRecolte | EnumModeRecolteFieldRefInput<$PrismaModel>
    in?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModeRecolte[] | ListEnumModeRecolteFieldRefInput<$PrismaModel>
    not?: NestedEnumModeRecolteWithAggregatesFilter<$PrismaModel> | $Enums.ModeRecolte
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModeRecolteFilter<$PrismaModel>
    _max?: NestedEnumModeRecolteFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type RecolteCreateWithoutCultureInput = {
    id?: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
  }

  export type RecolteUncheckedCreateWithoutCultureInput = {
    id?: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
  }

  export type RecolteCreateOrConnectWithoutCultureInput = {
    where: RecolteWhereUniqueInput
    create: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput>
  }

  export type RecolteCreateManyCultureInputEnvelope = {
    data: RecolteCreateManyCultureInput | RecolteCreateManyCultureInput[]
    skipDuplicates?: boolean
  }

  export type RecolteUpsertWithWhereUniqueWithoutCultureInput = {
    where: RecolteWhereUniqueInput
    update: XOR<RecolteUpdateWithoutCultureInput, RecolteUncheckedUpdateWithoutCultureInput>
    create: XOR<RecolteCreateWithoutCultureInput, RecolteUncheckedCreateWithoutCultureInput>
  }

  export type RecolteUpdateWithWhereUniqueWithoutCultureInput = {
    where: RecolteWhereUniqueInput
    data: XOR<RecolteUpdateWithoutCultureInput, RecolteUncheckedUpdateWithoutCultureInput>
  }

  export type RecolteUpdateManyWithWhereWithoutCultureInput = {
    where: RecolteScalarWhereInput
    data: XOR<RecolteUpdateManyMutationInput, RecolteUncheckedUpdateManyWithoutCultureInput>
  }

  export type RecolteScalarWhereInput = {
    AND?: RecolteScalarWhereInput | RecolteScalarWhereInput[]
    OR?: RecolteScalarWhereInput[]
    NOT?: RecolteScalarWhereInput | RecolteScalarWhereInput[]
    id?: StringFilter<"Recolte"> | string
    cultureId?: StringFilter<"Recolte"> | string
    date?: DateTimeFilter<"Recolte"> | Date | string
    poids?: FloatFilter<"Recolte"> | number
    quantite?: IntNullableFilter<"Recolte"> | number | null
    meteoTemperature?: FloatNullableFilter<"Recolte"> | number | null
    meteoHumidite?: FloatNullableFilter<"Recolte"> | number | null
    meteoPression?: FloatNullableFilter<"Recolte"> | number | null
    meteoVent?: FloatNullableFilter<"Recolte"> | number | null
    meteoUV?: FloatNullableFilter<"Recolte"> | number | null
  }

  export type CultureCreateWithoutRecoltesInput = {
    id?: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
  }

  export type CultureUncheckedCreateWithoutRecoltesInput = {
    id?: string
    nom: string
    img: string
    categorie: $Enums.Categorie
    modeRecolte: $Enums.ModeRecolte
  }

  export type CultureCreateOrConnectWithoutRecoltesInput = {
    where: CultureWhereUniqueInput
    create: XOR<CultureCreateWithoutRecoltesInput, CultureUncheckedCreateWithoutRecoltesInput>
  }

  export type CultureUpsertWithoutRecoltesInput = {
    update: XOR<CultureUpdateWithoutRecoltesInput, CultureUncheckedUpdateWithoutRecoltesInput>
    create: XOR<CultureCreateWithoutRecoltesInput, CultureUncheckedCreateWithoutRecoltesInput>
    where?: CultureWhereInput
  }

  export type CultureUpdateToOneWithWhereWithoutRecoltesInput = {
    where?: CultureWhereInput
    data: XOR<CultureUpdateWithoutRecoltesInput, CultureUncheckedUpdateWithoutRecoltesInput>
  }

  export type CultureUpdateWithoutRecoltesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
  }

  export type CultureUncheckedUpdateWithoutRecoltesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nom?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    categorie?: EnumCategorieFieldUpdateOperationsInput | $Enums.Categorie
    modeRecolte?: EnumModeRecolteFieldUpdateOperationsInput | $Enums.ModeRecolte
  }

  export type RecolteCreateManyCultureInput = {
    id?: string
    date: Date | string
    poids: number
    quantite?: number | null
    meteoTemperature?: number | null
    meteoHumidite?: number | null
    meteoPression?: number | null
    meteoVent?: number | null
    meteoUV?: number | null
  }

  export type RecolteUpdateWithoutCultureInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RecolteUncheckedUpdateWithoutCultureInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RecolteUncheckedUpdateManyWithoutCultureInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    poids?: FloatFieldUpdateOperationsInput | number
    quantite?: NullableIntFieldUpdateOperationsInput | number | null
    meteoTemperature?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoHumidite?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoPression?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoVent?: NullableFloatFieldUpdateOperationsInput | number | null
    meteoUV?: NullableFloatFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}