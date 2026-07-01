
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model UserHasRole
 * 
 */
export type UserHasRole = $Result.DefaultSelection<Prisma.$UserHasRolePayload>
/**
 * Model RoleHasPermission
 * 
 */
export type RoleHasPermission = $Result.DefaultSelection<Prisma.$RoleHasPermissionPayload>
/**
 * Model Source
 * 
 */
export type Source = $Result.DefaultSelection<Prisma.$SourcePayload>
/**
 * Model SystemPrompt
 * 
 */
export type SystemPrompt = $Result.DefaultSelection<Prisma.$SystemPromptPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ExploredUrl
 * 
 */
export type ExploredUrl = $Result.DefaultSelection<Prisma.$ExploredUrlPayload>
/**
 * Model RewrittenArticle
 * 
 */
export type RewrittenArticle = $Result.DefaultSelection<Prisma.$RewrittenArticlePayload>
/**
 * Model Setting
 * 
 */
export type Setting = $Result.DefaultSelection<Prisma.$SettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const SourceType: {
  RSS: 'RSS',
  WEB: 'WEB',
  API: 'API'
};

export type SourceType = (typeof SourceType)[keyof typeof SourceType]


export const ArticleStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type ArticleStatus = (typeof ArticleStatus)[keyof typeof ArticleStatus]


export const ExploredUrlStatus: {
  PENDING: 'PENDING',
  PROCESSING: 'PROCESSING',
  EXPLORED: 'EXPLORED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED'
};

export type ExploredUrlStatus = (typeof ExploredUrlStatus)[keyof typeof ExploredUrlStatus]

}

export type SourceType = $Enums.SourceType

export const SourceType: typeof $Enums.SourceType

export type ArticleStatus = $Enums.ArticleStatus

export const ArticleStatus: typeof $Enums.ArticleStatus

export type ExploredUrlStatus = $Enums.ExploredUrlStatus

export const ExploredUrlStatus: typeof $Enums.ExploredUrlStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userHasRole`: Exposes CRUD operations for the **UserHasRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserHasRoles
    * const userHasRoles = await prisma.userHasRole.findMany()
    * ```
    */
  get userHasRole(): Prisma.UserHasRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roleHasPermission`: Exposes CRUD operations for the **RoleHasPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoleHasPermissions
    * const roleHasPermissions = await prisma.roleHasPermission.findMany()
    * ```
    */
  get roleHasPermission(): Prisma.RoleHasPermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.source`: Exposes CRUD operations for the **Source** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sources
    * const sources = await prisma.source.findMany()
    * ```
    */
  get source(): Prisma.SourceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.systemPrompt`: Exposes CRUD operations for the **SystemPrompt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemPrompts
    * const systemPrompts = await prisma.systemPrompt.findMany()
    * ```
    */
  get systemPrompt(): Prisma.SystemPromptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exploredUrl`: Exposes CRUD operations for the **ExploredUrl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExploredUrls
    * const exploredUrls = await prisma.exploredUrl.findMany()
    * ```
    */
  get exploredUrl(): Prisma.ExploredUrlDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rewrittenArticle`: Exposes CRUD operations for the **RewrittenArticle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RewrittenArticles
    * const rewrittenArticles = await prisma.rewrittenArticle.findMany()
    * ```
    */
  get rewrittenArticle(): Prisma.RewrittenArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.setting`: Exposes CRUD operations for the **Setting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.setting.findMany()
    * ```
    */
  get setting(): Prisma.SettingDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Role: 'Role',
    Permission: 'Permission',
    UserHasRole: 'UserHasRole',
    RoleHasPermission: 'RoleHasPermission',
    Source: 'Source',
    SystemPrompt: 'SystemPrompt',
    Article: 'Article',
    ExploredUrl: 'ExploredUrl',
    RewrittenArticle: 'RewrittenArticle',
    Setting: 'Setting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "role" | "permission" | "userHasRole" | "roleHasPermission" | "source" | "systemPrompt" | "article" | "exploredUrl" | "rewrittenArticle" | "setting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      UserHasRole: {
        payload: Prisma.$UserHasRolePayload<ExtArgs>
        fields: Prisma.UserHasRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserHasRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserHasRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          findFirst: {
            args: Prisma.UserHasRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserHasRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          findMany: {
            args: Prisma.UserHasRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>[]
          }
          create: {
            args: Prisma.UserHasRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          createMany: {
            args: Prisma.UserHasRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserHasRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>[]
          }
          delete: {
            args: Prisma.UserHasRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          update: {
            args: Prisma.UserHasRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          deleteMany: {
            args: Prisma.UserHasRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserHasRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserHasRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>[]
          }
          upsert: {
            args: Prisma.UserHasRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserHasRolePayload>
          }
          aggregate: {
            args: Prisma.UserHasRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserHasRole>
          }
          groupBy: {
            args: Prisma.UserHasRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserHasRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserHasRoleCountArgs<ExtArgs>
            result: $Utils.Optional<UserHasRoleCountAggregateOutputType> | number
          }
        }
      }
      RoleHasPermission: {
        payload: Prisma.$RoleHasPermissionPayload<ExtArgs>
        fields: Prisma.RoleHasPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleHasPermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          findFirst: {
            args: Prisma.RoleHasPermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleHasPermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          findMany: {
            args: Prisma.RoleHasPermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          create: {
            args: Prisma.RoleHasPermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          createMany: {
            args: Prisma.RoleHasPermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleHasPermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          delete: {
            args: Prisma.RoleHasPermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          update: {
            args: Prisma.RoleHasPermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          deleteMany: {
            args: Prisma.RoleHasPermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleHasPermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>[]
          }
          upsert: {
            args: Prisma.RoleHasPermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoleHasPermissionPayload>
          }
          aggregate: {
            args: Prisma.RoleHasPermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoleHasPermission>
          }
          groupBy: {
            args: Prisma.RoleHasPermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleHasPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleHasPermissionCountArgs<ExtArgs>
            result: $Utils.Optional<RoleHasPermissionCountAggregateOutputType> | number
          }
        }
      }
      Source: {
        payload: Prisma.$SourcePayload<ExtArgs>
        fields: Prisma.SourceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SourceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findFirst: {
            args: Prisma.SourceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          findMany: {
            args: Prisma.SourceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          create: {
            args: Prisma.SourceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          createMany: {
            args: Prisma.SourceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          delete: {
            args: Prisma.SourceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          update: {
            args: Prisma.SourceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          deleteMany: {
            args: Prisma.SourceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SourceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SourceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>[]
          }
          upsert: {
            args: Prisma.SourceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SourcePayload>
          }
          aggregate: {
            args: Prisma.SourceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSource>
          }
          groupBy: {
            args: Prisma.SourceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SourceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SourceCountArgs<ExtArgs>
            result: $Utils.Optional<SourceCountAggregateOutputType> | number
          }
        }
      }
      SystemPrompt: {
        payload: Prisma.$SystemPromptPayload<ExtArgs>
        fields: Prisma.SystemPromptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemPromptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemPromptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          findFirst: {
            args: Prisma.SystemPromptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemPromptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          findMany: {
            args: Prisma.SystemPromptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          create: {
            args: Prisma.SystemPromptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          createMany: {
            args: Prisma.SystemPromptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemPromptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          delete: {
            args: Prisma.SystemPromptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          update: {
            args: Prisma.SystemPromptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          deleteMany: {
            args: Prisma.SystemPromptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemPromptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SystemPromptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>[]
          }
          upsert: {
            args: Prisma.SystemPromptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemPromptPayload>
          }
          aggregate: {
            args: Prisma.SystemPromptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemPrompt>
          }
          groupBy: {
            args: Prisma.SystemPromptGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemPromptGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemPromptCountArgs<ExtArgs>
            result: $Utils.Optional<SystemPromptCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ExploredUrl: {
        payload: Prisma.$ExploredUrlPayload<ExtArgs>
        fields: Prisma.ExploredUrlFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExploredUrlFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExploredUrlFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          findFirst: {
            args: Prisma.ExploredUrlFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExploredUrlFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          findMany: {
            args: Prisma.ExploredUrlFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>[]
          }
          create: {
            args: Prisma.ExploredUrlCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          createMany: {
            args: Prisma.ExploredUrlCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExploredUrlCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>[]
          }
          delete: {
            args: Prisma.ExploredUrlDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          update: {
            args: Prisma.ExploredUrlUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          deleteMany: {
            args: Prisma.ExploredUrlDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExploredUrlUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExploredUrlUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>[]
          }
          upsert: {
            args: Prisma.ExploredUrlUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExploredUrlPayload>
          }
          aggregate: {
            args: Prisma.ExploredUrlAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExploredUrl>
          }
          groupBy: {
            args: Prisma.ExploredUrlGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExploredUrlGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExploredUrlCountArgs<ExtArgs>
            result: $Utils.Optional<ExploredUrlCountAggregateOutputType> | number
          }
        }
      }
      RewrittenArticle: {
        payload: Prisma.$RewrittenArticlePayload<ExtArgs>
        fields: Prisma.RewrittenArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RewrittenArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RewrittenArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          findFirst: {
            args: Prisma.RewrittenArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RewrittenArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          findMany: {
            args: Prisma.RewrittenArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>[]
          }
          create: {
            args: Prisma.RewrittenArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          createMany: {
            args: Prisma.RewrittenArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RewrittenArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>[]
          }
          delete: {
            args: Prisma.RewrittenArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          update: {
            args: Prisma.RewrittenArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          deleteMany: {
            args: Prisma.RewrittenArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RewrittenArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RewrittenArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>[]
          }
          upsert: {
            args: Prisma.RewrittenArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RewrittenArticlePayload>
          }
          aggregate: {
            args: Prisma.RewrittenArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRewrittenArticle>
          }
          groupBy: {
            args: Prisma.RewrittenArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RewrittenArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RewrittenArticleCountArgs<ExtArgs>
            result: $Utils.Optional<RewrittenArticleCountAggregateOutputType> | number
          }
        }
      }
      Setting: {
        payload: Prisma.$SettingPayload<ExtArgs>
        fields: Prisma.SettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findFirst: {
            args: Prisma.SettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          findMany: {
            args: Prisma.SettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          create: {
            args: Prisma.SettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          createMany: {
            args: Prisma.SettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          delete: {
            args: Prisma.SettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          update: {
            args: Prisma.SettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          deleteMany: {
            args: Prisma.SettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>[]
          }
          upsert: {
            args: Prisma.SettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingPayload>
          }
          aggregate: {
            args: Prisma.SettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSetting>
          }
          groupBy: {
            args: Prisma.SettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingCountArgs<ExtArgs>
            result: $Utils.Optional<SettingCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    permission?: PermissionOmit
    userHasRole?: UserHasRoleOmit
    roleHasPermission?: RoleHasPermissionOmit
    source?: SourceOmit
    systemPrompt?: SystemPromptOmit
    article?: ArticleOmit
    exploredUrl?: ExploredUrlOmit
    rewrittenArticle?: RewrittenArticleOmit
    setting?: SettingOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    roles: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | UserCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserHasRoleWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
    permissions: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserHasRoleWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    roles: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
  }


  /**
   * Count Type SourceCountOutputType
   */

  export type SourceCountOutputType = {
    articles: number
    exploredUrls: number
  }

  export type SourceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | SourceCountOutputTypeCountArticlesArgs
    exploredUrls?: boolean | SourceCountOutputTypeCountExploredUrlsArgs
  }

  // Custom InputTypes
  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SourceCountOutputType
     */
    select?: SourceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }

  /**
   * SourceCountOutputType without action
   */
  export type SourceCountOutputTypeCountExploredUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExploredUrlWhereInput
  }


  /**
   * Count Type SystemPromptCountOutputType
   */

  export type SystemPromptCountOutputType = {
    rewrittenArticles: number
  }

  export type SystemPromptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewrittenArticles?: boolean | SystemPromptCountOutputTypeCountRewrittenArticlesArgs
  }

  // Custom InputTypes
  /**
   * SystemPromptCountOutputType without action
   */
  export type SystemPromptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPromptCountOutputType
     */
    select?: SystemPromptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SystemPromptCountOutputType without action
   */
  export type SystemPromptCountOutputTypeCountRewrittenArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewrittenArticleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | User$rolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | User$rolesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      roles: Prisma.$UserHasRolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends User$rolesArgs<ExtArgs> = {}>(args?: Subset<T, User$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.roles
   */
  export type User$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    where?: UserHasRoleWhereInput
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    cursor?: UserHasRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserHasRoleScalarFieldEnum | UserHasRoleScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserHasRolePayload<ExtArgs>[]
      permissions: Prisma.$RoleHasPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
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
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly description: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    where?: UserHasRoleWhereInput
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    cursor?: UserHasRoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserHasRoleScalarFieldEnum | UserHasRoleScalarFieldEnum[]
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    cursor?: RoleHasPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    name: string
    description: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      roles: Prisma.$RoleHasPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
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
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
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
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Permission$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly name: FieldRef<"Permission", 'String'>
    readonly description: FieldRef<"Permission", 'Json'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
    readonly updatedAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.roles
   */
  export type Permission$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    cursor?: RoleHasPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model UserHasRole
   */

  export type AggregateUserHasRole = {
    _count: UserHasRoleCountAggregateOutputType | null
    _min: UserHasRoleMinAggregateOutputType | null
    _max: UserHasRoleMaxAggregateOutputType | null
  }

  export type UserHasRoleMinAggregateOutputType = {
    userId: string | null
    roleId: string | null
  }

  export type UserHasRoleMaxAggregateOutputType = {
    userId: string | null
    roleId: string | null
  }

  export type UserHasRoleCountAggregateOutputType = {
    userId: number
    roleId: number
    _all: number
  }


  export type UserHasRoleMinAggregateInputType = {
    userId?: true
    roleId?: true
  }

  export type UserHasRoleMaxAggregateInputType = {
    userId?: true
    roleId?: true
  }

  export type UserHasRoleCountAggregateInputType = {
    userId?: true
    roleId?: true
    _all?: true
  }

  export type UserHasRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserHasRole to aggregate.
     */
    where?: UserHasRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserHasRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHasRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserHasRoles
    **/
    _count?: true | UserHasRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserHasRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserHasRoleMaxAggregateInputType
  }

  export type GetUserHasRoleAggregateType<T extends UserHasRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateUserHasRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserHasRole[P]>
      : GetScalarType<T[P], AggregateUserHasRole[P]>
  }




  export type UserHasRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserHasRoleWhereInput
    orderBy?: UserHasRoleOrderByWithAggregationInput | UserHasRoleOrderByWithAggregationInput[]
    by: UserHasRoleScalarFieldEnum[] | UserHasRoleScalarFieldEnum
    having?: UserHasRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserHasRoleCountAggregateInputType | true
    _min?: UserHasRoleMinAggregateInputType
    _max?: UserHasRoleMaxAggregateInputType
  }

  export type UserHasRoleGroupByOutputType = {
    userId: string
    roleId: string
    _count: UserHasRoleCountAggregateOutputType | null
    _min: UserHasRoleMinAggregateOutputType | null
    _max: UserHasRoleMaxAggregateOutputType | null
  }

  type GetUserHasRoleGroupByPayload<T extends UserHasRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserHasRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserHasRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserHasRoleGroupByOutputType[P]>
            : GetScalarType<T[P], UserHasRoleGroupByOutputType[P]>
        }
      >
    >


  export type UserHasRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHasRole"]>

  export type UserHasRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHasRole"]>

  export type UserHasRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    roleId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userHasRole"]>

  export type UserHasRoleSelectScalar = {
    userId?: boolean
    roleId?: boolean
  }

  export type UserHasRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "roleId", ExtArgs["result"]["userHasRole"]>
  export type UserHasRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserHasRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserHasRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserHasRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserHasRole"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      role: Prisma.$RolePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      roleId: string
    }, ExtArgs["result"]["userHasRole"]>
    composites: {}
  }

  type UserHasRoleGetPayload<S extends boolean | null | undefined | UserHasRoleDefaultArgs> = $Result.GetResult<Prisma.$UserHasRolePayload, S>

  type UserHasRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserHasRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserHasRoleCountAggregateInputType | true
    }

  export interface UserHasRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserHasRole'], meta: { name: 'UserHasRole' } }
    /**
     * Find zero or one UserHasRole that matches the filter.
     * @param {UserHasRoleFindUniqueArgs} args - Arguments to find a UserHasRole
     * @example
     * // Get one UserHasRole
     * const userHasRole = await prisma.userHasRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserHasRoleFindUniqueArgs>(args: SelectSubset<T, UserHasRoleFindUniqueArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserHasRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserHasRoleFindUniqueOrThrowArgs} args - Arguments to find a UserHasRole
     * @example
     * // Get one UserHasRole
     * const userHasRole = await prisma.userHasRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserHasRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, UserHasRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserHasRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleFindFirstArgs} args - Arguments to find a UserHasRole
     * @example
     * // Get one UserHasRole
     * const userHasRole = await prisma.userHasRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserHasRoleFindFirstArgs>(args?: SelectSubset<T, UserHasRoleFindFirstArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserHasRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleFindFirstOrThrowArgs} args - Arguments to find a UserHasRole
     * @example
     * // Get one UserHasRole
     * const userHasRole = await prisma.userHasRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserHasRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, UserHasRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserHasRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserHasRoles
     * const userHasRoles = await prisma.userHasRole.findMany()
     * 
     * // Get first 10 UserHasRoles
     * const userHasRoles = await prisma.userHasRole.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userHasRoleWithUserIdOnly = await prisma.userHasRole.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserHasRoleFindManyArgs>(args?: SelectSubset<T, UserHasRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserHasRole.
     * @param {UserHasRoleCreateArgs} args - Arguments to create a UserHasRole.
     * @example
     * // Create one UserHasRole
     * const UserHasRole = await prisma.userHasRole.create({
     *   data: {
     *     // ... data to create a UserHasRole
     *   }
     * })
     * 
     */
    create<T extends UserHasRoleCreateArgs>(args: SelectSubset<T, UserHasRoleCreateArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserHasRoles.
     * @param {UserHasRoleCreateManyArgs} args - Arguments to create many UserHasRoles.
     * @example
     * // Create many UserHasRoles
     * const userHasRole = await prisma.userHasRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserHasRoleCreateManyArgs>(args?: SelectSubset<T, UserHasRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserHasRoles and returns the data saved in the database.
     * @param {UserHasRoleCreateManyAndReturnArgs} args - Arguments to create many UserHasRoles.
     * @example
     * // Create many UserHasRoles
     * const userHasRole = await prisma.userHasRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserHasRoles and only return the `userId`
     * const userHasRoleWithUserIdOnly = await prisma.userHasRole.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserHasRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, UserHasRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserHasRole.
     * @param {UserHasRoleDeleteArgs} args - Arguments to delete one UserHasRole.
     * @example
     * // Delete one UserHasRole
     * const UserHasRole = await prisma.userHasRole.delete({
     *   where: {
     *     // ... filter to delete one UserHasRole
     *   }
     * })
     * 
     */
    delete<T extends UserHasRoleDeleteArgs>(args: SelectSubset<T, UserHasRoleDeleteArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserHasRole.
     * @param {UserHasRoleUpdateArgs} args - Arguments to update one UserHasRole.
     * @example
     * // Update one UserHasRole
     * const userHasRole = await prisma.userHasRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserHasRoleUpdateArgs>(args: SelectSubset<T, UserHasRoleUpdateArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserHasRoles.
     * @param {UserHasRoleDeleteManyArgs} args - Arguments to filter UserHasRoles to delete.
     * @example
     * // Delete a few UserHasRoles
     * const { count } = await prisma.userHasRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserHasRoleDeleteManyArgs>(args?: SelectSubset<T, UserHasRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserHasRoles
     * const userHasRole = await prisma.userHasRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserHasRoleUpdateManyArgs>(args: SelectSubset<T, UserHasRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserHasRoles and returns the data updated in the database.
     * @param {UserHasRoleUpdateManyAndReturnArgs} args - Arguments to update many UserHasRoles.
     * @example
     * // Update many UserHasRoles
     * const userHasRole = await prisma.userHasRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserHasRoles and only return the `userId`
     * const userHasRoleWithUserIdOnly = await prisma.userHasRole.updateManyAndReturn({
     *   select: { userId: true },
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
    updateManyAndReturn<T extends UserHasRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, UserHasRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserHasRole.
     * @param {UserHasRoleUpsertArgs} args - Arguments to update or create a UserHasRole.
     * @example
     * // Update or create a UserHasRole
     * const userHasRole = await prisma.userHasRole.upsert({
     *   create: {
     *     // ... data to create a UserHasRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserHasRole we want to update
     *   }
     * })
     */
    upsert<T extends UserHasRoleUpsertArgs>(args: SelectSubset<T, UserHasRoleUpsertArgs<ExtArgs>>): Prisma__UserHasRoleClient<$Result.GetResult<Prisma.$UserHasRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserHasRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleCountArgs} args - Arguments to filter UserHasRoles to count.
     * @example
     * // Count the number of UserHasRoles
     * const count = await prisma.userHasRole.count({
     *   where: {
     *     // ... the filter for the UserHasRoles we want to count
     *   }
     * })
    **/
    count<T extends UserHasRoleCountArgs>(
      args?: Subset<T, UserHasRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserHasRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserHasRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserHasRoleAggregateArgs>(args: Subset<T, UserHasRoleAggregateArgs>): Prisma.PrismaPromise<GetUserHasRoleAggregateType<T>>

    /**
     * Group by UserHasRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserHasRoleGroupByArgs} args - Group by arguments.
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
      T extends UserHasRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserHasRoleGroupByArgs['orderBy'] }
        : { orderBy?: UserHasRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserHasRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserHasRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserHasRole model
   */
  readonly fields: UserHasRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserHasRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserHasRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserHasRole model
   */
  interface UserHasRoleFieldRefs {
    readonly userId: FieldRef<"UserHasRole", 'String'>
    readonly roleId: FieldRef<"UserHasRole", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserHasRole findUnique
   */
  export type UserHasRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserHasRole to fetch.
     */
    where: UserHasRoleWhereUniqueInput
  }

  /**
   * UserHasRole findUniqueOrThrow
   */
  export type UserHasRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserHasRole to fetch.
     */
    where: UserHasRoleWhereUniqueInput
  }

  /**
   * UserHasRole findFirst
   */
  export type UserHasRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserHasRole to fetch.
     */
    where?: UserHasRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserHasRoles.
     */
    cursor?: UserHasRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHasRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: UserHasRoleScalarFieldEnum | UserHasRoleScalarFieldEnum[]
  }

  /**
   * UserHasRole findFirstOrThrow
   */
  export type UserHasRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserHasRole to fetch.
     */
    where?: UserHasRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserHasRoles.
     */
    cursor?: UserHasRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHasRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: UserHasRoleScalarFieldEnum | UserHasRoleScalarFieldEnum[]
  }

  /**
   * UserHasRole findMany
   */
  export type UserHasRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter, which UserHasRoles to fetch.
     */
    where?: UserHasRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserHasRoles to fetch.
     */
    orderBy?: UserHasRoleOrderByWithRelationInput | UserHasRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserHasRoles.
     */
    cursor?: UserHasRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserHasRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserHasRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserHasRoles.
     */
    distinct?: UserHasRoleScalarFieldEnum | UserHasRoleScalarFieldEnum[]
  }

  /**
   * UserHasRole create
   */
  export type UserHasRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a UserHasRole.
     */
    data: XOR<UserHasRoleCreateInput, UserHasRoleUncheckedCreateInput>
  }

  /**
   * UserHasRole createMany
   */
  export type UserHasRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserHasRoles.
     */
    data: UserHasRoleCreateManyInput | UserHasRoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserHasRole createManyAndReturn
   */
  export type UserHasRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * The data used to create many UserHasRoles.
     */
    data: UserHasRoleCreateManyInput | UserHasRoleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserHasRole update
   */
  export type UserHasRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a UserHasRole.
     */
    data: XOR<UserHasRoleUpdateInput, UserHasRoleUncheckedUpdateInput>
    /**
     * Choose, which UserHasRole to update.
     */
    where: UserHasRoleWhereUniqueInput
  }

  /**
   * UserHasRole updateMany
   */
  export type UserHasRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserHasRoles.
     */
    data: XOR<UserHasRoleUpdateManyMutationInput, UserHasRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserHasRoles to update
     */
    where?: UserHasRoleWhereInput
    /**
     * Limit how many UserHasRoles to update.
     */
    limit?: number
  }

  /**
   * UserHasRole updateManyAndReturn
   */
  export type UserHasRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * The data used to update UserHasRoles.
     */
    data: XOR<UserHasRoleUpdateManyMutationInput, UserHasRoleUncheckedUpdateManyInput>
    /**
     * Filter which UserHasRoles to update
     */
    where?: UserHasRoleWhereInput
    /**
     * Limit how many UserHasRoles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserHasRole upsert
   */
  export type UserHasRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the UserHasRole to update in case it exists.
     */
    where: UserHasRoleWhereUniqueInput
    /**
     * In case the UserHasRole found by the `where` argument doesn't exist, create a new UserHasRole with this data.
     */
    create: XOR<UserHasRoleCreateInput, UserHasRoleUncheckedCreateInput>
    /**
     * In case the UserHasRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserHasRoleUpdateInput, UserHasRoleUncheckedUpdateInput>
  }

  /**
   * UserHasRole delete
   */
  export type UserHasRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
    /**
     * Filter which UserHasRole to delete.
     */
    where: UserHasRoleWhereUniqueInput
  }

  /**
   * UserHasRole deleteMany
   */
  export type UserHasRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserHasRoles to delete
     */
    where?: UserHasRoleWhereInput
    /**
     * Limit how many UserHasRoles to delete.
     */
    limit?: number
  }

  /**
   * UserHasRole without action
   */
  export type UserHasRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserHasRole
     */
    select?: UserHasRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserHasRole
     */
    omit?: UserHasRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserHasRoleInclude<ExtArgs> | null
  }


  /**
   * Model RoleHasPermission
   */

  export type AggregateRoleHasPermission = {
    _count: RoleHasPermissionCountAggregateOutputType | null
    _min: RoleHasPermissionMinAggregateOutputType | null
    _max: RoleHasPermissionMaxAggregateOutputType | null
  }

  export type RoleHasPermissionMinAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
  }

  export type RoleHasPermissionMaxAggregateOutputType = {
    roleId: string | null
    permissionId: string | null
  }

  export type RoleHasPermissionCountAggregateOutputType = {
    roleId: number
    permissionId: number
    _all: number
  }


  export type RoleHasPermissionMinAggregateInputType = {
    roleId?: true
    permissionId?: true
  }

  export type RoleHasPermissionMaxAggregateInputType = {
    roleId?: true
    permissionId?: true
  }

  export type RoleHasPermissionCountAggregateInputType = {
    roleId?: true
    permissionId?: true
    _all?: true
  }

  export type RoleHasPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermission to aggregate.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoleHasPermissions
    **/
    _count?: true | RoleHasPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleHasPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleHasPermissionMaxAggregateInputType
  }

  export type GetRoleHasPermissionAggregateType<T extends RoleHasPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateRoleHasPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoleHasPermission[P]>
      : GetScalarType<T[P], AggregateRoleHasPermission[P]>
  }




  export type RoleHasPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleHasPermissionWhereInput
    orderBy?: RoleHasPermissionOrderByWithAggregationInput | RoleHasPermissionOrderByWithAggregationInput[]
    by: RoleHasPermissionScalarFieldEnum[] | RoleHasPermissionScalarFieldEnum
    having?: RoleHasPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleHasPermissionCountAggregateInputType | true
    _min?: RoleHasPermissionMinAggregateInputType
    _max?: RoleHasPermissionMaxAggregateInputType
  }

  export type RoleHasPermissionGroupByOutputType = {
    roleId: string
    permissionId: string
    _count: RoleHasPermissionCountAggregateOutputType | null
    _min: RoleHasPermissionMinAggregateOutputType | null
    _max: RoleHasPermissionMaxAggregateOutputType | null
  }

  type GetRoleHasPermissionGroupByPayload<T extends RoleHasPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleHasPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleHasPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleHasPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], RoleHasPermissionGroupByOutputType[P]>
        }
      >
    >


  export type RoleHasPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    roleId?: boolean
    permissionId?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roleHasPermission"]>

  export type RoleHasPermissionSelectScalar = {
    roleId?: boolean
    permissionId?: boolean
  }

  export type RoleHasPermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"roleId" | "permissionId", ExtArgs["result"]["roleHasPermission"]>
  export type RoleHasPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RoleHasPermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }
  export type RoleHasPermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    permission?: boolean | PermissionDefaultArgs<ExtArgs>
  }

  export type $RoleHasPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoleHasPermission"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      permission: Prisma.$PermissionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      roleId: string
      permissionId: string
    }, ExtArgs["result"]["roleHasPermission"]>
    composites: {}
  }

  type RoleHasPermissionGetPayload<S extends boolean | null | undefined | RoleHasPermissionDefaultArgs> = $Result.GetResult<Prisma.$RoleHasPermissionPayload, S>

  type RoleHasPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleHasPermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleHasPermissionCountAggregateInputType | true
    }

  export interface RoleHasPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoleHasPermission'], meta: { name: 'RoleHasPermission' } }
    /**
     * Find zero or one RoleHasPermission that matches the filter.
     * @param {RoleHasPermissionFindUniqueArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleHasPermissionFindUniqueArgs>(args: SelectSubset<T, RoleHasPermissionFindUniqueArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoleHasPermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleHasPermissionFindUniqueOrThrowArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleHasPermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleHasPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindFirstArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleHasPermissionFindFirstArgs>(args?: SelectSubset<T, RoleHasPermissionFindFirstArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoleHasPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindFirstOrThrowArgs} args - Arguments to find a RoleHasPermission
     * @example
     * // Get one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleHasPermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleHasPermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoleHasPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermission.findMany()
     * 
     * // Get first 10 RoleHasPermissions
     * const roleHasPermissions = await prisma.roleHasPermission.findMany({ take: 10 })
     * 
     * // Only select the `roleId`
     * const roleHasPermissionWithRoleIdOnly = await prisma.roleHasPermission.findMany({ select: { roleId: true } })
     * 
     */
    findMany<T extends RoleHasPermissionFindManyArgs>(args?: SelectSubset<T, RoleHasPermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoleHasPermission.
     * @param {RoleHasPermissionCreateArgs} args - Arguments to create a RoleHasPermission.
     * @example
     * // Create one RoleHasPermission
     * const RoleHasPermission = await prisma.roleHasPermission.create({
     *   data: {
     *     // ... data to create a RoleHasPermission
     *   }
     * })
     * 
     */
    create<T extends RoleHasPermissionCreateArgs>(args: SelectSubset<T, RoleHasPermissionCreateArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoleHasPermissions.
     * @param {RoleHasPermissionCreateManyArgs} args - Arguments to create many RoleHasPermissions.
     * @example
     * // Create many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleHasPermissionCreateManyArgs>(args?: SelectSubset<T, RoleHasPermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoleHasPermissions and returns the data saved in the database.
     * @param {RoleHasPermissionCreateManyAndReturnArgs} args - Arguments to create many RoleHasPermissions.
     * @example
     * // Create many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoleHasPermissions and only return the `roleId`
     * const roleHasPermissionWithRoleIdOnly = await prisma.roleHasPermission.createManyAndReturn({
     *   select: { roleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleHasPermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleHasPermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoleHasPermission.
     * @param {RoleHasPermissionDeleteArgs} args - Arguments to delete one RoleHasPermission.
     * @example
     * // Delete one RoleHasPermission
     * const RoleHasPermission = await prisma.roleHasPermission.delete({
     *   where: {
     *     // ... filter to delete one RoleHasPermission
     *   }
     * })
     * 
     */
    delete<T extends RoleHasPermissionDeleteArgs>(args: SelectSubset<T, RoleHasPermissionDeleteArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoleHasPermission.
     * @param {RoleHasPermissionUpdateArgs} args - Arguments to update one RoleHasPermission.
     * @example
     * // Update one RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleHasPermissionUpdateArgs>(args: SelectSubset<T, RoleHasPermissionUpdateArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoleHasPermissions.
     * @param {RoleHasPermissionDeleteManyArgs} args - Arguments to filter RoleHasPermissions to delete.
     * @example
     * // Delete a few RoleHasPermissions
     * const { count } = await prisma.roleHasPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleHasPermissionDeleteManyArgs>(args?: SelectSubset<T, RoleHasPermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleHasPermissionUpdateManyArgs>(args: SelectSubset<T, RoleHasPermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoleHasPermissions and returns the data updated in the database.
     * @param {RoleHasPermissionUpdateManyAndReturnArgs} args - Arguments to update many RoleHasPermissions.
     * @example
     * // Update many RoleHasPermissions
     * const roleHasPermission = await prisma.roleHasPermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoleHasPermissions and only return the `roleId`
     * const roleHasPermissionWithRoleIdOnly = await prisma.roleHasPermission.updateManyAndReturn({
     *   select: { roleId: true },
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
    updateManyAndReturn<T extends RoleHasPermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoleHasPermission.
     * @param {RoleHasPermissionUpsertArgs} args - Arguments to update or create a RoleHasPermission.
     * @example
     * // Update or create a RoleHasPermission
     * const roleHasPermission = await prisma.roleHasPermission.upsert({
     *   create: {
     *     // ... data to create a RoleHasPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoleHasPermission we want to update
     *   }
     * })
     */
    upsert<T extends RoleHasPermissionUpsertArgs>(args: SelectSubset<T, RoleHasPermissionUpsertArgs<ExtArgs>>): Prisma__RoleHasPermissionClient<$Result.GetResult<Prisma.$RoleHasPermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoleHasPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionCountArgs} args - Arguments to filter RoleHasPermissions to count.
     * @example
     * // Count the number of RoleHasPermissions
     * const count = await prisma.roleHasPermission.count({
     *   where: {
     *     // ... the filter for the RoleHasPermissions we want to count
     *   }
     * })
    **/
    count<T extends RoleHasPermissionCountArgs>(
      args?: Subset<T, RoleHasPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleHasPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoleHasPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoleHasPermissionAggregateArgs>(args: Subset<T, RoleHasPermissionAggregateArgs>): Prisma.PrismaPromise<GetRoleHasPermissionAggregateType<T>>

    /**
     * Group by RoleHasPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleHasPermissionGroupByArgs} args - Group by arguments.
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
      T extends RoleHasPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleHasPermissionGroupByArgs['orderBy'] }
        : { orderBy?: RoleHasPermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoleHasPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleHasPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoleHasPermission model
   */
  readonly fields: RoleHasPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoleHasPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleHasPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permission<T extends PermissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionDefaultArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RoleHasPermission model
   */
  interface RoleHasPermissionFieldRefs {
    readonly roleId: FieldRef<"RoleHasPermission", 'String'>
    readonly permissionId: FieldRef<"RoleHasPermission", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RoleHasPermission findUnique
   */
  export type RoleHasPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission findUniqueOrThrow
   */
  export type RoleHasPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission findFirst
   */
  export type RoleHasPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission findFirstOrThrow
   */
  export type RoleHasPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermission to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission findMany
   */
  export type RoleHasPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter, which RoleHasPermissions to fetch.
     */
    where?: RoleHasPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoleHasPermissions to fetch.
     */
    orderBy?: RoleHasPermissionOrderByWithRelationInput | RoleHasPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoleHasPermissions.
     */
    cursor?: RoleHasPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoleHasPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoleHasPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoleHasPermissions.
     */
    distinct?: RoleHasPermissionScalarFieldEnum | RoleHasPermissionScalarFieldEnum[]
  }

  /**
   * RoleHasPermission create
   */
  export type RoleHasPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a RoleHasPermission.
     */
    data: XOR<RoleHasPermissionCreateInput, RoleHasPermissionUncheckedCreateInput>
  }

  /**
   * RoleHasPermission createMany
   */
  export type RoleHasPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoleHasPermissions.
     */
    data: RoleHasPermissionCreateManyInput | RoleHasPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoleHasPermission createManyAndReturn
   */
  export type RoleHasPermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * The data used to create many RoleHasPermissions.
     */
    data: RoleHasPermissionCreateManyInput | RoleHasPermissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleHasPermission update
   */
  export type RoleHasPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a RoleHasPermission.
     */
    data: XOR<RoleHasPermissionUpdateInput, RoleHasPermissionUncheckedUpdateInput>
    /**
     * Choose, which RoleHasPermission to update.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission updateMany
   */
  export type RoleHasPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoleHasPermissions.
     */
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyInput>
    /**
     * Filter which RoleHasPermissions to update
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to update.
     */
    limit?: number
  }

  /**
   * RoleHasPermission updateManyAndReturn
   */
  export type RoleHasPermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * The data used to update RoleHasPermissions.
     */
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyInput>
    /**
     * Filter which RoleHasPermissions to update
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoleHasPermission upsert
   */
  export type RoleHasPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the RoleHasPermission to update in case it exists.
     */
    where: RoleHasPermissionWhereUniqueInput
    /**
     * In case the RoleHasPermission found by the `where` argument doesn't exist, create a new RoleHasPermission with this data.
     */
    create: XOR<RoleHasPermissionCreateInput, RoleHasPermissionUncheckedCreateInput>
    /**
     * In case the RoleHasPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleHasPermissionUpdateInput, RoleHasPermissionUncheckedUpdateInput>
  }

  /**
   * RoleHasPermission delete
   */
  export type RoleHasPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
    /**
     * Filter which RoleHasPermission to delete.
     */
    where: RoleHasPermissionWhereUniqueInput
  }

  /**
   * RoleHasPermission deleteMany
   */
  export type RoleHasPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoleHasPermissions to delete
     */
    where?: RoleHasPermissionWhereInput
    /**
     * Limit how many RoleHasPermissions to delete.
     */
    limit?: number
  }

  /**
   * RoleHasPermission without action
   */
  export type RoleHasPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleHasPermission
     */
    select?: RoleHasPermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoleHasPermission
     */
    omit?: RoleHasPermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleHasPermissionInclude<ExtArgs> | null
  }


  /**
   * Model Source
   */

  export type AggregateSource = {
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  export type SourceAvgAggregateOutputType = {
    requestDelayMs: number | null
  }

  export type SourceSumAggregateOutputType = {
    requestDelayMs: number | null
  }

  export type SourceMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: $Enums.SourceType | null
    isActive: boolean | null
    parserKey: string | null
    requestDelayMs: number | null
    lastFetched: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SourceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    type: $Enums.SourceType | null
    isActive: boolean | null
    parserKey: string | null
    requestDelayMs: number | null
    lastFetched: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SourceCountAggregateOutputType = {
    id: number
    name: number
    url: number
    type: number
    isActive: number
    parserKey: number
    requestDelayMs: number
    lastFetched: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SourceAvgAggregateInputType = {
    requestDelayMs?: true
  }

  export type SourceSumAggregateInputType = {
    requestDelayMs?: true
  }

  export type SourceMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    isActive?: true
    parserKey?: true
    requestDelayMs?: true
    lastFetched?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SourceMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    isActive?: true
    parserKey?: true
    requestDelayMs?: true
    lastFetched?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SourceCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    type?: true
    isActive?: true
    parserKey?: true
    requestDelayMs?: true
    lastFetched?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SourceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Source to aggregate.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sources
    **/
    _count?: true | SourceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SourceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SourceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SourceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SourceMaxAggregateInputType
  }

  export type GetSourceAggregateType<T extends SourceAggregateArgs> = {
        [P in keyof T & keyof AggregateSource]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSource[P]>
      : GetScalarType<T[P], AggregateSource[P]>
  }




  export type SourceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SourceWhereInput
    orderBy?: SourceOrderByWithAggregationInput | SourceOrderByWithAggregationInput[]
    by: SourceScalarFieldEnum[] | SourceScalarFieldEnum
    having?: SourceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SourceCountAggregateInputType | true
    _avg?: SourceAvgAggregateInputType
    _sum?: SourceSumAggregateInputType
    _min?: SourceMinAggregateInputType
    _max?: SourceMaxAggregateInputType
  }

  export type SourceGroupByOutputType = {
    id: string
    name: string
    url: string
    type: $Enums.SourceType
    isActive: boolean
    parserKey: string | null
    requestDelayMs: number
    lastFetched: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SourceCountAggregateOutputType | null
    _avg: SourceAvgAggregateOutputType | null
    _sum: SourceSumAggregateOutputType | null
    _min: SourceMinAggregateOutputType | null
    _max: SourceMaxAggregateOutputType | null
  }

  type GetSourceGroupByPayload<T extends SourceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SourceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SourceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SourceGroupByOutputType[P]>
            : GetScalarType<T[P], SourceGroupByOutputType[P]>
        }
      >
    >


  export type SourceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    isActive?: boolean
    parserKey?: boolean
    requestDelayMs?: boolean
    lastFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    articles?: boolean | Source$articlesArgs<ExtArgs>
    exploredUrls?: boolean | Source$exploredUrlsArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["source"]>

  export type SourceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    isActive?: boolean
    parserKey?: boolean
    requestDelayMs?: boolean
    lastFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    isActive?: boolean
    parserKey?: boolean
    requestDelayMs?: boolean
    lastFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["source"]>

  export type SourceSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    type?: boolean
    isActive?: boolean
    parserKey?: boolean
    requestDelayMs?: boolean
    lastFetched?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SourceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "type" | "isActive" | "parserKey" | "requestDelayMs" | "lastFetched" | "createdAt" | "updatedAt", ExtArgs["result"]["source"]>
  export type SourceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | Source$articlesArgs<ExtArgs>
    exploredUrls?: boolean | Source$exploredUrlsArgs<ExtArgs>
    _count?: boolean | SourceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SourceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SourceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SourcePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Source"
    objects: {
      articles: Prisma.$ArticlePayload<ExtArgs>[]
      exploredUrls: Prisma.$ExploredUrlPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      type: $Enums.SourceType
      isActive: boolean
      parserKey: string | null
      requestDelayMs: number
      lastFetched: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["source"]>
    composites: {}
  }

  type SourceGetPayload<S extends boolean | null | undefined | SourceDefaultArgs> = $Result.GetResult<Prisma.$SourcePayload, S>

  type SourceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SourceCountAggregateInputType | true
    }

  export interface SourceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Source'], meta: { name: 'Source' } }
    /**
     * Find zero or one Source that matches the filter.
     * @param {SourceFindUniqueArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SourceFindUniqueArgs>(args: SelectSubset<T, SourceFindUniqueArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Source that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SourceFindUniqueOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SourceFindUniqueOrThrowArgs>(args: SelectSubset<T, SourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SourceFindFirstArgs>(args?: SelectSubset<T, SourceFindFirstArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Source that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindFirstOrThrowArgs} args - Arguments to find a Source
     * @example
     * // Get one Source
     * const source = await prisma.source.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SourceFindFirstOrThrowArgs>(args?: SelectSubset<T, SourceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sources
     * const sources = await prisma.source.findMany()
     * 
     * // Get first 10 Sources
     * const sources = await prisma.source.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sourceWithIdOnly = await prisma.source.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SourceFindManyArgs>(args?: SelectSubset<T, SourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Source.
     * @param {SourceCreateArgs} args - Arguments to create a Source.
     * @example
     * // Create one Source
     * const Source = await prisma.source.create({
     *   data: {
     *     // ... data to create a Source
     *   }
     * })
     * 
     */
    create<T extends SourceCreateArgs>(args: SelectSubset<T, SourceCreateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sources.
     * @param {SourceCreateManyArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SourceCreateManyArgs>(args?: SelectSubset<T, SourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sources and returns the data saved in the database.
     * @param {SourceCreateManyAndReturnArgs} args - Arguments to create many Sources.
     * @example
     * // Create many Sources
     * const source = await prisma.source.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SourceCreateManyAndReturnArgs>(args?: SelectSubset<T, SourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Source.
     * @param {SourceDeleteArgs} args - Arguments to delete one Source.
     * @example
     * // Delete one Source
     * const Source = await prisma.source.delete({
     *   where: {
     *     // ... filter to delete one Source
     *   }
     * })
     * 
     */
    delete<T extends SourceDeleteArgs>(args: SelectSubset<T, SourceDeleteArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Source.
     * @param {SourceUpdateArgs} args - Arguments to update one Source.
     * @example
     * // Update one Source
     * const source = await prisma.source.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SourceUpdateArgs>(args: SelectSubset<T, SourceUpdateArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sources.
     * @param {SourceDeleteManyArgs} args - Arguments to filter Sources to delete.
     * @example
     * // Delete a few Sources
     * const { count } = await prisma.source.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SourceDeleteManyArgs>(args?: SelectSubset<T, SourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SourceUpdateManyArgs>(args: SelectSubset<T, SourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sources and returns the data updated in the database.
     * @param {SourceUpdateManyAndReturnArgs} args - Arguments to update many Sources.
     * @example
     * // Update many Sources
     * const source = await prisma.source.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sources and only return the `id`
     * const sourceWithIdOnly = await prisma.source.updateManyAndReturn({
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
    updateManyAndReturn<T extends SourceUpdateManyAndReturnArgs>(args: SelectSubset<T, SourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Source.
     * @param {SourceUpsertArgs} args - Arguments to update or create a Source.
     * @example
     * // Update or create a Source
     * const source = await prisma.source.upsert({
     *   create: {
     *     // ... data to create a Source
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Source we want to update
     *   }
     * })
     */
    upsert<T extends SourceUpsertArgs>(args: SelectSubset<T, SourceUpsertArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceCountArgs} args - Arguments to filter Sources to count.
     * @example
     * // Count the number of Sources
     * const count = await prisma.source.count({
     *   where: {
     *     // ... the filter for the Sources we want to count
     *   }
     * })
    **/
    count<T extends SourceCountArgs>(
      args?: Subset<T, SourceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SourceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SourceAggregateArgs>(args: Subset<T, SourceAggregateArgs>): Prisma.PrismaPromise<GetSourceAggregateType<T>>

    /**
     * Group by Source.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SourceGroupByArgs} args - Group by arguments.
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
      T extends SourceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SourceGroupByArgs['orderBy'] }
        : { orderBy?: SourceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Source model
   */
  readonly fields: SourceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Source.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SourceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends Source$articlesArgs<ExtArgs> = {}>(args?: Subset<T, Source$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exploredUrls<T extends Source$exploredUrlsArgs<ExtArgs> = {}>(args?: Subset<T, Source$exploredUrlsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Source model
   */
  interface SourceFieldRefs {
    readonly id: FieldRef<"Source", 'String'>
    readonly name: FieldRef<"Source", 'String'>
    readonly url: FieldRef<"Source", 'String'>
    readonly type: FieldRef<"Source", 'SourceType'>
    readonly isActive: FieldRef<"Source", 'Boolean'>
    readonly parserKey: FieldRef<"Source", 'String'>
    readonly requestDelayMs: FieldRef<"Source", 'Int'>
    readonly lastFetched: FieldRef<"Source", 'DateTime'>
    readonly createdAt: FieldRef<"Source", 'DateTime'>
    readonly updatedAt: FieldRef<"Source", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Source findUnique
   */
  export type SourceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findUniqueOrThrow
   */
  export type SourceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source findFirst
   */
  export type SourceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findFirstOrThrow
   */
  export type SourceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Source to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source findMany
   */
  export type SourceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter, which Sources to fetch.
     */
    where?: SourceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sources to fetch.
     */
    orderBy?: SourceOrderByWithRelationInput | SourceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sources.
     */
    cursor?: SourceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sources from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sources.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sources.
     */
    distinct?: SourceScalarFieldEnum | SourceScalarFieldEnum[]
  }

  /**
   * Source create
   */
  export type SourceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to create a Source.
     */
    data: XOR<SourceCreateInput, SourceUncheckedCreateInput>
  }

  /**
   * Source createMany
   */
  export type SourceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source createManyAndReturn
   */
  export type SourceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to create many Sources.
     */
    data: SourceCreateManyInput | SourceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Source update
   */
  export type SourceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The data needed to update a Source.
     */
    data: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
    /**
     * Choose, which Source to update.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source updateMany
   */
  export type SourceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source updateManyAndReturn
   */
  export type SourceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * The data used to update Sources.
     */
    data: XOR<SourceUpdateManyMutationInput, SourceUncheckedUpdateManyInput>
    /**
     * Filter which Sources to update
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to update.
     */
    limit?: number
  }

  /**
   * Source upsert
   */
  export type SourceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * The filter to search for the Source to update in case it exists.
     */
    where: SourceWhereUniqueInput
    /**
     * In case the Source found by the `where` argument doesn't exist, create a new Source with this data.
     */
    create: XOR<SourceCreateInput, SourceUncheckedCreateInput>
    /**
     * In case the Source was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SourceUpdateInput, SourceUncheckedUpdateInput>
  }

  /**
   * Source delete
   */
  export type SourceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
    /**
     * Filter which Source to delete.
     */
    where: SourceWhereUniqueInput
  }

  /**
   * Source deleteMany
   */
  export type SourceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sources to delete
     */
    where?: SourceWhereInput
    /**
     * Limit how many Sources to delete.
     */
    limit?: number
  }

  /**
   * Source.articles
   */
  export type Source$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Source.exploredUrls
   */
  export type Source$exploredUrlsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    where?: ExploredUrlWhereInput
    orderBy?: ExploredUrlOrderByWithRelationInput | ExploredUrlOrderByWithRelationInput[]
    cursor?: ExploredUrlWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExploredUrlScalarFieldEnum | ExploredUrlScalarFieldEnum[]
  }

  /**
   * Source without action
   */
  export type SourceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Source
     */
    select?: SourceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Source
     */
    omit?: SourceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SourceInclude<ExtArgs> | null
  }


  /**
   * Model SystemPrompt
   */

  export type AggregateSystemPrompt = {
    _count: SystemPromptCountAggregateOutputType | null
    _min: SystemPromptMinAggregateOutputType | null
    _max: SystemPromptMaxAggregateOutputType | null
  }

  export type SystemPromptMinAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemPromptMaxAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    description: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemPromptCountAggregateOutputType = {
    id: number
    name: number
    content: number
    description: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemPromptMinAggregateInputType = {
    id?: true
    name?: true
    content?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemPromptMaxAggregateInputType = {
    id?: true
    name?: true
    content?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemPromptCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    description?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemPromptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemPrompt to aggregate.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemPrompts
    **/
    _count?: true | SystemPromptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemPromptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemPromptMaxAggregateInputType
  }

  export type GetSystemPromptAggregateType<T extends SystemPromptAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemPrompt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemPrompt[P]>
      : GetScalarType<T[P], AggregateSystemPrompt[P]>
  }




  export type SystemPromptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemPromptWhereInput
    orderBy?: SystemPromptOrderByWithAggregationInput | SystemPromptOrderByWithAggregationInput[]
    by: SystemPromptScalarFieldEnum[] | SystemPromptScalarFieldEnum
    having?: SystemPromptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemPromptCountAggregateInputType | true
    _min?: SystemPromptMinAggregateInputType
    _max?: SystemPromptMaxAggregateInputType
  }

  export type SystemPromptGroupByOutputType = {
    id: string
    name: string
    content: string
    description: string | null
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: SystemPromptCountAggregateOutputType | null
    _min: SystemPromptMinAggregateOutputType | null
    _max: SystemPromptMaxAggregateOutputType | null
  }

  type GetSystemPromptGroupByPayload<T extends SystemPromptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemPromptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemPromptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemPromptGroupByOutputType[P]>
            : GetScalarType<T[P], SystemPromptGroupByOutputType[P]>
        }
      >
    >


  export type SystemPromptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    rewrittenArticles?: boolean | SystemPrompt$rewrittenArticlesArgs<ExtArgs>
    _count?: boolean | SystemPromptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemPrompt"]>

  export type SystemPromptSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    description?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SystemPromptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "content" | "description" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["systemPrompt"]>
  export type SystemPromptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rewrittenArticles?: boolean | SystemPrompt$rewrittenArticlesArgs<ExtArgs>
    _count?: boolean | SystemPromptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SystemPromptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SystemPromptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SystemPromptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemPrompt"
    objects: {
      rewrittenArticles: Prisma.$RewrittenArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      content: string
      description: string | null
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemPrompt"]>
    composites: {}
  }

  type SystemPromptGetPayload<S extends boolean | null | undefined | SystemPromptDefaultArgs> = $Result.GetResult<Prisma.$SystemPromptPayload, S>

  type SystemPromptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SystemPromptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SystemPromptCountAggregateInputType | true
    }

  export interface SystemPromptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemPrompt'], meta: { name: 'SystemPrompt' } }
    /**
     * Find zero or one SystemPrompt that matches the filter.
     * @param {SystemPromptFindUniqueArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemPromptFindUniqueArgs>(args: SelectSubset<T, SystemPromptFindUniqueArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SystemPrompt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SystemPromptFindUniqueOrThrowArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemPromptFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemPromptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemPrompt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindFirstArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemPromptFindFirstArgs>(args?: SelectSubset<T, SystemPromptFindFirstArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SystemPrompt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindFirstOrThrowArgs} args - Arguments to find a SystemPrompt
     * @example
     * // Get one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemPromptFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemPromptFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SystemPrompts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemPrompts
     * const systemPrompts = await prisma.systemPrompt.findMany()
     * 
     * // Get first 10 SystemPrompts
     * const systemPrompts = await prisma.systemPrompt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemPromptFindManyArgs>(args?: SelectSubset<T, SystemPromptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SystemPrompt.
     * @param {SystemPromptCreateArgs} args - Arguments to create a SystemPrompt.
     * @example
     * // Create one SystemPrompt
     * const SystemPrompt = await prisma.systemPrompt.create({
     *   data: {
     *     // ... data to create a SystemPrompt
     *   }
     * })
     * 
     */
    create<T extends SystemPromptCreateArgs>(args: SelectSubset<T, SystemPromptCreateArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SystemPrompts.
     * @param {SystemPromptCreateManyArgs} args - Arguments to create many SystemPrompts.
     * @example
     * // Create many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemPromptCreateManyArgs>(args?: SelectSubset<T, SystemPromptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemPrompts and returns the data saved in the database.
     * @param {SystemPromptCreateManyAndReturnArgs} args - Arguments to create many SystemPrompts.
     * @example
     * // Create many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemPrompts and only return the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemPromptCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemPromptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SystemPrompt.
     * @param {SystemPromptDeleteArgs} args - Arguments to delete one SystemPrompt.
     * @example
     * // Delete one SystemPrompt
     * const SystemPrompt = await prisma.systemPrompt.delete({
     *   where: {
     *     // ... filter to delete one SystemPrompt
     *   }
     * })
     * 
     */
    delete<T extends SystemPromptDeleteArgs>(args: SelectSubset<T, SystemPromptDeleteArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SystemPrompt.
     * @param {SystemPromptUpdateArgs} args - Arguments to update one SystemPrompt.
     * @example
     * // Update one SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemPromptUpdateArgs>(args: SelectSubset<T, SystemPromptUpdateArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SystemPrompts.
     * @param {SystemPromptDeleteManyArgs} args - Arguments to filter SystemPrompts to delete.
     * @example
     * // Delete a few SystemPrompts
     * const { count } = await prisma.systemPrompt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemPromptDeleteManyArgs>(args?: SelectSubset<T, SystemPromptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemPromptUpdateManyArgs>(args: SelectSubset<T, SystemPromptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemPrompts and returns the data updated in the database.
     * @param {SystemPromptUpdateManyAndReturnArgs} args - Arguments to update many SystemPrompts.
     * @example
     * // Update many SystemPrompts
     * const systemPrompt = await prisma.systemPrompt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SystemPrompts and only return the `id`
     * const systemPromptWithIdOnly = await prisma.systemPrompt.updateManyAndReturn({
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
    updateManyAndReturn<T extends SystemPromptUpdateManyAndReturnArgs>(args: SelectSubset<T, SystemPromptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SystemPrompt.
     * @param {SystemPromptUpsertArgs} args - Arguments to update or create a SystemPrompt.
     * @example
     * // Update or create a SystemPrompt
     * const systemPrompt = await prisma.systemPrompt.upsert({
     *   create: {
     *     // ... data to create a SystemPrompt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemPrompt we want to update
     *   }
     * })
     */
    upsert<T extends SystemPromptUpsertArgs>(args: SelectSubset<T, SystemPromptUpsertArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SystemPrompts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptCountArgs} args - Arguments to filter SystemPrompts to count.
     * @example
     * // Count the number of SystemPrompts
     * const count = await prisma.systemPrompt.count({
     *   where: {
     *     // ... the filter for the SystemPrompts we want to count
     *   }
     * })
    **/
    count<T extends SystemPromptCountArgs>(
      args?: Subset<T, SystemPromptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemPromptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SystemPromptAggregateArgs>(args: Subset<T, SystemPromptAggregateArgs>): Prisma.PrismaPromise<GetSystemPromptAggregateType<T>>

    /**
     * Group by SystemPrompt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemPromptGroupByArgs} args - Group by arguments.
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
      T extends SystemPromptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemPromptGroupByArgs['orderBy'] }
        : { orderBy?: SystemPromptGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SystemPromptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemPromptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemPrompt model
   */
  readonly fields: SystemPromptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemPrompt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemPromptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rewrittenArticles<T extends SystemPrompt$rewrittenArticlesArgs<ExtArgs> = {}>(args?: Subset<T, SystemPrompt$rewrittenArticlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the SystemPrompt model
   */
  interface SystemPromptFieldRefs {
    readonly id: FieldRef<"SystemPrompt", 'String'>
    readonly name: FieldRef<"SystemPrompt", 'String'>
    readonly content: FieldRef<"SystemPrompt", 'String'>
    readonly description: FieldRef<"SystemPrompt", 'String'>
    readonly isDefault: FieldRef<"SystemPrompt", 'Boolean'>
    readonly createdAt: FieldRef<"SystemPrompt", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemPrompt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemPrompt findUnique
   */
  export type SystemPromptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt findUniqueOrThrow
   */
  export type SystemPromptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt findFirst
   */
  export type SystemPromptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt findFirstOrThrow
   */
  export type SystemPromptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter, which SystemPrompt to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt findMany
   */
  export type SystemPromptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter, which SystemPrompts to fetch.
     */
    where?: SystemPromptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemPrompts to fetch.
     */
    orderBy?: SystemPromptOrderByWithRelationInput | SystemPromptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemPrompts.
     */
    cursor?: SystemPromptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemPrompts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemPrompts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemPrompts.
     */
    distinct?: SystemPromptScalarFieldEnum | SystemPromptScalarFieldEnum[]
  }

  /**
   * SystemPrompt create
   */
  export type SystemPromptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * The data needed to create a SystemPrompt.
     */
    data: XOR<SystemPromptCreateInput, SystemPromptUncheckedCreateInput>
  }

  /**
   * SystemPrompt createMany
   */
  export type SystemPromptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemPrompts.
     */
    data: SystemPromptCreateManyInput | SystemPromptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemPrompt createManyAndReturn
   */
  export type SystemPromptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data used to create many SystemPrompts.
     */
    data: SystemPromptCreateManyInput | SystemPromptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemPrompt update
   */
  export type SystemPromptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * The data needed to update a SystemPrompt.
     */
    data: XOR<SystemPromptUpdateInput, SystemPromptUncheckedUpdateInput>
    /**
     * Choose, which SystemPrompt to update.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt updateMany
   */
  export type SystemPromptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemPrompts.
     */
    data: XOR<SystemPromptUpdateManyMutationInput, SystemPromptUncheckedUpdateManyInput>
    /**
     * Filter which SystemPrompts to update
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to update.
     */
    limit?: number
  }

  /**
   * SystemPrompt updateManyAndReturn
   */
  export type SystemPromptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * The data used to update SystemPrompts.
     */
    data: XOR<SystemPromptUpdateManyMutationInput, SystemPromptUncheckedUpdateManyInput>
    /**
     * Filter which SystemPrompts to update
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to update.
     */
    limit?: number
  }

  /**
   * SystemPrompt upsert
   */
  export type SystemPromptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * The filter to search for the SystemPrompt to update in case it exists.
     */
    where: SystemPromptWhereUniqueInput
    /**
     * In case the SystemPrompt found by the `where` argument doesn't exist, create a new SystemPrompt with this data.
     */
    create: XOR<SystemPromptCreateInput, SystemPromptUncheckedCreateInput>
    /**
     * In case the SystemPrompt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemPromptUpdateInput, SystemPromptUncheckedUpdateInput>
  }

  /**
   * SystemPrompt delete
   */
  export type SystemPromptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
    /**
     * Filter which SystemPrompt to delete.
     */
    where: SystemPromptWhereUniqueInput
  }

  /**
   * SystemPrompt deleteMany
   */
  export type SystemPromptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemPrompts to delete
     */
    where?: SystemPromptWhereInput
    /**
     * Limit how many SystemPrompts to delete.
     */
    limit?: number
  }

  /**
   * SystemPrompt.rewrittenArticles
   */
  export type SystemPrompt$rewrittenArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    where?: RewrittenArticleWhereInput
    orderBy?: RewrittenArticleOrderByWithRelationInput | RewrittenArticleOrderByWithRelationInput[]
    cursor?: RewrittenArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RewrittenArticleScalarFieldEnum | RewrittenArticleScalarFieldEnum[]
  }

  /**
   * SystemPrompt without action
   */
  export type SystemPromptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemPrompt
     */
    select?: SystemPromptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SystemPrompt
     */
    omit?: SystemPromptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SystemPromptInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    author: string | null
    publishedAt: Date | null
    fetchedAt: Date | null
    status: $Enums.ArticleStatus | null
    errorMessage: string | null
    sourceId: string | null
    createdAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    url: string | null
    author: string | null
    publishedAt: Date | null
    fetchedAt: Date | null
    status: $Enums.ArticleStatus | null
    errorMessage: string | null
    sourceId: string | null
    createdAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    url: number
    author: number
    publishedAt: number
    fetchedAt: number
    status: number
    errorMessage: number
    sourceId: number
    createdAt: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    author?: true
    publishedAt?: true
    fetchedAt?: true
    status?: true
    errorMessage?: true
    sourceId?: true
    createdAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    author?: true
    publishedAt?: true
    fetchedAt?: true
    status?: true
    errorMessage?: true
    sourceId?: true
    createdAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    url?: true
    author?: true
    publishedAt?: true
    fetchedAt?: true
    status?: true
    errorMessage?: true
    sourceId?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    title: string
    content: string
    url: string
    author: string | null
    publishedAt: Date | null
    fetchedAt: Date
    status: $Enums.ArticleStatus
    errorMessage: string | null
    sourceId: string
    createdAt: Date
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    author?: boolean
    publishedAt?: boolean
    fetchedAt?: boolean
    status?: boolean
    errorMessage?: boolean
    sourceId?: boolean
    createdAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
    rewrittenArticle?: boolean | Article$rewrittenArticleArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    author?: boolean
    publishedAt?: boolean
    fetchedAt?: boolean
    status?: boolean
    errorMessage?: boolean
    sourceId?: boolean
    createdAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    author?: boolean
    publishedAt?: boolean
    fetchedAt?: boolean
    status?: boolean
    errorMessage?: boolean
    sourceId?: boolean
    createdAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    url?: boolean
    author?: boolean
    publishedAt?: boolean
    fetchedAt?: boolean
    status?: boolean
    errorMessage?: boolean
    sourceId?: boolean
    createdAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "url" | "author" | "publishedAt" | "fetchedAt" | "status" | "errorMessage" | "sourceId" | "createdAt", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
    rewrittenArticle?: boolean | Article$rewrittenArticleArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      source: Prisma.$SourcePayload<ExtArgs>
      rewrittenArticle: Prisma.$RewrittenArticlePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      url: string
      author: string | null
      publishedAt: Date | null
      fetchedAt: Date
      status: $Enums.ArticleStatus
      errorMessage: string | null
      sourceId: string
      createdAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
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
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
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
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends SourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SourceDefaultArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    rewrittenArticle<T extends Article$rewrittenArticleArgs<ExtArgs> = {}>(args?: Subset<T, Article$rewrittenArticleArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly title: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly url: FieldRef<"Article", 'String'>
    readonly author: FieldRef<"Article", 'String'>
    readonly publishedAt: FieldRef<"Article", 'DateTime'>
    readonly fetchedAt: FieldRef<"Article", 'DateTime'>
    readonly status: FieldRef<"Article", 'ArticleStatus'>
    readonly errorMessage: FieldRef<"Article", 'String'>
    readonly sourceId: FieldRef<"Article", 'String'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article.rewrittenArticle
   */
  export type Article$rewrittenArticleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    where?: RewrittenArticleWhereInput
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model ExploredUrl
   */

  export type AggregateExploredUrl = {
    _count: ExploredUrlCountAggregateOutputType | null
    _avg: ExploredUrlAvgAggregateOutputType | null
    _sum: ExploredUrlSumAggregateOutputType | null
    _min: ExploredUrlMinAggregateOutputType | null
    _max: ExploredUrlMaxAggregateOutputType | null
  }

  export type ExploredUrlAvgAggregateOutputType = {
    depth: number | null
  }

  export type ExploredUrlSumAggregateOutputType = {
    depth: number | null
  }

  export type ExploredUrlMinAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    depth: number | null
    status: $Enums.ExploredUrlStatus | null
    errorMessage: string | null
    parentUrl: string | null
    sourceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExploredUrlMaxAggregateOutputType = {
    id: string | null
    url: string | null
    title: string | null
    depth: number | null
    status: $Enums.ExploredUrlStatus | null
    errorMessage: string | null
    parentUrl: string | null
    sourceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExploredUrlCountAggregateOutputType = {
    id: number
    url: number
    title: number
    depth: number
    status: number
    errorMessage: number
    parentUrl: number
    sourceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExploredUrlAvgAggregateInputType = {
    depth?: true
  }

  export type ExploredUrlSumAggregateInputType = {
    depth?: true
  }

  export type ExploredUrlMinAggregateInputType = {
    id?: true
    url?: true
    title?: true
    depth?: true
    status?: true
    errorMessage?: true
    parentUrl?: true
    sourceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExploredUrlMaxAggregateInputType = {
    id?: true
    url?: true
    title?: true
    depth?: true
    status?: true
    errorMessage?: true
    parentUrl?: true
    sourceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExploredUrlCountAggregateInputType = {
    id?: true
    url?: true
    title?: true
    depth?: true
    status?: true
    errorMessage?: true
    parentUrl?: true
    sourceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExploredUrlAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExploredUrl to aggregate.
     */
    where?: ExploredUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExploredUrls to fetch.
     */
    orderBy?: ExploredUrlOrderByWithRelationInput | ExploredUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExploredUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExploredUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExploredUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExploredUrls
    **/
    _count?: true | ExploredUrlCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExploredUrlAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExploredUrlSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExploredUrlMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExploredUrlMaxAggregateInputType
  }

  export type GetExploredUrlAggregateType<T extends ExploredUrlAggregateArgs> = {
        [P in keyof T & keyof AggregateExploredUrl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExploredUrl[P]>
      : GetScalarType<T[P], AggregateExploredUrl[P]>
  }




  export type ExploredUrlGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExploredUrlWhereInput
    orderBy?: ExploredUrlOrderByWithAggregationInput | ExploredUrlOrderByWithAggregationInput[]
    by: ExploredUrlScalarFieldEnum[] | ExploredUrlScalarFieldEnum
    having?: ExploredUrlScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExploredUrlCountAggregateInputType | true
    _avg?: ExploredUrlAvgAggregateInputType
    _sum?: ExploredUrlSumAggregateInputType
    _min?: ExploredUrlMinAggregateInputType
    _max?: ExploredUrlMaxAggregateInputType
  }

  export type ExploredUrlGroupByOutputType = {
    id: string
    url: string
    title: string | null
    depth: number
    status: $Enums.ExploredUrlStatus
    errorMessage: string | null
    parentUrl: string | null
    sourceId: string
    createdAt: Date
    updatedAt: Date
    _count: ExploredUrlCountAggregateOutputType | null
    _avg: ExploredUrlAvgAggregateOutputType | null
    _sum: ExploredUrlSumAggregateOutputType | null
    _min: ExploredUrlMinAggregateOutputType | null
    _max: ExploredUrlMaxAggregateOutputType | null
  }

  type GetExploredUrlGroupByPayload<T extends ExploredUrlGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExploredUrlGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExploredUrlGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExploredUrlGroupByOutputType[P]>
            : GetScalarType<T[P], ExploredUrlGroupByOutputType[P]>
        }
      >
    >


  export type ExploredUrlSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    depth?: boolean
    status?: boolean
    errorMessage?: boolean
    parentUrl?: boolean
    sourceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exploredUrl"]>

  export type ExploredUrlSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    depth?: boolean
    status?: boolean
    errorMessage?: boolean
    parentUrl?: boolean
    sourceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exploredUrl"]>

  export type ExploredUrlSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    title?: boolean
    depth?: boolean
    status?: boolean
    errorMessage?: boolean
    parentUrl?: boolean
    sourceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exploredUrl"]>

  export type ExploredUrlSelectScalar = {
    id?: boolean
    url?: boolean
    title?: boolean
    depth?: boolean
    status?: boolean
    errorMessage?: boolean
    parentUrl?: boolean
    sourceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExploredUrlOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "title" | "depth" | "status" | "errorMessage" | "parentUrl" | "sourceId" | "createdAt" | "updatedAt", ExtArgs["result"]["exploredUrl"]>
  export type ExploredUrlInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }
  export type ExploredUrlIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }
  export type ExploredUrlIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | SourceDefaultArgs<ExtArgs>
  }

  export type $ExploredUrlPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExploredUrl"
    objects: {
      source: Prisma.$SourcePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      title: string | null
      depth: number
      status: $Enums.ExploredUrlStatus
      errorMessage: string | null
      parentUrl: string | null
      sourceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exploredUrl"]>
    composites: {}
  }

  type ExploredUrlGetPayload<S extends boolean | null | undefined | ExploredUrlDefaultArgs> = $Result.GetResult<Prisma.$ExploredUrlPayload, S>

  type ExploredUrlCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExploredUrlFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExploredUrlCountAggregateInputType | true
    }

  export interface ExploredUrlDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExploredUrl'], meta: { name: 'ExploredUrl' } }
    /**
     * Find zero or one ExploredUrl that matches the filter.
     * @param {ExploredUrlFindUniqueArgs} args - Arguments to find a ExploredUrl
     * @example
     * // Get one ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExploredUrlFindUniqueArgs>(args: SelectSubset<T, ExploredUrlFindUniqueArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExploredUrl that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExploredUrlFindUniqueOrThrowArgs} args - Arguments to find a ExploredUrl
     * @example
     * // Get one ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExploredUrlFindUniqueOrThrowArgs>(args: SelectSubset<T, ExploredUrlFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExploredUrl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlFindFirstArgs} args - Arguments to find a ExploredUrl
     * @example
     * // Get one ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExploredUrlFindFirstArgs>(args?: SelectSubset<T, ExploredUrlFindFirstArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExploredUrl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlFindFirstOrThrowArgs} args - Arguments to find a ExploredUrl
     * @example
     * // Get one ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExploredUrlFindFirstOrThrowArgs>(args?: SelectSubset<T, ExploredUrlFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExploredUrls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExploredUrls
     * const exploredUrls = await prisma.exploredUrl.findMany()
     * 
     * // Get first 10 ExploredUrls
     * const exploredUrls = await prisma.exploredUrl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exploredUrlWithIdOnly = await prisma.exploredUrl.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExploredUrlFindManyArgs>(args?: SelectSubset<T, ExploredUrlFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExploredUrl.
     * @param {ExploredUrlCreateArgs} args - Arguments to create a ExploredUrl.
     * @example
     * // Create one ExploredUrl
     * const ExploredUrl = await prisma.exploredUrl.create({
     *   data: {
     *     // ... data to create a ExploredUrl
     *   }
     * })
     * 
     */
    create<T extends ExploredUrlCreateArgs>(args: SelectSubset<T, ExploredUrlCreateArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExploredUrls.
     * @param {ExploredUrlCreateManyArgs} args - Arguments to create many ExploredUrls.
     * @example
     * // Create many ExploredUrls
     * const exploredUrl = await prisma.exploredUrl.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExploredUrlCreateManyArgs>(args?: SelectSubset<T, ExploredUrlCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExploredUrls and returns the data saved in the database.
     * @param {ExploredUrlCreateManyAndReturnArgs} args - Arguments to create many ExploredUrls.
     * @example
     * // Create many ExploredUrls
     * const exploredUrl = await prisma.exploredUrl.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExploredUrls and only return the `id`
     * const exploredUrlWithIdOnly = await prisma.exploredUrl.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExploredUrlCreateManyAndReturnArgs>(args?: SelectSubset<T, ExploredUrlCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExploredUrl.
     * @param {ExploredUrlDeleteArgs} args - Arguments to delete one ExploredUrl.
     * @example
     * // Delete one ExploredUrl
     * const ExploredUrl = await prisma.exploredUrl.delete({
     *   where: {
     *     // ... filter to delete one ExploredUrl
     *   }
     * })
     * 
     */
    delete<T extends ExploredUrlDeleteArgs>(args: SelectSubset<T, ExploredUrlDeleteArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExploredUrl.
     * @param {ExploredUrlUpdateArgs} args - Arguments to update one ExploredUrl.
     * @example
     * // Update one ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExploredUrlUpdateArgs>(args: SelectSubset<T, ExploredUrlUpdateArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExploredUrls.
     * @param {ExploredUrlDeleteManyArgs} args - Arguments to filter ExploredUrls to delete.
     * @example
     * // Delete a few ExploredUrls
     * const { count } = await prisma.exploredUrl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExploredUrlDeleteManyArgs>(args?: SelectSubset<T, ExploredUrlDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExploredUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExploredUrls
     * const exploredUrl = await prisma.exploredUrl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExploredUrlUpdateManyArgs>(args: SelectSubset<T, ExploredUrlUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExploredUrls and returns the data updated in the database.
     * @param {ExploredUrlUpdateManyAndReturnArgs} args - Arguments to update many ExploredUrls.
     * @example
     * // Update many ExploredUrls
     * const exploredUrl = await prisma.exploredUrl.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExploredUrls and only return the `id`
     * const exploredUrlWithIdOnly = await prisma.exploredUrl.updateManyAndReturn({
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
    updateManyAndReturn<T extends ExploredUrlUpdateManyAndReturnArgs>(args: SelectSubset<T, ExploredUrlUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExploredUrl.
     * @param {ExploredUrlUpsertArgs} args - Arguments to update or create a ExploredUrl.
     * @example
     * // Update or create a ExploredUrl
     * const exploredUrl = await prisma.exploredUrl.upsert({
     *   create: {
     *     // ... data to create a ExploredUrl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExploredUrl we want to update
     *   }
     * })
     */
    upsert<T extends ExploredUrlUpsertArgs>(args: SelectSubset<T, ExploredUrlUpsertArgs<ExtArgs>>): Prisma__ExploredUrlClient<$Result.GetResult<Prisma.$ExploredUrlPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExploredUrls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlCountArgs} args - Arguments to filter ExploredUrls to count.
     * @example
     * // Count the number of ExploredUrls
     * const count = await prisma.exploredUrl.count({
     *   where: {
     *     // ... the filter for the ExploredUrls we want to count
     *   }
     * })
    **/
    count<T extends ExploredUrlCountArgs>(
      args?: Subset<T, ExploredUrlCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExploredUrlCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExploredUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExploredUrlAggregateArgs>(args: Subset<T, ExploredUrlAggregateArgs>): Prisma.PrismaPromise<GetExploredUrlAggregateType<T>>

    /**
     * Group by ExploredUrl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExploredUrlGroupByArgs} args - Group by arguments.
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
      T extends ExploredUrlGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExploredUrlGroupByArgs['orderBy'] }
        : { orderBy?: ExploredUrlGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExploredUrlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExploredUrlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExploredUrl model
   */
  readonly fields: ExploredUrlFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExploredUrl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExploredUrlClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends SourceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SourceDefaultArgs<ExtArgs>>): Prisma__SourceClient<$Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ExploredUrl model
   */
  interface ExploredUrlFieldRefs {
    readonly id: FieldRef<"ExploredUrl", 'String'>
    readonly url: FieldRef<"ExploredUrl", 'String'>
    readonly title: FieldRef<"ExploredUrl", 'String'>
    readonly depth: FieldRef<"ExploredUrl", 'Int'>
    readonly status: FieldRef<"ExploredUrl", 'ExploredUrlStatus'>
    readonly errorMessage: FieldRef<"ExploredUrl", 'String'>
    readonly parentUrl: FieldRef<"ExploredUrl", 'String'>
    readonly sourceId: FieldRef<"ExploredUrl", 'String'>
    readonly createdAt: FieldRef<"ExploredUrl", 'DateTime'>
    readonly updatedAt: FieldRef<"ExploredUrl", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExploredUrl findUnique
   */
  export type ExploredUrlFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter, which ExploredUrl to fetch.
     */
    where: ExploredUrlWhereUniqueInput
  }

  /**
   * ExploredUrl findUniqueOrThrow
   */
  export type ExploredUrlFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter, which ExploredUrl to fetch.
     */
    where: ExploredUrlWhereUniqueInput
  }

  /**
   * ExploredUrl findFirst
   */
  export type ExploredUrlFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter, which ExploredUrl to fetch.
     */
    where?: ExploredUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExploredUrls to fetch.
     */
    orderBy?: ExploredUrlOrderByWithRelationInput | ExploredUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExploredUrls.
     */
    cursor?: ExploredUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExploredUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExploredUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExploredUrls.
     */
    distinct?: ExploredUrlScalarFieldEnum | ExploredUrlScalarFieldEnum[]
  }

  /**
   * ExploredUrl findFirstOrThrow
   */
  export type ExploredUrlFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter, which ExploredUrl to fetch.
     */
    where?: ExploredUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExploredUrls to fetch.
     */
    orderBy?: ExploredUrlOrderByWithRelationInput | ExploredUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExploredUrls.
     */
    cursor?: ExploredUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExploredUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExploredUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExploredUrls.
     */
    distinct?: ExploredUrlScalarFieldEnum | ExploredUrlScalarFieldEnum[]
  }

  /**
   * ExploredUrl findMany
   */
  export type ExploredUrlFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter, which ExploredUrls to fetch.
     */
    where?: ExploredUrlWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExploredUrls to fetch.
     */
    orderBy?: ExploredUrlOrderByWithRelationInput | ExploredUrlOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExploredUrls.
     */
    cursor?: ExploredUrlWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExploredUrls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExploredUrls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExploredUrls.
     */
    distinct?: ExploredUrlScalarFieldEnum | ExploredUrlScalarFieldEnum[]
  }

  /**
   * ExploredUrl create
   */
  export type ExploredUrlCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * The data needed to create a ExploredUrl.
     */
    data: XOR<ExploredUrlCreateInput, ExploredUrlUncheckedCreateInput>
  }

  /**
   * ExploredUrl createMany
   */
  export type ExploredUrlCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExploredUrls.
     */
    data: ExploredUrlCreateManyInput | ExploredUrlCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExploredUrl createManyAndReturn
   */
  export type ExploredUrlCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * The data used to create many ExploredUrls.
     */
    data: ExploredUrlCreateManyInput | ExploredUrlCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExploredUrl update
   */
  export type ExploredUrlUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * The data needed to update a ExploredUrl.
     */
    data: XOR<ExploredUrlUpdateInput, ExploredUrlUncheckedUpdateInput>
    /**
     * Choose, which ExploredUrl to update.
     */
    where: ExploredUrlWhereUniqueInput
  }

  /**
   * ExploredUrl updateMany
   */
  export type ExploredUrlUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExploredUrls.
     */
    data: XOR<ExploredUrlUpdateManyMutationInput, ExploredUrlUncheckedUpdateManyInput>
    /**
     * Filter which ExploredUrls to update
     */
    where?: ExploredUrlWhereInput
    /**
     * Limit how many ExploredUrls to update.
     */
    limit?: number
  }

  /**
   * ExploredUrl updateManyAndReturn
   */
  export type ExploredUrlUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * The data used to update ExploredUrls.
     */
    data: XOR<ExploredUrlUpdateManyMutationInput, ExploredUrlUncheckedUpdateManyInput>
    /**
     * Filter which ExploredUrls to update
     */
    where?: ExploredUrlWhereInput
    /**
     * Limit how many ExploredUrls to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExploredUrl upsert
   */
  export type ExploredUrlUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * The filter to search for the ExploredUrl to update in case it exists.
     */
    where: ExploredUrlWhereUniqueInput
    /**
     * In case the ExploredUrl found by the `where` argument doesn't exist, create a new ExploredUrl with this data.
     */
    create: XOR<ExploredUrlCreateInput, ExploredUrlUncheckedCreateInput>
    /**
     * In case the ExploredUrl was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExploredUrlUpdateInput, ExploredUrlUncheckedUpdateInput>
  }

  /**
   * ExploredUrl delete
   */
  export type ExploredUrlDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
    /**
     * Filter which ExploredUrl to delete.
     */
    where: ExploredUrlWhereUniqueInput
  }

  /**
   * ExploredUrl deleteMany
   */
  export type ExploredUrlDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExploredUrls to delete
     */
    where?: ExploredUrlWhereInput
    /**
     * Limit how many ExploredUrls to delete.
     */
    limit?: number
  }

  /**
   * ExploredUrl without action
   */
  export type ExploredUrlDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExploredUrl
     */
    select?: ExploredUrlSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExploredUrl
     */
    omit?: ExploredUrlOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExploredUrlInclude<ExtArgs> | null
  }


  /**
   * Model RewrittenArticle
   */

  export type AggregateRewrittenArticle = {
    _count: RewrittenArticleCountAggregateOutputType | null
    _avg: RewrittenArticleAvgAggregateOutputType | null
    _sum: RewrittenArticleSumAggregateOutputType | null
    _min: RewrittenArticleMinAggregateOutputType | null
    _max: RewrittenArticleMaxAggregateOutputType | null
  }

  export type RewrittenArticleAvgAggregateOutputType = {
    tokensUsed: number | null
    processingTime: number | null
  }

  export type RewrittenArticleSumAggregateOutputType = {
    tokensUsed: number | null
    processingTime: number | null
  }

  export type RewrittenArticleMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    llmModel: string | null
    tokensUsed: number | null
    processingTime: number | null
    createdAt: Date | null
    originalArticleId: string | null
    systemPromptId: string | null
  }

  export type RewrittenArticleMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    llmModel: string | null
    tokensUsed: number | null
    processingTime: number | null
    createdAt: Date | null
    originalArticleId: string | null
    systemPromptId: string | null
  }

  export type RewrittenArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    llmModel: number
    tokensUsed: number
    processingTime: number
    createdAt: number
    originalArticleId: number
    systemPromptId: number
    _all: number
  }


  export type RewrittenArticleAvgAggregateInputType = {
    tokensUsed?: true
    processingTime?: true
  }

  export type RewrittenArticleSumAggregateInputType = {
    tokensUsed?: true
    processingTime?: true
  }

  export type RewrittenArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    llmModel?: true
    tokensUsed?: true
    processingTime?: true
    createdAt?: true
    originalArticleId?: true
    systemPromptId?: true
  }

  export type RewrittenArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    llmModel?: true
    tokensUsed?: true
    processingTime?: true
    createdAt?: true
    originalArticleId?: true
    systemPromptId?: true
  }

  export type RewrittenArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    llmModel?: true
    tokensUsed?: true
    processingTime?: true
    createdAt?: true
    originalArticleId?: true
    systemPromptId?: true
    _all?: true
  }

  export type RewrittenArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewrittenArticle to aggregate.
     */
    where?: RewrittenArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrittenArticles to fetch.
     */
    orderBy?: RewrittenArticleOrderByWithRelationInput | RewrittenArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RewrittenArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrittenArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrittenArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RewrittenArticles
    **/
    _count?: true | RewrittenArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RewrittenArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RewrittenArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RewrittenArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RewrittenArticleMaxAggregateInputType
  }

  export type GetRewrittenArticleAggregateType<T extends RewrittenArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateRewrittenArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRewrittenArticle[P]>
      : GetScalarType<T[P], AggregateRewrittenArticle[P]>
  }




  export type RewrittenArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RewrittenArticleWhereInput
    orderBy?: RewrittenArticleOrderByWithAggregationInput | RewrittenArticleOrderByWithAggregationInput[]
    by: RewrittenArticleScalarFieldEnum[] | RewrittenArticleScalarFieldEnum
    having?: RewrittenArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RewrittenArticleCountAggregateInputType | true
    _avg?: RewrittenArticleAvgAggregateInputType
    _sum?: RewrittenArticleSumAggregateInputType
    _min?: RewrittenArticleMinAggregateInputType
    _max?: RewrittenArticleMaxAggregateInputType
  }

  export type RewrittenArticleGroupByOutputType = {
    id: string
    title: string
    content: string
    llmModel: string
    tokensUsed: number | null
    processingTime: number | null
    createdAt: Date
    originalArticleId: string
    systemPromptId: string
    _count: RewrittenArticleCountAggregateOutputType | null
    _avg: RewrittenArticleAvgAggregateOutputType | null
    _sum: RewrittenArticleSumAggregateOutputType | null
    _min: RewrittenArticleMinAggregateOutputType | null
    _max: RewrittenArticleMaxAggregateOutputType | null
  }

  type GetRewrittenArticleGroupByPayload<T extends RewrittenArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RewrittenArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RewrittenArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RewrittenArticleGroupByOutputType[P]>
            : GetScalarType<T[P], RewrittenArticleGroupByOutputType[P]>
        }
      >
    >


  export type RewrittenArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    llmModel?: boolean
    tokensUsed?: boolean
    processingTime?: boolean
    createdAt?: boolean
    originalArticleId?: boolean
    systemPromptId?: boolean
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewrittenArticle"]>

  export type RewrittenArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    llmModel?: boolean
    tokensUsed?: boolean
    processingTime?: boolean
    createdAt?: boolean
    originalArticleId?: boolean
    systemPromptId?: boolean
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewrittenArticle"]>

  export type RewrittenArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    llmModel?: boolean
    tokensUsed?: boolean
    processingTime?: boolean
    createdAt?: boolean
    originalArticleId?: boolean
    systemPromptId?: boolean
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rewrittenArticle"]>

  export type RewrittenArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    llmModel?: boolean
    tokensUsed?: boolean
    processingTime?: boolean
    createdAt?: boolean
    originalArticleId?: boolean
    systemPromptId?: boolean
  }

  export type RewrittenArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "llmModel" | "tokensUsed" | "processingTime" | "createdAt" | "originalArticleId" | "systemPromptId", ExtArgs["result"]["rewrittenArticle"]>
  export type RewrittenArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }
  export type RewrittenArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }
  export type RewrittenArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalArticle?: boolean | ArticleDefaultArgs<ExtArgs>
    systemPrompt?: boolean | SystemPromptDefaultArgs<ExtArgs>
  }

  export type $RewrittenArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RewrittenArticle"
    objects: {
      originalArticle: Prisma.$ArticlePayload<ExtArgs>
      systemPrompt: Prisma.$SystemPromptPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      llmModel: string
      tokensUsed: number | null
      processingTime: number | null
      createdAt: Date
      originalArticleId: string
      systemPromptId: string
    }, ExtArgs["result"]["rewrittenArticle"]>
    composites: {}
  }

  type RewrittenArticleGetPayload<S extends boolean | null | undefined | RewrittenArticleDefaultArgs> = $Result.GetResult<Prisma.$RewrittenArticlePayload, S>

  type RewrittenArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RewrittenArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RewrittenArticleCountAggregateInputType | true
    }

  export interface RewrittenArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RewrittenArticle'], meta: { name: 'RewrittenArticle' } }
    /**
     * Find zero or one RewrittenArticle that matches the filter.
     * @param {RewrittenArticleFindUniqueArgs} args - Arguments to find a RewrittenArticle
     * @example
     * // Get one RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RewrittenArticleFindUniqueArgs>(args: SelectSubset<T, RewrittenArticleFindUniqueArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RewrittenArticle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RewrittenArticleFindUniqueOrThrowArgs} args - Arguments to find a RewrittenArticle
     * @example
     * // Get one RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RewrittenArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, RewrittenArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewrittenArticle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleFindFirstArgs} args - Arguments to find a RewrittenArticle
     * @example
     * // Get one RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RewrittenArticleFindFirstArgs>(args?: SelectSubset<T, RewrittenArticleFindFirstArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RewrittenArticle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleFindFirstOrThrowArgs} args - Arguments to find a RewrittenArticle
     * @example
     * // Get one RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RewrittenArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, RewrittenArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RewrittenArticles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RewrittenArticles
     * const rewrittenArticles = await prisma.rewrittenArticle.findMany()
     * 
     * // Get first 10 RewrittenArticles
     * const rewrittenArticles = await prisma.rewrittenArticle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rewrittenArticleWithIdOnly = await prisma.rewrittenArticle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RewrittenArticleFindManyArgs>(args?: SelectSubset<T, RewrittenArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RewrittenArticle.
     * @param {RewrittenArticleCreateArgs} args - Arguments to create a RewrittenArticle.
     * @example
     * // Create one RewrittenArticle
     * const RewrittenArticle = await prisma.rewrittenArticle.create({
     *   data: {
     *     // ... data to create a RewrittenArticle
     *   }
     * })
     * 
     */
    create<T extends RewrittenArticleCreateArgs>(args: SelectSubset<T, RewrittenArticleCreateArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RewrittenArticles.
     * @param {RewrittenArticleCreateManyArgs} args - Arguments to create many RewrittenArticles.
     * @example
     * // Create many RewrittenArticles
     * const rewrittenArticle = await prisma.rewrittenArticle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RewrittenArticleCreateManyArgs>(args?: SelectSubset<T, RewrittenArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RewrittenArticles and returns the data saved in the database.
     * @param {RewrittenArticleCreateManyAndReturnArgs} args - Arguments to create many RewrittenArticles.
     * @example
     * // Create many RewrittenArticles
     * const rewrittenArticle = await prisma.rewrittenArticle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RewrittenArticles and only return the `id`
     * const rewrittenArticleWithIdOnly = await prisma.rewrittenArticle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RewrittenArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, RewrittenArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RewrittenArticle.
     * @param {RewrittenArticleDeleteArgs} args - Arguments to delete one RewrittenArticle.
     * @example
     * // Delete one RewrittenArticle
     * const RewrittenArticle = await prisma.rewrittenArticle.delete({
     *   where: {
     *     // ... filter to delete one RewrittenArticle
     *   }
     * })
     * 
     */
    delete<T extends RewrittenArticleDeleteArgs>(args: SelectSubset<T, RewrittenArticleDeleteArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RewrittenArticle.
     * @param {RewrittenArticleUpdateArgs} args - Arguments to update one RewrittenArticle.
     * @example
     * // Update one RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RewrittenArticleUpdateArgs>(args: SelectSubset<T, RewrittenArticleUpdateArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RewrittenArticles.
     * @param {RewrittenArticleDeleteManyArgs} args - Arguments to filter RewrittenArticles to delete.
     * @example
     * // Delete a few RewrittenArticles
     * const { count } = await prisma.rewrittenArticle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RewrittenArticleDeleteManyArgs>(args?: SelectSubset<T, RewrittenArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewrittenArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RewrittenArticles
     * const rewrittenArticle = await prisma.rewrittenArticle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RewrittenArticleUpdateManyArgs>(args: SelectSubset<T, RewrittenArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RewrittenArticles and returns the data updated in the database.
     * @param {RewrittenArticleUpdateManyAndReturnArgs} args - Arguments to update many RewrittenArticles.
     * @example
     * // Update many RewrittenArticles
     * const rewrittenArticle = await prisma.rewrittenArticle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RewrittenArticles and only return the `id`
     * const rewrittenArticleWithIdOnly = await prisma.rewrittenArticle.updateManyAndReturn({
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
    updateManyAndReturn<T extends RewrittenArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, RewrittenArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RewrittenArticle.
     * @param {RewrittenArticleUpsertArgs} args - Arguments to update or create a RewrittenArticle.
     * @example
     * // Update or create a RewrittenArticle
     * const rewrittenArticle = await prisma.rewrittenArticle.upsert({
     *   create: {
     *     // ... data to create a RewrittenArticle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RewrittenArticle we want to update
     *   }
     * })
     */
    upsert<T extends RewrittenArticleUpsertArgs>(args: SelectSubset<T, RewrittenArticleUpsertArgs<ExtArgs>>): Prisma__RewrittenArticleClient<$Result.GetResult<Prisma.$RewrittenArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RewrittenArticles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleCountArgs} args - Arguments to filter RewrittenArticles to count.
     * @example
     * // Count the number of RewrittenArticles
     * const count = await prisma.rewrittenArticle.count({
     *   where: {
     *     // ... the filter for the RewrittenArticles we want to count
     *   }
     * })
    **/
    count<T extends RewrittenArticleCountArgs>(
      args?: Subset<T, RewrittenArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RewrittenArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RewrittenArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RewrittenArticleAggregateArgs>(args: Subset<T, RewrittenArticleAggregateArgs>): Prisma.PrismaPromise<GetRewrittenArticleAggregateType<T>>

    /**
     * Group by RewrittenArticle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RewrittenArticleGroupByArgs} args - Group by arguments.
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
      T extends RewrittenArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RewrittenArticleGroupByArgs['orderBy'] }
        : { orderBy?: RewrittenArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RewrittenArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRewrittenArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RewrittenArticle model
   */
  readonly fields: RewrittenArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RewrittenArticle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RewrittenArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    originalArticle<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    systemPrompt<T extends SystemPromptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SystemPromptDefaultArgs<ExtArgs>>): Prisma__SystemPromptClient<$Result.GetResult<Prisma.$SystemPromptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RewrittenArticle model
   */
  interface RewrittenArticleFieldRefs {
    readonly id: FieldRef<"RewrittenArticle", 'String'>
    readonly title: FieldRef<"RewrittenArticle", 'String'>
    readonly content: FieldRef<"RewrittenArticle", 'String'>
    readonly llmModel: FieldRef<"RewrittenArticle", 'String'>
    readonly tokensUsed: FieldRef<"RewrittenArticle", 'Int'>
    readonly processingTime: FieldRef<"RewrittenArticle", 'Int'>
    readonly createdAt: FieldRef<"RewrittenArticle", 'DateTime'>
    readonly originalArticleId: FieldRef<"RewrittenArticle", 'String'>
    readonly systemPromptId: FieldRef<"RewrittenArticle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RewrittenArticle findUnique
   */
  export type RewrittenArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter, which RewrittenArticle to fetch.
     */
    where: RewrittenArticleWhereUniqueInput
  }

  /**
   * RewrittenArticle findUniqueOrThrow
   */
  export type RewrittenArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter, which RewrittenArticle to fetch.
     */
    where: RewrittenArticleWhereUniqueInput
  }

  /**
   * RewrittenArticle findFirst
   */
  export type RewrittenArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter, which RewrittenArticle to fetch.
     */
    where?: RewrittenArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrittenArticles to fetch.
     */
    orderBy?: RewrittenArticleOrderByWithRelationInput | RewrittenArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewrittenArticles.
     */
    cursor?: RewrittenArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrittenArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrittenArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewrittenArticles.
     */
    distinct?: RewrittenArticleScalarFieldEnum | RewrittenArticleScalarFieldEnum[]
  }

  /**
   * RewrittenArticle findFirstOrThrow
   */
  export type RewrittenArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter, which RewrittenArticle to fetch.
     */
    where?: RewrittenArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrittenArticles to fetch.
     */
    orderBy?: RewrittenArticleOrderByWithRelationInput | RewrittenArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RewrittenArticles.
     */
    cursor?: RewrittenArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrittenArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrittenArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewrittenArticles.
     */
    distinct?: RewrittenArticleScalarFieldEnum | RewrittenArticleScalarFieldEnum[]
  }

  /**
   * RewrittenArticle findMany
   */
  export type RewrittenArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter, which RewrittenArticles to fetch.
     */
    where?: RewrittenArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RewrittenArticles to fetch.
     */
    orderBy?: RewrittenArticleOrderByWithRelationInput | RewrittenArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RewrittenArticles.
     */
    cursor?: RewrittenArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RewrittenArticles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RewrittenArticles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RewrittenArticles.
     */
    distinct?: RewrittenArticleScalarFieldEnum | RewrittenArticleScalarFieldEnum[]
  }

  /**
   * RewrittenArticle create
   */
  export type RewrittenArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a RewrittenArticle.
     */
    data: XOR<RewrittenArticleCreateInput, RewrittenArticleUncheckedCreateInput>
  }

  /**
   * RewrittenArticle createMany
   */
  export type RewrittenArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RewrittenArticles.
     */
    data: RewrittenArticleCreateManyInput | RewrittenArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RewrittenArticle createManyAndReturn
   */
  export type RewrittenArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * The data used to create many RewrittenArticles.
     */
    data: RewrittenArticleCreateManyInput | RewrittenArticleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RewrittenArticle update
   */
  export type RewrittenArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a RewrittenArticle.
     */
    data: XOR<RewrittenArticleUpdateInput, RewrittenArticleUncheckedUpdateInput>
    /**
     * Choose, which RewrittenArticle to update.
     */
    where: RewrittenArticleWhereUniqueInput
  }

  /**
   * RewrittenArticle updateMany
   */
  export type RewrittenArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RewrittenArticles.
     */
    data: XOR<RewrittenArticleUpdateManyMutationInput, RewrittenArticleUncheckedUpdateManyInput>
    /**
     * Filter which RewrittenArticles to update
     */
    where?: RewrittenArticleWhereInput
    /**
     * Limit how many RewrittenArticles to update.
     */
    limit?: number
  }

  /**
   * RewrittenArticle updateManyAndReturn
   */
  export type RewrittenArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * The data used to update RewrittenArticles.
     */
    data: XOR<RewrittenArticleUpdateManyMutationInput, RewrittenArticleUncheckedUpdateManyInput>
    /**
     * Filter which RewrittenArticles to update
     */
    where?: RewrittenArticleWhereInput
    /**
     * Limit how many RewrittenArticles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RewrittenArticle upsert
   */
  export type RewrittenArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the RewrittenArticle to update in case it exists.
     */
    where: RewrittenArticleWhereUniqueInput
    /**
     * In case the RewrittenArticle found by the `where` argument doesn't exist, create a new RewrittenArticle with this data.
     */
    create: XOR<RewrittenArticleCreateInput, RewrittenArticleUncheckedCreateInput>
    /**
     * In case the RewrittenArticle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RewrittenArticleUpdateInput, RewrittenArticleUncheckedUpdateInput>
  }

  /**
   * RewrittenArticle delete
   */
  export type RewrittenArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
    /**
     * Filter which RewrittenArticle to delete.
     */
    where: RewrittenArticleWhereUniqueInput
  }

  /**
   * RewrittenArticle deleteMany
   */
  export type RewrittenArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RewrittenArticles to delete
     */
    where?: RewrittenArticleWhereInput
    /**
     * Limit how many RewrittenArticles to delete.
     */
    limit?: number
  }

  /**
   * RewrittenArticle without action
   */
  export type RewrittenArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RewrittenArticle
     */
    select?: RewrittenArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RewrittenArticle
     */
    omit?: RewrittenArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RewrittenArticleInclude<ExtArgs> | null
  }


  /**
   * Model Setting
   */

  export type AggregateSetting = {
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  export type SettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingMinAggregateInputType = {
    id?: true
    key?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingMaxAggregateInputType = {
    id?: true
    key?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Setting to aggregate.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingMaxAggregateInputType
  }

  export type GetSettingAggregateType<T extends SettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSetting[P]>
      : GetScalarType<T[P], AggregateSetting[P]>
  }




  export type SettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingWhereInput
    orderBy?: SettingOrderByWithAggregationInput | SettingOrderByWithAggregationInput[]
    by: SettingScalarFieldEnum[] | SettingScalarFieldEnum
    having?: SettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingCountAggregateInputType | true
    _min?: SettingMinAggregateInputType
    _max?: SettingMaxAggregateInputType
  }

  export type SettingGroupByOutputType = {
    id: string
    key: string
    value: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: SettingCountAggregateOutputType | null
    _min: SettingMinAggregateOutputType | null
    _max: SettingMaxAggregateOutputType | null
  }

  type GetSettingGroupByPayload<T extends SettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingGroupByOutputType[P]>
            : GetScalarType<T[P], SettingGroupByOutputType[P]>
        }
      >
    >


  export type SettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["setting"]>

  export type SettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "createdAt" | "updatedAt", ExtArgs["result"]["setting"]>

  export type $SettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Setting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["setting"]>
    composites: {}
  }

  type SettingGetPayload<S extends boolean | null | undefined | SettingDefaultArgs> = $Result.GetResult<Prisma.$SettingPayload, S>

  type SettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingCountAggregateInputType | true
    }

  export interface SettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Setting'], meta: { name: 'Setting' } }
    /**
     * Find zero or one Setting that matches the filter.
     * @param {SettingFindUniqueArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingFindUniqueArgs>(args: SelectSubset<T, SettingFindUniqueArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Setting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingFindUniqueOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingFindFirstArgs>(args?: SelectSubset<T, SettingFindFirstArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Setting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindFirstOrThrowArgs} args - Arguments to find a Setting
     * @example
     * // Get one Setting
     * const setting = await prisma.setting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.setting.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.setting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingWithIdOnly = await prisma.setting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingFindManyArgs>(args?: SelectSubset<T, SettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Setting.
     * @param {SettingCreateArgs} args - Arguments to create a Setting.
     * @example
     * // Create one Setting
     * const Setting = await prisma.setting.create({
     *   data: {
     *     // ... data to create a Setting
     *   }
     * })
     * 
     */
    create<T extends SettingCreateArgs>(args: SelectSubset<T, SettingCreateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingCreateManyArgs>(args?: SelectSubset<T, SettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const setting = await prisma.setting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingWithIdOnly = await prisma.setting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Setting.
     * @param {SettingDeleteArgs} args - Arguments to delete one Setting.
     * @example
     * // Delete one Setting
     * const Setting = await prisma.setting.delete({
     *   where: {
     *     // ... filter to delete one Setting
     *   }
     * })
     * 
     */
    delete<T extends SettingDeleteArgs>(args: SelectSubset<T, SettingDeleteArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Setting.
     * @param {SettingUpdateArgs} args - Arguments to update one Setting.
     * @example
     * // Update one Setting
     * const setting = await prisma.setting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingUpdateArgs>(args: SelectSubset<T, SettingUpdateArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.setting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingDeleteManyArgs>(args?: SelectSubset<T, SettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingUpdateManyArgs>(args: SelectSubset<T, SettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const setting = await prisma.setting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `id`
     * const settingWithIdOnly = await prisma.setting.updateManyAndReturn({
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
    updateManyAndReturn<T extends SettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Setting.
     * @param {SettingUpsertArgs} args - Arguments to update or create a Setting.
     * @example
     * // Update or create a Setting
     * const setting = await prisma.setting.upsert({
     *   create: {
     *     // ... data to create a Setting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Setting we want to update
     *   }
     * })
     */
    upsert<T extends SettingUpsertArgs>(args: SelectSubset<T, SettingUpsertArgs<ExtArgs>>): Prisma__SettingClient<$Result.GetResult<Prisma.$SettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.setting.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingCountArgs>(
      args?: Subset<T, SettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SettingAggregateArgs>(args: Subset<T, SettingAggregateArgs>): Prisma.PrismaPromise<GetSettingAggregateType<T>>

    /**
     * Group by Setting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingGroupByArgs} args - Group by arguments.
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
      T extends SettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingGroupByArgs['orderBy'] }
        : { orderBy?: SettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Setting model
   */
  readonly fields: SettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Setting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Setting model
   */
  interface SettingFieldRefs {
    readonly id: FieldRef<"Setting", 'String'>
    readonly key: FieldRef<"Setting", 'String'>
    readonly value: FieldRef<"Setting", 'Json'>
    readonly createdAt: FieldRef<"Setting", 'DateTime'>
    readonly updatedAt: FieldRef<"Setting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Setting findUnique
   */
  export type SettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findUniqueOrThrow
   */
  export type SettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting findFirst
   */
  export type SettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findFirstOrThrow
   */
  export type SettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Setting to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting findMany
   */
  export type SettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingOrderByWithRelationInput | SettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingScalarFieldEnum | SettingScalarFieldEnum[]
  }

  /**
   * Setting create
   */
  export type SettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to create a Setting.
     */
    data: XOR<SettingCreateInput, SettingUncheckedCreateInput>
  }

  /**
   * Setting createMany
   */
  export type SettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting createManyAndReturn
   */
  export type SettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingCreateManyInput | SettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Setting update
   */
  export type SettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data needed to update a Setting.
     */
    data: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
    /**
     * Choose, which Setting to update.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting updateMany
   */
  export type SettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting updateManyAndReturn
   */
  export type SettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingUpdateManyMutationInput, SettingUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Setting upsert
   */
  export type SettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * The filter to search for the Setting to update in case it exists.
     */
    where: SettingWhereUniqueInput
    /**
     * In case the Setting found by the `where` argument doesn't exist, create a new Setting with this data.
     */
    create: XOR<SettingCreateInput, SettingUncheckedCreateInput>
    /**
     * In case the Setting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingUpdateInput, SettingUncheckedUpdateInput>
  }

  /**
   * Setting delete
   */
  export type SettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
    /**
     * Filter which Setting to delete.
     */
    where: SettingWhereUniqueInput
  }

  /**
   * Setting deleteMany
   */
  export type SettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Setting without action
   */
  export type SettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Setting
     */
    select?: SettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Setting
     */
    omit?: SettingOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const UserHasRoleScalarFieldEnum: {
    userId: 'userId',
    roleId: 'roleId'
  };

  export type UserHasRoleScalarFieldEnum = (typeof UserHasRoleScalarFieldEnum)[keyof typeof UserHasRoleScalarFieldEnum]


  export const RoleHasPermissionScalarFieldEnum: {
    roleId: 'roleId',
    permissionId: 'permissionId'
  };

  export type RoleHasPermissionScalarFieldEnum = (typeof RoleHasPermissionScalarFieldEnum)[keyof typeof RoleHasPermissionScalarFieldEnum]


  export const SourceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    type: 'type',
    isActive: 'isActive',
    parserKey: 'parserKey',
    requestDelayMs: 'requestDelayMs',
    lastFetched: 'lastFetched',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum]


  export const SystemPromptScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    description: 'description',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemPromptScalarFieldEnum = (typeof SystemPromptScalarFieldEnum)[keyof typeof SystemPromptScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    url: 'url',
    author: 'author',
    publishedAt: 'publishedAt',
    fetchedAt: 'fetchedAt',
    status: 'status',
    errorMessage: 'errorMessage',
    sourceId: 'sourceId',
    createdAt: 'createdAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ExploredUrlScalarFieldEnum: {
    id: 'id',
    url: 'url',
    title: 'title',
    depth: 'depth',
    status: 'status',
    errorMessage: 'errorMessage',
    parentUrl: 'parentUrl',
    sourceId: 'sourceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExploredUrlScalarFieldEnum = (typeof ExploredUrlScalarFieldEnum)[keyof typeof ExploredUrlScalarFieldEnum]


  export const RewrittenArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    llmModel: 'llmModel',
    tokensUsed: 'tokensUsed',
    processingTime: 'processingTime',
    createdAt: 'createdAt',
    originalArticleId: 'originalArticleId',
    systemPromptId: 'systemPromptId'
  };

  export type RewrittenArticleScalarFieldEnum = (typeof RewrittenArticleScalarFieldEnum)[keyof typeof RewrittenArticleScalarFieldEnum]


  export const SettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingScalarFieldEnum = (typeof SettingScalarFieldEnum)[keyof typeof SettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'SourceType'
   */
  export type EnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType'>
    


  /**
   * Reference to a field of type 'SourceType[]'
   */
  export type ListEnumSourceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ArticleStatus'
   */
  export type EnumArticleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArticleStatus'>
    


  /**
   * Reference to a field of type 'ArticleStatus[]'
   */
  export type ListEnumArticleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ArticleStatus[]'>
    


  /**
   * Reference to a field of type 'ExploredUrlStatus'
   */
  export type EnumExploredUrlStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExploredUrlStatus'>
    


  /**
   * Reference to a field of type 'ExploredUrlStatus[]'
   */
  export type ListEnumExploredUrlStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExploredUrlStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    roles?: UserHasRoleListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: UserHasRoleOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    roles?: UserHasRoleListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserHasRoleListRelationFilter
    permissions?: RoleHasPermissionListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserHasRoleOrderByRelationAggregateInput
    permissions?: RoleHasPermissionOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    name?: StringFilter<"Role"> | string
    description?: StringNullableFilter<"Role"> | string | null
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserHasRoleListRelationFilter
    permissions?: RoleHasPermissionListRelationFilter
  }, "id">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    description?: StringNullableWithAggregatesFilter<"Role"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    description?: JsonFilter<"Permission">
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleHasPermissionListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RoleHasPermissionOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    description?: JsonFilter<"Permission">
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleHasPermissionListRelationFilter
  }, "id" | "name">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permission"> | string
    name?: StringWithAggregatesFilter<"Permission"> | string
    description?: JsonWithAggregatesFilter<"Permission">
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type UserHasRoleWhereInput = {
    AND?: UserHasRoleWhereInput | UserHasRoleWhereInput[]
    OR?: UserHasRoleWhereInput[]
    NOT?: UserHasRoleWhereInput | UserHasRoleWhereInput[]
    userId?: StringFilter<"UserHasRole"> | string
    roleId?: StringFilter<"UserHasRole"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }

  export type UserHasRoleOrderByWithRelationInput = {
    userId?: SortOrder
    roleId?: SortOrder
    user?: UserOrderByWithRelationInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserHasRoleWhereUniqueInput = Prisma.AtLeast<{
    userId_roleId?: UserHasRoleUserIdRoleIdCompoundUniqueInput
    AND?: UserHasRoleWhereInput | UserHasRoleWhereInput[]
    OR?: UserHasRoleWhereInput[]
    NOT?: UserHasRoleWhereInput | UserHasRoleWhereInput[]
    userId?: StringFilter<"UserHasRole"> | string
    roleId?: StringFilter<"UserHasRole"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
  }, "userId_roleId">

  export type UserHasRoleOrderByWithAggregationInput = {
    userId?: SortOrder
    roleId?: SortOrder
    _count?: UserHasRoleCountOrderByAggregateInput
    _max?: UserHasRoleMaxOrderByAggregateInput
    _min?: UserHasRoleMinOrderByAggregateInput
  }

  export type UserHasRoleScalarWhereWithAggregatesInput = {
    AND?: UserHasRoleScalarWhereWithAggregatesInput | UserHasRoleScalarWhereWithAggregatesInput[]
    OR?: UserHasRoleScalarWhereWithAggregatesInput[]
    NOT?: UserHasRoleScalarWhereWithAggregatesInput | UserHasRoleScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserHasRole"> | string
    roleId?: StringWithAggregatesFilter<"UserHasRole"> | string
  }

  export type RoleHasPermissionWhereInput = {
    AND?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    OR?: RoleHasPermissionWhereInput[]
    NOT?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    roleId?: StringFilter<"RoleHasPermission"> | string
    permissionId?: StringFilter<"RoleHasPermission"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }

  export type RoleHasPermissionOrderByWithRelationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    role?: RoleOrderByWithRelationInput
    permission?: PermissionOrderByWithRelationInput
  }

  export type RoleHasPermissionWhereUniqueInput = Prisma.AtLeast<{
    roleId_permissionId?: RoleHasPermissionRoleIdPermissionIdCompoundUniqueInput
    AND?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    OR?: RoleHasPermissionWhereInput[]
    NOT?: RoleHasPermissionWhereInput | RoleHasPermissionWhereInput[]
    roleId?: StringFilter<"RoleHasPermission"> | string
    permissionId?: StringFilter<"RoleHasPermission"> | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    permission?: XOR<PermissionScalarRelationFilter, PermissionWhereInput>
  }, "roleId_permissionId">

  export type RoleHasPermissionOrderByWithAggregationInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
    _count?: RoleHasPermissionCountOrderByAggregateInput
    _max?: RoleHasPermissionMaxOrderByAggregateInput
    _min?: RoleHasPermissionMinOrderByAggregateInput
  }

  export type RoleHasPermissionScalarWhereWithAggregatesInput = {
    AND?: RoleHasPermissionScalarWhereWithAggregatesInput | RoleHasPermissionScalarWhereWithAggregatesInput[]
    OR?: RoleHasPermissionScalarWhereWithAggregatesInput[]
    NOT?: RoleHasPermissionScalarWhereWithAggregatesInput | RoleHasPermissionScalarWhereWithAggregatesInput[]
    roleId?: StringWithAggregatesFilter<"RoleHasPermission"> | string
    permissionId?: StringWithAggregatesFilter<"RoleHasPermission"> | string
  }

  export type SourceWhereInput = {
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    id?: StringFilter<"Source"> | string
    name?: StringFilter<"Source"> | string
    url?: StringFilter<"Source"> | string
    type?: EnumSourceTypeFilter<"Source"> | $Enums.SourceType
    isActive?: BoolFilter<"Source"> | boolean
    parserKey?: StringNullableFilter<"Source"> | string | null
    requestDelayMs?: IntFilter<"Source"> | number
    lastFetched?: DateTimeNullableFilter<"Source"> | Date | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    updatedAt?: DateTimeFilter<"Source"> | Date | string
    articles?: ArticleListRelationFilter
    exploredUrls?: ExploredUrlListRelationFilter
  }

  export type SourceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    parserKey?: SortOrderInput | SortOrder
    requestDelayMs?: SortOrder
    lastFetched?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    articles?: ArticleOrderByRelationAggregateInput
    exploredUrls?: ExploredUrlOrderByRelationAggregateInput
  }

  export type SourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SourceWhereInput | SourceWhereInput[]
    OR?: SourceWhereInput[]
    NOT?: SourceWhereInput | SourceWhereInput[]
    name?: StringFilter<"Source"> | string
    url?: StringFilter<"Source"> | string
    type?: EnumSourceTypeFilter<"Source"> | $Enums.SourceType
    isActive?: BoolFilter<"Source"> | boolean
    parserKey?: StringNullableFilter<"Source"> | string | null
    requestDelayMs?: IntFilter<"Source"> | number
    lastFetched?: DateTimeNullableFilter<"Source"> | Date | string | null
    createdAt?: DateTimeFilter<"Source"> | Date | string
    updatedAt?: DateTimeFilter<"Source"> | Date | string
    articles?: ArticleListRelationFilter
    exploredUrls?: ExploredUrlListRelationFilter
  }, "id">

  export type SourceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    parserKey?: SortOrderInput | SortOrder
    requestDelayMs?: SortOrder
    lastFetched?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SourceCountOrderByAggregateInput
    _avg?: SourceAvgOrderByAggregateInput
    _max?: SourceMaxOrderByAggregateInput
    _min?: SourceMinOrderByAggregateInput
    _sum?: SourceSumOrderByAggregateInput
  }

  export type SourceScalarWhereWithAggregatesInput = {
    AND?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    OR?: SourceScalarWhereWithAggregatesInput[]
    NOT?: SourceScalarWhereWithAggregatesInput | SourceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Source"> | string
    name?: StringWithAggregatesFilter<"Source"> | string
    url?: StringWithAggregatesFilter<"Source"> | string
    type?: EnumSourceTypeWithAggregatesFilter<"Source"> | $Enums.SourceType
    isActive?: BoolWithAggregatesFilter<"Source"> | boolean
    parserKey?: StringNullableWithAggregatesFilter<"Source"> | string | null
    requestDelayMs?: IntWithAggregatesFilter<"Source"> | number
    lastFetched?: DateTimeNullableWithAggregatesFilter<"Source"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Source"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Source"> | Date | string
  }

  export type SystemPromptWhereInput = {
    AND?: SystemPromptWhereInput | SystemPromptWhereInput[]
    OR?: SystemPromptWhereInput[]
    NOT?: SystemPromptWhereInput | SystemPromptWhereInput[]
    id?: StringFilter<"SystemPrompt"> | string
    name?: StringFilter<"SystemPrompt"> | string
    content?: StringFilter<"SystemPrompt"> | string
    description?: StringNullableFilter<"SystemPrompt"> | string | null
    isDefault?: BoolFilter<"SystemPrompt"> | boolean
    createdAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    rewrittenArticles?: RewrittenArticleListRelationFilter
  }

  export type SystemPromptOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    rewrittenArticles?: RewrittenArticleOrderByRelationAggregateInput
  }

  export type SystemPromptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemPromptWhereInput | SystemPromptWhereInput[]
    OR?: SystemPromptWhereInput[]
    NOT?: SystemPromptWhereInput | SystemPromptWhereInput[]
    name?: StringFilter<"SystemPrompt"> | string
    content?: StringFilter<"SystemPrompt"> | string
    description?: StringNullableFilter<"SystemPrompt"> | string | null
    isDefault?: BoolFilter<"SystemPrompt"> | boolean
    createdAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeFilter<"SystemPrompt"> | Date | string
    rewrittenArticles?: RewrittenArticleListRelationFilter
  }, "id">

  export type SystemPromptOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    description?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemPromptCountOrderByAggregateInput
    _max?: SystemPromptMaxOrderByAggregateInput
    _min?: SystemPromptMinOrderByAggregateInput
  }

  export type SystemPromptScalarWhereWithAggregatesInput = {
    AND?: SystemPromptScalarWhereWithAggregatesInput | SystemPromptScalarWhereWithAggregatesInput[]
    OR?: SystemPromptScalarWhereWithAggregatesInput[]
    NOT?: SystemPromptScalarWhereWithAggregatesInput | SystemPromptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemPrompt"> | string
    name?: StringWithAggregatesFilter<"SystemPrompt"> | string
    content?: StringWithAggregatesFilter<"SystemPrompt"> | string
    description?: StringNullableWithAggregatesFilter<"SystemPrompt"> | string | null
    isDefault?: BoolWithAggregatesFilter<"SystemPrompt"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"SystemPrompt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemPrompt"> | Date | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    url?: StringFilter<"Article"> | string
    author?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    fetchedAt?: DateTimeFilter<"Article"> | Date | string
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    errorMessage?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    source?: XOR<SourceScalarRelationFilter, SourceWhereInput>
    rewrittenArticle?: XOR<RewrittenArticleNullableScalarRelationFilter, RewrittenArticleWhereInput> | null
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    author?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    source?: SourceOrderByWithRelationInput
    rewrittenArticle?: RewrittenArticleOrderByWithRelationInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    author?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    fetchedAt?: DateTimeFilter<"Article"> | Date | string
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    errorMessage?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
    source?: XOR<SourceScalarRelationFilter, SourceWhereInput>
    rewrittenArticle?: XOR<RewrittenArticleNullableScalarRelationFilter, RewrittenArticleWhereInput> | null
  }, "id" | "url">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    author?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    fetchedAt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    title?: StringWithAggregatesFilter<"Article"> | string
    content?: StringWithAggregatesFilter<"Article"> | string
    url?: StringWithAggregatesFilter<"Article"> | string
    author?: StringNullableWithAggregatesFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Article"> | Date | string | null
    fetchedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    status?: EnumArticleStatusWithAggregatesFilter<"Article"> | $Enums.ArticleStatus
    errorMessage?: StringNullableWithAggregatesFilter<"Article"> | string | null
    sourceId?: StringWithAggregatesFilter<"Article"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ExploredUrlWhereInput = {
    AND?: ExploredUrlWhereInput | ExploredUrlWhereInput[]
    OR?: ExploredUrlWhereInput[]
    NOT?: ExploredUrlWhereInput | ExploredUrlWhereInput[]
    id?: StringFilter<"ExploredUrl"> | string
    url?: StringFilter<"ExploredUrl"> | string
    title?: StringNullableFilter<"ExploredUrl"> | string | null
    depth?: IntFilter<"ExploredUrl"> | number
    status?: EnumExploredUrlStatusFilter<"ExploredUrl"> | $Enums.ExploredUrlStatus
    errorMessage?: StringNullableFilter<"ExploredUrl"> | string | null
    parentUrl?: StringNullableFilter<"ExploredUrl"> | string | null
    sourceId?: StringFilter<"ExploredUrl"> | string
    createdAt?: DateTimeFilter<"ExploredUrl"> | Date | string
    updatedAt?: DateTimeFilter<"ExploredUrl"> | Date | string
    source?: XOR<SourceScalarRelationFilter, SourceWhereInput>
  }

  export type ExploredUrlOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    depth?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    parentUrl?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    source?: SourceOrderByWithRelationInput
  }

  export type ExploredUrlWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: ExploredUrlWhereInput | ExploredUrlWhereInput[]
    OR?: ExploredUrlWhereInput[]
    NOT?: ExploredUrlWhereInput | ExploredUrlWhereInput[]
    title?: StringNullableFilter<"ExploredUrl"> | string | null
    depth?: IntFilter<"ExploredUrl"> | number
    status?: EnumExploredUrlStatusFilter<"ExploredUrl"> | $Enums.ExploredUrlStatus
    errorMessage?: StringNullableFilter<"ExploredUrl"> | string | null
    parentUrl?: StringNullableFilter<"ExploredUrl"> | string | null
    sourceId?: StringFilter<"ExploredUrl"> | string
    createdAt?: DateTimeFilter<"ExploredUrl"> | Date | string
    updatedAt?: DateTimeFilter<"ExploredUrl"> | Date | string
    source?: XOR<SourceScalarRelationFilter, SourceWhereInput>
  }, "id" | "url">

  export type ExploredUrlOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrderInput | SortOrder
    depth?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    parentUrl?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExploredUrlCountOrderByAggregateInput
    _avg?: ExploredUrlAvgOrderByAggregateInput
    _max?: ExploredUrlMaxOrderByAggregateInput
    _min?: ExploredUrlMinOrderByAggregateInput
    _sum?: ExploredUrlSumOrderByAggregateInput
  }

  export type ExploredUrlScalarWhereWithAggregatesInput = {
    AND?: ExploredUrlScalarWhereWithAggregatesInput | ExploredUrlScalarWhereWithAggregatesInput[]
    OR?: ExploredUrlScalarWhereWithAggregatesInput[]
    NOT?: ExploredUrlScalarWhereWithAggregatesInput | ExploredUrlScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExploredUrl"> | string
    url?: StringWithAggregatesFilter<"ExploredUrl"> | string
    title?: StringNullableWithAggregatesFilter<"ExploredUrl"> | string | null
    depth?: IntWithAggregatesFilter<"ExploredUrl"> | number
    status?: EnumExploredUrlStatusWithAggregatesFilter<"ExploredUrl"> | $Enums.ExploredUrlStatus
    errorMessage?: StringNullableWithAggregatesFilter<"ExploredUrl"> | string | null
    parentUrl?: StringNullableWithAggregatesFilter<"ExploredUrl"> | string | null
    sourceId?: StringWithAggregatesFilter<"ExploredUrl"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ExploredUrl"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExploredUrl"> | Date | string
  }

  export type RewrittenArticleWhereInput = {
    AND?: RewrittenArticleWhereInput | RewrittenArticleWhereInput[]
    OR?: RewrittenArticleWhereInput[]
    NOT?: RewrittenArticleWhereInput | RewrittenArticleWhereInput[]
    id?: StringFilter<"RewrittenArticle"> | string
    title?: StringFilter<"RewrittenArticle"> | string
    content?: StringFilter<"RewrittenArticle"> | string
    llmModel?: StringFilter<"RewrittenArticle"> | string
    tokensUsed?: IntNullableFilter<"RewrittenArticle"> | number | null
    processingTime?: IntNullableFilter<"RewrittenArticle"> | number | null
    createdAt?: DateTimeFilter<"RewrittenArticle"> | Date | string
    originalArticleId?: StringFilter<"RewrittenArticle"> | string
    systemPromptId?: StringFilter<"RewrittenArticle"> | string
    originalArticle?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    systemPrompt?: XOR<SystemPromptScalarRelationFilter, SystemPromptWhereInput>
  }

  export type RewrittenArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    llmModel?: SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    originalArticleId?: SortOrder
    systemPromptId?: SortOrder
    originalArticle?: ArticleOrderByWithRelationInput
    systemPrompt?: SystemPromptOrderByWithRelationInput
  }

  export type RewrittenArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    originalArticleId?: string
    AND?: RewrittenArticleWhereInput | RewrittenArticleWhereInput[]
    OR?: RewrittenArticleWhereInput[]
    NOT?: RewrittenArticleWhereInput | RewrittenArticleWhereInput[]
    title?: StringFilter<"RewrittenArticle"> | string
    content?: StringFilter<"RewrittenArticle"> | string
    llmModel?: StringFilter<"RewrittenArticle"> | string
    tokensUsed?: IntNullableFilter<"RewrittenArticle"> | number | null
    processingTime?: IntNullableFilter<"RewrittenArticle"> | number | null
    createdAt?: DateTimeFilter<"RewrittenArticle"> | Date | string
    systemPromptId?: StringFilter<"RewrittenArticle"> | string
    originalArticle?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    systemPrompt?: XOR<SystemPromptScalarRelationFilter, SystemPromptWhereInput>
  }, "id" | "originalArticleId">

  export type RewrittenArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    llmModel?: SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    processingTime?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    originalArticleId?: SortOrder
    systemPromptId?: SortOrder
    _count?: RewrittenArticleCountOrderByAggregateInput
    _avg?: RewrittenArticleAvgOrderByAggregateInput
    _max?: RewrittenArticleMaxOrderByAggregateInput
    _min?: RewrittenArticleMinOrderByAggregateInput
    _sum?: RewrittenArticleSumOrderByAggregateInput
  }

  export type RewrittenArticleScalarWhereWithAggregatesInput = {
    AND?: RewrittenArticleScalarWhereWithAggregatesInput | RewrittenArticleScalarWhereWithAggregatesInput[]
    OR?: RewrittenArticleScalarWhereWithAggregatesInput[]
    NOT?: RewrittenArticleScalarWhereWithAggregatesInput | RewrittenArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RewrittenArticle"> | string
    title?: StringWithAggregatesFilter<"RewrittenArticle"> | string
    content?: StringWithAggregatesFilter<"RewrittenArticle"> | string
    llmModel?: StringWithAggregatesFilter<"RewrittenArticle"> | string
    tokensUsed?: IntNullableWithAggregatesFilter<"RewrittenArticle"> | number | null
    processingTime?: IntNullableWithAggregatesFilter<"RewrittenArticle"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"RewrittenArticle"> | Date | string
    originalArticleId?: StringWithAggregatesFilter<"RewrittenArticle"> | string
    systemPromptId?: StringWithAggregatesFilter<"RewrittenArticle"> | string
  }

  export type SettingWhereInput = {
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    id?: StringFilter<"Setting"> | string
    key?: StringFilter<"Setting"> | string
    value?: JsonFilter<"Setting">
    createdAt?: DateTimeFilter<"Setting"> | Date | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }

  export type SettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SettingWhereInput | SettingWhereInput[]
    OR?: SettingWhereInput[]
    NOT?: SettingWhereInput | SettingWhereInput[]
    value?: JsonFilter<"Setting">
    createdAt?: DateTimeFilter<"Setting"> | Date | string
    updatedAt?: DateTimeFilter<"Setting"> | Date | string
  }, "id" | "key">

  export type SettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingCountOrderByAggregateInput
    _max?: SettingMaxOrderByAggregateInput
    _min?: SettingMinOrderByAggregateInput
  }

  export type SettingScalarWhereWithAggregatesInput = {
    AND?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    OR?: SettingScalarWhereWithAggregatesInput[]
    NOT?: SettingScalarWhereWithAggregatesInput | SettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Setting"> | string
    key?: StringWithAggregatesFilter<"Setting"> | string
    value?: JsonWithAggregatesFilter<"Setting">
    createdAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Setting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: UserHasRoleCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: UserHasRoleUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserHasRoleUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: UserHasRoleUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserHasRoleCreateNestedManyWithoutRoleInput
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserHasRoleUncheckedCreateNestedManyWithoutRoleInput
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserHasRoleUpdateManyWithoutRoleNestedInput
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserHasRoleUncheckedUpdateManyWithoutRoleNestedInput
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    name: string
    description: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleHasPermissionCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    name: string
    description: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleHasPermissionUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    name: string
    description: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserHasRoleCreateInput = {
    user: UserCreateNestedOneWithoutRolesInput
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserHasRoleUncheckedCreateInput = {
    userId: string
    roleId: string
  }

  export type UserHasRoleUpdateInput = {
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserHasRoleUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserHasRoleCreateManyInput = {
    userId: string
    roleId: string
  }

  export type UserHasRoleUpdateManyMutationInput = {

  }

  export type UserHasRoleUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionCreateInput = {
    role: RoleCreateNestedOneWithoutPermissionsInput
    permission: PermissionCreateNestedOneWithoutRolesInput
  }

  export type RoleHasPermissionUncheckedCreateInput = {
    roleId: string
    permissionId: string
  }

  export type RoleHasPermissionUpdateInput = {
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
    permission?: PermissionUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionCreateManyInput = {
    roleId: string
    permissionId: string
  }

  export type RoleHasPermissionUpdateManyMutationInput = {

  }

  export type RoleHasPermissionUncheckedUpdateManyInput = {
    roleId?: StringFieldUpdateOperationsInput | string
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type SourceCreateInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutSourceInput
    exploredUrls?: ExploredUrlCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutSourceInput
    exploredUrls?: ExploredUrlUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutSourceNestedInput
    exploredUrls?: ExploredUrlUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutSourceNestedInput
    exploredUrls?: ExploredUrlUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type SourceCreateManyInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SourceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SourceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptCreateInput = {
    id?: string
    name: string
    content: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rewrittenArticles?: RewrittenArticleCreateNestedManyWithoutSystemPromptInput
  }

  export type SystemPromptUncheckedCreateInput = {
    id?: string
    name: string
    content: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    rewrittenArticles?: RewrittenArticleUncheckedCreateNestedManyWithoutSystemPromptInput
  }

  export type SystemPromptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrittenArticles?: RewrittenArticleUpdateManyWithoutSystemPromptNestedInput
  }

  export type SystemPromptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrittenArticles?: RewrittenArticleUncheckedUpdateManyWithoutSystemPromptNestedInput
  }

  export type SystemPromptCreateManyInput = {
    id?: string
    name: string
    content: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    createdAt?: Date | string
    source: SourceCreateNestedOneWithoutArticlesInput
    rewrittenArticle?: RewrittenArticleCreateNestedOneWithoutOriginalArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    sourceId: string
    createdAt?: Date | string
    rewrittenArticle?: RewrittenArticleUncheckedCreateNestedOneWithoutOriginalArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: SourceUpdateOneRequiredWithoutArticlesNestedInput
    rewrittenArticle?: RewrittenArticleUpdateOneWithoutOriginalArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrittenArticle?: RewrittenArticleUncheckedUpdateOneWithoutOriginalArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    sourceId: string
    createdAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlCreateInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    source: SourceCreateNestedOneWithoutExploredUrlsInput
  }

  export type ExploredUrlUncheckedCreateInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    sourceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExploredUrlUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: SourceUpdateOneRequiredWithoutExploredUrlsNestedInput
  }

  export type ExploredUrlUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlCreateManyInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    sourceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExploredUrlUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewrittenArticleCreateInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticle: ArticleCreateNestedOneWithoutRewrittenArticleInput
    systemPrompt: SystemPromptCreateNestedOneWithoutRewrittenArticlesInput
  }

  export type RewrittenArticleUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticleId: string
    systemPromptId: string
  }

  export type RewrittenArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticle?: ArticleUpdateOneRequiredWithoutRewrittenArticleNestedInput
    systemPrompt?: SystemPromptUpdateOneRequiredWithoutRewrittenArticlesNestedInput
  }

  export type RewrittenArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticleId?: StringFieldUpdateOperationsInput | string
    systemPromptId?: StringFieldUpdateOperationsInput | string
  }

  export type RewrittenArticleCreateManyInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticleId: string
    systemPromptId: string
  }

  export type RewrittenArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewrittenArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticleId?: StringFieldUpdateOperationsInput | string
    systemPromptId?: StringFieldUpdateOperationsInput | string
  }

  export type SettingCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUncheckedCreateInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingCreateManyInput = {
    id?: string
    key: string
    value: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type UserHasRoleListRelationFilter = {
    every?: UserHasRoleWhereInput
    some?: UserHasRoleWhereInput
    none?: UserHasRoleWhereInput
  }

  export type UserHasRoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type RoleHasPermissionListRelationFilter = {
    every?: RoleHasPermissionWhereInput
    some?: RoleHasPermissionWhereInput
    none?: RoleHasPermissionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoleHasPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type UserHasRoleUserIdRoleIdCompoundUniqueInput = {
    userId: string
    roleId: string
  }

  export type UserHasRoleCountOrderByAggregateInput = {
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserHasRoleMaxOrderByAggregateInput = {
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type UserHasRoleMinOrderByAggregateInput = {
    userId?: SortOrder
    roleId?: SortOrder
  }

  export type PermissionScalarRelationFilter = {
    is?: PermissionWhereInput
    isNot?: PermissionWhereInput
  }

  export type RoleHasPermissionRoleIdPermissionIdCompoundUniqueInput = {
    roleId: string
    permissionId: string
  }

  export type RoleHasPermissionCountOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type RoleHasPermissionMaxOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type RoleHasPermissionMinOrderByAggregateInput = {
    roleId?: SortOrder
    permissionId?: SortOrder
  }

  export type EnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type ExploredUrlListRelationFilter = {
    every?: ExploredUrlWhereInput
    some?: ExploredUrlWhereInput
    none?: ExploredUrlWhereInput
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExploredUrlOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SourceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    parserKey?: SortOrder
    requestDelayMs?: SortOrder
    lastFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceAvgOrderByAggregateInput = {
    requestDelayMs?: SortOrder
  }

  export type SourceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    parserKey?: SortOrder
    requestDelayMs?: SortOrder
    lastFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    type?: SortOrder
    isActive?: SortOrder
    parserKey?: SortOrder
    requestDelayMs?: SortOrder
    lastFetched?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SourceSumOrderByAggregateInput = {
    requestDelayMs?: SortOrder
  }

  export type EnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RewrittenArticleListRelationFilter = {
    every?: RewrittenArticleWhereInput
    some?: RewrittenArticleWhereInput
    none?: RewrittenArticleWhereInput
  }

  export type RewrittenArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SystemPromptCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemPromptMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemPromptMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    description?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumArticleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusFilter<$PrismaModel> | $Enums.ArticleStatus
  }

  export type SourceScalarRelationFilter = {
    is?: SourceWhereInput
    isNot?: SourceWhereInput
  }

  export type RewrittenArticleNullableScalarRelationFilter = {
    is?: RewrittenArticleWhereInput | null
    isNot?: RewrittenArticleWhereInput | null
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    fetchedAt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    fetchedAt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    url?: SortOrder
    author?: SortOrder
    publishedAt?: SortOrder
    fetchedAt?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumArticleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ArticleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArticleStatusFilter<$PrismaModel>
    _max?: NestedEnumArticleStatusFilter<$PrismaModel>
  }

  export type EnumExploredUrlStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExploredUrlStatus | EnumExploredUrlStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExploredUrlStatusFilter<$PrismaModel> | $Enums.ExploredUrlStatus
  }

  export type ExploredUrlCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    depth?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    parentUrl?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExploredUrlAvgOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type ExploredUrlMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    depth?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    parentUrl?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExploredUrlMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    title?: SortOrder
    depth?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    parentUrl?: SortOrder
    sourceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExploredUrlSumOrderByAggregateInput = {
    depth?: SortOrder
  }

  export type EnumExploredUrlStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExploredUrlStatus | EnumExploredUrlStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExploredUrlStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExploredUrlStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExploredUrlStatusFilter<$PrismaModel>
    _max?: NestedEnumExploredUrlStatusFilter<$PrismaModel>
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

  export type ArticleScalarRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type SystemPromptScalarRelationFilter = {
    is?: SystemPromptWhereInput
    isNot?: SystemPromptWhereInput
  }

  export type RewrittenArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    llmModel?: SortOrder
    tokensUsed?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
    originalArticleId?: SortOrder
    systemPromptId?: SortOrder
  }

  export type RewrittenArticleAvgOrderByAggregateInput = {
    tokensUsed?: SortOrder
    processingTime?: SortOrder
  }

  export type RewrittenArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    llmModel?: SortOrder
    tokensUsed?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
    originalArticleId?: SortOrder
    systemPromptId?: SortOrder
  }

  export type RewrittenArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    llmModel?: SortOrder
    tokensUsed?: SortOrder
    processingTime?: SortOrder
    createdAt?: SortOrder
    originalArticleId?: SortOrder
    systemPromptId?: SortOrder
  }

  export type RewrittenArticleSumOrderByAggregateInput = {
    tokensUsed?: SortOrder
    processingTime?: SortOrder
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

  export type SettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserHasRoleCreateNestedManyWithoutUserInput = {
    create?: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput> | UserHasRoleCreateWithoutUserInput[] | UserHasRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutUserInput | UserHasRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserHasRoleCreateManyUserInputEnvelope
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
  }

  export type UserHasRoleUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput> | UserHasRoleCreateWithoutUserInput[] | UserHasRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutUserInput | UserHasRoleCreateOrConnectWithoutUserInput[]
    createMany?: UserHasRoleCreateManyUserInputEnvelope
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserHasRoleUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput> | UserHasRoleCreateWithoutUserInput[] | UserHasRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutUserInput | UserHasRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserHasRoleUpsertWithWhereUniqueWithoutUserInput | UserHasRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserHasRoleCreateManyUserInputEnvelope
    set?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    disconnect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    delete?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    update?: UserHasRoleUpdateWithWhereUniqueWithoutUserInput | UserHasRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserHasRoleUpdateManyWithWhereWithoutUserInput | UserHasRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
  }

  export type UserHasRoleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput> | UserHasRoleCreateWithoutUserInput[] | UserHasRoleUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutUserInput | UserHasRoleCreateOrConnectWithoutUserInput[]
    upsert?: UserHasRoleUpsertWithWhereUniqueWithoutUserInput | UserHasRoleUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserHasRoleCreateManyUserInputEnvelope
    set?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    disconnect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    delete?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    update?: UserHasRoleUpdateWithWhereUniqueWithoutUserInput | UserHasRoleUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserHasRoleUpdateManyWithWhereWithoutUserInput | UserHasRoleUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
  }

  export type UserHasRoleCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput> | UserHasRoleCreateWithoutRoleInput[] | UserHasRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutRoleInput | UserHasRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserHasRoleCreateManyRoleInputEnvelope
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
  }

  export type RoleHasPermissionCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type UserHasRoleUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput> | UserHasRoleCreateWithoutRoleInput[] | UserHasRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutRoleInput | UserHasRoleCreateOrConnectWithoutRoleInput[]
    createMany?: UserHasRoleCreateManyRoleInputEnvelope
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
  }

  export type RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserHasRoleUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput> | UserHasRoleCreateWithoutRoleInput[] | UserHasRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutRoleInput | UserHasRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserHasRoleUpsertWithWhereUniqueWithoutRoleInput | UserHasRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserHasRoleCreateManyRoleInputEnvelope
    set?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    disconnect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    delete?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    update?: UserHasRoleUpdateWithWhereUniqueWithoutRoleInput | UserHasRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserHasRoleUpdateManyWithWhereWithoutRoleInput | UserHasRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
  }

  export type RoleHasPermissionUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutRoleInput | RoleHasPermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type UserHasRoleUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput> | UserHasRoleCreateWithoutRoleInput[] | UserHasRoleUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserHasRoleCreateOrConnectWithoutRoleInput | UserHasRoleCreateOrConnectWithoutRoleInput[]
    upsert?: UserHasRoleUpsertWithWhereUniqueWithoutRoleInput | UserHasRoleUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserHasRoleCreateManyRoleInputEnvelope
    set?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    disconnect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    delete?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    connect?: UserHasRoleWhereUniqueInput | UserHasRoleWhereUniqueInput[]
    update?: UserHasRoleUpdateWithWhereUniqueWithoutRoleInput | UserHasRoleUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserHasRoleUpdateManyWithWhereWithoutRoleInput | UserHasRoleUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput> | RoleHasPermissionCreateWithoutRoleInput[] | RoleHasPermissionUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutRoleInput | RoleHasPermissionCreateOrConnectWithoutRoleInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: RoleHasPermissionCreateManyRoleInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput | RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutRoleInput | RoleHasPermissionUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type RoleHasPermissionCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type RoleHasPermissionUncheckedCreateNestedManyWithoutPermissionInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
  }

  export type RoleHasPermissionUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput | RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutPermissionNestedInput = {
    create?: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput> | RoleHasPermissionCreateWithoutPermissionInput[] | RoleHasPermissionUncheckedCreateWithoutPermissionInput[]
    connectOrCreate?: RoleHasPermissionCreateOrConnectWithoutPermissionInput | RoleHasPermissionCreateOrConnectWithoutPermissionInput[]
    upsert?: RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput[]
    createMany?: RoleHasPermissionCreateManyPermissionInputEnvelope
    set?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    disconnect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    delete?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    connect?: RoleHasPermissionWhereUniqueInput | RoleHasPermissionWhereUniqueInput[]
    update?: RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput | RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput[]
    updateMany?: RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput | RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput[]
    deleteMany?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRolesInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    connect?: UserWhereUniqueInput
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRolesInput
    upsert?: UserUpsertWithoutRolesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRolesInput, UserUpdateWithoutRolesInput>, UserUncheckedUpdateWithoutRolesInput>
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
  }

  export type PermissionCreateNestedOneWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput
    connect?: PermissionWhereUniqueInput
  }

  export type RoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput
    upsert?: RoleUpsertWithoutPermissionsInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutPermissionsInput, RoleUpdateWithoutPermissionsInput>, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type PermissionUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput
    upsert?: PermissionUpsertWithoutRolesInput
    connect?: PermissionWhereUniqueInput
    update?: XOR<XOR<PermissionUpdateToOneWithWhereWithoutRolesInput, PermissionUpdateWithoutRolesInput>, PermissionUncheckedUpdateWithoutRolesInput>
  }

  export type ArticleCreateNestedManyWithoutSourceInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ExploredUrlCreateNestedManyWithoutSourceInput = {
    create?: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput> | ExploredUrlCreateWithoutSourceInput[] | ExploredUrlUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ExploredUrlCreateOrConnectWithoutSourceInput | ExploredUrlCreateOrConnectWithoutSourceInput[]
    createMany?: ExploredUrlCreateManySourceInputEnvelope
    connect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ExploredUrlUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput> | ExploredUrlCreateWithoutSourceInput[] | ExploredUrlUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ExploredUrlCreateOrConnectWithoutSourceInput | ExploredUrlCreateOrConnectWithoutSourceInput[]
    createMany?: ExploredUrlCreateManySourceInputEnvelope
    connect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
  }

  export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ArticleUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutSourceInput | ArticleUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutSourceInput | ArticleUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutSourceInput | ArticleUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ExploredUrlUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput> | ExploredUrlCreateWithoutSourceInput[] | ExploredUrlUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ExploredUrlCreateOrConnectWithoutSourceInput | ExploredUrlCreateOrConnectWithoutSourceInput[]
    upsert?: ExploredUrlUpsertWithWhereUniqueWithoutSourceInput | ExploredUrlUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ExploredUrlCreateManySourceInputEnvelope
    set?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    disconnect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    delete?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    connect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    update?: ExploredUrlUpdateWithWhereUniqueWithoutSourceInput | ExploredUrlUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ExploredUrlUpdateManyWithWhereWithoutSourceInput | ExploredUrlUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ExploredUrlScalarWhereInput | ExploredUrlScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput> | ArticleCreateWithoutSourceInput[] | ArticleUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutSourceInput | ArticleCreateOrConnectWithoutSourceInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutSourceInput | ArticleUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ArticleCreateManySourceInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutSourceInput | ArticleUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutSourceInput | ArticleUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ExploredUrlUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput> | ExploredUrlCreateWithoutSourceInput[] | ExploredUrlUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: ExploredUrlCreateOrConnectWithoutSourceInput | ExploredUrlCreateOrConnectWithoutSourceInput[]
    upsert?: ExploredUrlUpsertWithWhereUniqueWithoutSourceInput | ExploredUrlUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: ExploredUrlCreateManySourceInputEnvelope
    set?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    disconnect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    delete?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    connect?: ExploredUrlWhereUniqueInput | ExploredUrlWhereUniqueInput[]
    update?: ExploredUrlUpdateWithWhereUniqueWithoutSourceInput | ExploredUrlUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: ExploredUrlUpdateManyWithWhereWithoutSourceInput | ExploredUrlUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: ExploredUrlScalarWhereInput | ExploredUrlScalarWhereInput[]
  }

  export type RewrittenArticleCreateNestedManyWithoutSystemPromptInput = {
    create?: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput> | RewrittenArticleCreateWithoutSystemPromptInput[] | RewrittenArticleUncheckedCreateWithoutSystemPromptInput[]
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutSystemPromptInput | RewrittenArticleCreateOrConnectWithoutSystemPromptInput[]
    createMany?: RewrittenArticleCreateManySystemPromptInputEnvelope
    connect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
  }

  export type RewrittenArticleUncheckedCreateNestedManyWithoutSystemPromptInput = {
    create?: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput> | RewrittenArticleCreateWithoutSystemPromptInput[] | RewrittenArticleUncheckedCreateWithoutSystemPromptInput[]
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutSystemPromptInput | RewrittenArticleCreateOrConnectWithoutSystemPromptInput[]
    createMany?: RewrittenArticleCreateManySystemPromptInputEnvelope
    connect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
  }

  export type RewrittenArticleUpdateManyWithoutSystemPromptNestedInput = {
    create?: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput> | RewrittenArticleCreateWithoutSystemPromptInput[] | RewrittenArticleUncheckedCreateWithoutSystemPromptInput[]
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutSystemPromptInput | RewrittenArticleCreateOrConnectWithoutSystemPromptInput[]
    upsert?: RewrittenArticleUpsertWithWhereUniqueWithoutSystemPromptInput | RewrittenArticleUpsertWithWhereUniqueWithoutSystemPromptInput[]
    createMany?: RewrittenArticleCreateManySystemPromptInputEnvelope
    set?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    disconnect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    delete?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    connect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    update?: RewrittenArticleUpdateWithWhereUniqueWithoutSystemPromptInput | RewrittenArticleUpdateWithWhereUniqueWithoutSystemPromptInput[]
    updateMany?: RewrittenArticleUpdateManyWithWhereWithoutSystemPromptInput | RewrittenArticleUpdateManyWithWhereWithoutSystemPromptInput[]
    deleteMany?: RewrittenArticleScalarWhereInput | RewrittenArticleScalarWhereInput[]
  }

  export type RewrittenArticleUncheckedUpdateManyWithoutSystemPromptNestedInput = {
    create?: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput> | RewrittenArticleCreateWithoutSystemPromptInput[] | RewrittenArticleUncheckedCreateWithoutSystemPromptInput[]
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutSystemPromptInput | RewrittenArticleCreateOrConnectWithoutSystemPromptInput[]
    upsert?: RewrittenArticleUpsertWithWhereUniqueWithoutSystemPromptInput | RewrittenArticleUpsertWithWhereUniqueWithoutSystemPromptInput[]
    createMany?: RewrittenArticleCreateManySystemPromptInputEnvelope
    set?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    disconnect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    delete?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    connect?: RewrittenArticleWhereUniqueInput | RewrittenArticleWhereUniqueInput[]
    update?: RewrittenArticleUpdateWithWhereUniqueWithoutSystemPromptInput | RewrittenArticleUpdateWithWhereUniqueWithoutSystemPromptInput[]
    updateMany?: RewrittenArticleUpdateManyWithWhereWithoutSystemPromptInput | RewrittenArticleUpdateManyWithWhereWithoutSystemPromptInput[]
    deleteMany?: RewrittenArticleScalarWhereInput | RewrittenArticleScalarWhereInput[]
  }

  export type SourceCreateNestedOneWithoutArticlesInput = {
    create?: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: SourceCreateOrConnectWithoutArticlesInput
    connect?: SourceWhereUniqueInput
  }

  export type RewrittenArticleCreateNestedOneWithoutOriginalArticleInput = {
    create?: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutOriginalArticleInput
    connect?: RewrittenArticleWhereUniqueInput
  }

  export type RewrittenArticleUncheckedCreateNestedOneWithoutOriginalArticleInput = {
    create?: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutOriginalArticleInput
    connect?: RewrittenArticleWhereUniqueInput
  }

  export type EnumArticleStatusFieldUpdateOperationsInput = {
    set?: $Enums.ArticleStatus
  }

  export type SourceUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: SourceCreateOrConnectWithoutArticlesInput
    upsert?: SourceUpsertWithoutArticlesInput
    connect?: SourceWhereUniqueInput
    update?: XOR<XOR<SourceUpdateToOneWithWhereWithoutArticlesInput, SourceUpdateWithoutArticlesInput>, SourceUncheckedUpdateWithoutArticlesInput>
  }

  export type RewrittenArticleUpdateOneWithoutOriginalArticleNestedInput = {
    create?: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutOriginalArticleInput
    upsert?: RewrittenArticleUpsertWithoutOriginalArticleInput
    disconnect?: RewrittenArticleWhereInput | boolean
    delete?: RewrittenArticleWhereInput | boolean
    connect?: RewrittenArticleWhereUniqueInput
    update?: XOR<XOR<RewrittenArticleUpdateToOneWithWhereWithoutOriginalArticleInput, RewrittenArticleUpdateWithoutOriginalArticleInput>, RewrittenArticleUncheckedUpdateWithoutOriginalArticleInput>
  }

  export type RewrittenArticleUncheckedUpdateOneWithoutOriginalArticleNestedInput = {
    create?: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
    connectOrCreate?: RewrittenArticleCreateOrConnectWithoutOriginalArticleInput
    upsert?: RewrittenArticleUpsertWithoutOriginalArticleInput
    disconnect?: RewrittenArticleWhereInput | boolean
    delete?: RewrittenArticleWhereInput | boolean
    connect?: RewrittenArticleWhereUniqueInput
    update?: XOR<XOR<RewrittenArticleUpdateToOneWithWhereWithoutOriginalArticleInput, RewrittenArticleUpdateWithoutOriginalArticleInput>, RewrittenArticleUncheckedUpdateWithoutOriginalArticleInput>
  }

  export type SourceCreateNestedOneWithoutExploredUrlsInput = {
    create?: XOR<SourceCreateWithoutExploredUrlsInput, SourceUncheckedCreateWithoutExploredUrlsInput>
    connectOrCreate?: SourceCreateOrConnectWithoutExploredUrlsInput
    connect?: SourceWhereUniqueInput
  }

  export type EnumExploredUrlStatusFieldUpdateOperationsInput = {
    set?: $Enums.ExploredUrlStatus
  }

  export type SourceUpdateOneRequiredWithoutExploredUrlsNestedInput = {
    create?: XOR<SourceCreateWithoutExploredUrlsInput, SourceUncheckedCreateWithoutExploredUrlsInput>
    connectOrCreate?: SourceCreateOrConnectWithoutExploredUrlsInput
    upsert?: SourceUpsertWithoutExploredUrlsInput
    connect?: SourceWhereUniqueInput
    update?: XOR<XOR<SourceUpdateToOneWithWhereWithoutExploredUrlsInput, SourceUpdateWithoutExploredUrlsInput>, SourceUncheckedUpdateWithoutExploredUrlsInput>
  }

  export type ArticleCreateNestedOneWithoutRewrittenArticleInput = {
    create?: XOR<ArticleCreateWithoutRewrittenArticleInput, ArticleUncheckedCreateWithoutRewrittenArticleInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutRewrittenArticleInput
    connect?: ArticleWhereUniqueInput
  }

  export type SystemPromptCreateNestedOneWithoutRewrittenArticlesInput = {
    create?: XOR<SystemPromptCreateWithoutRewrittenArticlesInput, SystemPromptUncheckedCreateWithoutRewrittenArticlesInput>
    connectOrCreate?: SystemPromptCreateOrConnectWithoutRewrittenArticlesInput
    connect?: SystemPromptWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ArticleUpdateOneRequiredWithoutRewrittenArticleNestedInput = {
    create?: XOR<ArticleCreateWithoutRewrittenArticleInput, ArticleUncheckedCreateWithoutRewrittenArticleInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutRewrittenArticleInput
    upsert?: ArticleUpsertWithoutRewrittenArticleInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutRewrittenArticleInput, ArticleUpdateWithoutRewrittenArticleInput>, ArticleUncheckedUpdateWithoutRewrittenArticleInput>
  }

  export type SystemPromptUpdateOneRequiredWithoutRewrittenArticlesNestedInput = {
    create?: XOR<SystemPromptCreateWithoutRewrittenArticlesInput, SystemPromptUncheckedCreateWithoutRewrittenArticlesInput>
    connectOrCreate?: SystemPromptCreateOrConnectWithoutRewrittenArticlesInput
    upsert?: SystemPromptUpsertWithoutRewrittenArticlesInput
    connect?: SystemPromptWhereUniqueInput
    update?: XOR<XOR<SystemPromptUpdateToOneWithWhereWithoutRewrittenArticlesInput, SystemPromptUpdateWithoutRewrittenArticlesInput>, SystemPromptUncheckedUpdateWithoutRewrittenArticlesInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSourceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeFilter<$PrismaModel> | $Enums.SourceType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SourceType | EnumSourceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SourceType[] | ListEnumSourceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSourceTypeWithAggregatesFilter<$PrismaModel> | $Enums.SourceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSourceTypeFilter<$PrismaModel>
    _max?: NestedEnumSourceTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumArticleStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusFilter<$PrismaModel> | $Enums.ArticleStatus
  }

  export type NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ArticleStatus | EnumArticleStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ArticleStatus[] | ListEnumArticleStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumArticleStatusWithAggregatesFilter<$PrismaModel> | $Enums.ArticleStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumArticleStatusFilter<$PrismaModel>
    _max?: NestedEnumArticleStatusFilter<$PrismaModel>
  }

  export type NestedEnumExploredUrlStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ExploredUrlStatus | EnumExploredUrlStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExploredUrlStatusFilter<$PrismaModel> | $Enums.ExploredUrlStatus
  }

  export type NestedEnumExploredUrlStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExploredUrlStatus | EnumExploredUrlStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExploredUrlStatus[] | ListEnumExploredUrlStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumExploredUrlStatusWithAggregatesFilter<$PrismaModel> | $Enums.ExploredUrlStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExploredUrlStatusFilter<$PrismaModel>
    _max?: NestedEnumExploredUrlStatusFilter<$PrismaModel>
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

  export type UserHasRoleCreateWithoutUserInput = {
    role: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserHasRoleUncheckedCreateWithoutUserInput = {
    roleId: string
  }

  export type UserHasRoleCreateOrConnectWithoutUserInput = {
    where: UserHasRoleWhereUniqueInput
    create: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput>
  }

  export type UserHasRoleCreateManyUserInputEnvelope = {
    data: UserHasRoleCreateManyUserInput | UserHasRoleCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserHasRoleUpsertWithWhereUniqueWithoutUserInput = {
    where: UserHasRoleWhereUniqueInput
    update: XOR<UserHasRoleUpdateWithoutUserInput, UserHasRoleUncheckedUpdateWithoutUserInput>
    create: XOR<UserHasRoleCreateWithoutUserInput, UserHasRoleUncheckedCreateWithoutUserInput>
  }

  export type UserHasRoleUpdateWithWhereUniqueWithoutUserInput = {
    where: UserHasRoleWhereUniqueInput
    data: XOR<UserHasRoleUpdateWithoutUserInput, UserHasRoleUncheckedUpdateWithoutUserInput>
  }

  export type UserHasRoleUpdateManyWithWhereWithoutUserInput = {
    where: UserHasRoleScalarWhereInput
    data: XOR<UserHasRoleUpdateManyMutationInput, UserHasRoleUncheckedUpdateManyWithoutUserInput>
  }

  export type UserHasRoleScalarWhereInput = {
    AND?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
    OR?: UserHasRoleScalarWhereInput[]
    NOT?: UserHasRoleScalarWhereInput | UserHasRoleScalarWhereInput[]
    userId?: StringFilter<"UserHasRole"> | string
    roleId?: StringFilter<"UserHasRole"> | string
  }

  export type UserHasRoleCreateWithoutRoleInput = {
    user: UserCreateNestedOneWithoutRolesInput
  }

  export type UserHasRoleUncheckedCreateWithoutRoleInput = {
    userId: string
  }

  export type UserHasRoleCreateOrConnectWithoutRoleInput = {
    where: UserHasRoleWhereUniqueInput
    create: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserHasRoleCreateManyRoleInputEnvelope = {
    data: UserHasRoleCreateManyRoleInput | UserHasRoleCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type RoleHasPermissionCreateWithoutRoleInput = {
    permission: PermissionCreateNestedOneWithoutRolesInput
  }

  export type RoleHasPermissionUncheckedCreateWithoutRoleInput = {
    permissionId: string
  }

  export type RoleHasPermissionCreateOrConnectWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    create: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput>
  }

  export type RoleHasPermissionCreateManyRoleInputEnvelope = {
    data: RoleHasPermissionCreateManyRoleInput | RoleHasPermissionCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserHasRoleUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserHasRoleWhereUniqueInput
    update: XOR<UserHasRoleUpdateWithoutRoleInput, UserHasRoleUncheckedUpdateWithoutRoleInput>
    create: XOR<UserHasRoleCreateWithoutRoleInput, UserHasRoleUncheckedCreateWithoutRoleInput>
  }

  export type UserHasRoleUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserHasRoleWhereUniqueInput
    data: XOR<UserHasRoleUpdateWithoutRoleInput, UserHasRoleUncheckedUpdateWithoutRoleInput>
  }

  export type UserHasRoleUpdateManyWithWhereWithoutRoleInput = {
    where: UserHasRoleScalarWhereInput
    data: XOR<UserHasRoleUpdateManyMutationInput, UserHasRoleUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleHasPermissionUpsertWithWhereUniqueWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    update: XOR<RoleHasPermissionUpdateWithoutRoleInput, RoleHasPermissionUncheckedUpdateWithoutRoleInput>
    create: XOR<RoleHasPermissionCreateWithoutRoleInput, RoleHasPermissionUncheckedCreateWithoutRoleInput>
  }

  export type RoleHasPermissionUpdateWithWhereUniqueWithoutRoleInput = {
    where: RoleHasPermissionWhereUniqueInput
    data: XOR<RoleHasPermissionUpdateWithoutRoleInput, RoleHasPermissionUncheckedUpdateWithoutRoleInput>
  }

  export type RoleHasPermissionUpdateManyWithWhereWithoutRoleInput = {
    where: RoleHasPermissionScalarWhereInput
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyWithoutRoleInput>
  }

  export type RoleHasPermissionScalarWhereInput = {
    AND?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
    OR?: RoleHasPermissionScalarWhereInput[]
    NOT?: RoleHasPermissionScalarWhereInput | RoleHasPermissionScalarWhereInput[]
    roleId?: StringFilter<"RoleHasPermission"> | string
    permissionId?: StringFilter<"RoleHasPermission"> | string
  }

  export type RoleHasPermissionCreateWithoutPermissionInput = {
    role: RoleCreateNestedOneWithoutPermissionsInput
  }

  export type RoleHasPermissionUncheckedCreateWithoutPermissionInput = {
    roleId: string
  }

  export type RoleHasPermissionCreateOrConnectWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    create: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RoleHasPermissionCreateManyPermissionInputEnvelope = {
    data: RoleHasPermissionCreateManyPermissionInput | RoleHasPermissionCreateManyPermissionInput[]
    skipDuplicates?: boolean
  }

  export type RoleHasPermissionUpsertWithWhereUniqueWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    update: XOR<RoleHasPermissionUpdateWithoutPermissionInput, RoleHasPermissionUncheckedUpdateWithoutPermissionInput>
    create: XOR<RoleHasPermissionCreateWithoutPermissionInput, RoleHasPermissionUncheckedCreateWithoutPermissionInput>
  }

  export type RoleHasPermissionUpdateWithWhereUniqueWithoutPermissionInput = {
    where: RoleHasPermissionWhereUniqueInput
    data: XOR<RoleHasPermissionUpdateWithoutPermissionInput, RoleHasPermissionUncheckedUpdateWithoutPermissionInput>
  }

  export type RoleHasPermissionUpdateManyWithWhereWithoutPermissionInput = {
    where: RoleHasPermissionScalarWhereInput
    data: XOR<RoleHasPermissionUpdateManyMutationInput, RoleHasPermissionUncheckedUpdateManyWithoutPermissionInput>
  }

  export type UserCreateWithoutRolesInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutRolesInput = {
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutRolesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: RoleHasPermissionCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: RoleHasPermissionUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutRolesInput = {
    update: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
    create: XOR<UserCreateWithoutRolesInput, UserUncheckedCreateWithoutRolesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRolesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRolesInput, UserUncheckedUpdateWithoutRolesInput>
  }

  export type UserUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RoleHasPermissionUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: RoleHasPermissionUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserHasRoleCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserHasRoleUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type PermissionCreateWithoutRolesInput = {
    id?: string
    name: string
    description: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    description: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type RoleUpsertWithoutPermissionsInput = {
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserHasRoleUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserHasRoleUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type PermissionUpsertWithoutRolesInput = {
    update: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
    where?: PermissionWhereInput
  }

  export type PermissionUpdateToOneWithWhereWithoutRolesInput = {
    where?: PermissionWhereInput
    data: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateWithoutSourceInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    createdAt?: Date | string
    rewrittenArticle?: RewrittenArticleCreateNestedOneWithoutOriginalArticleInput
  }

  export type ArticleUncheckedCreateWithoutSourceInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    createdAt?: Date | string
    rewrittenArticle?: RewrittenArticleUncheckedCreateNestedOneWithoutOriginalArticleInput
  }

  export type ArticleCreateOrConnectWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput>
  }

  export type ArticleCreateManySourceInputEnvelope = {
    data: ArticleCreateManySourceInput | ArticleCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type ExploredUrlCreateWithoutSourceInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExploredUrlUncheckedCreateWithoutSourceInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExploredUrlCreateOrConnectWithoutSourceInput = {
    where: ExploredUrlWhereUniqueInput
    create: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput>
  }

  export type ExploredUrlCreateManySourceInputEnvelope = {
    data: ExploredUrlCreateManySourceInput | ExploredUrlCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type ArticleUpsertWithWhereUniqueWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutSourceInput, ArticleUncheckedUpdateWithoutSourceInput>
    create: XOR<ArticleCreateWithoutSourceInput, ArticleUncheckedCreateWithoutSourceInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutSourceInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutSourceInput, ArticleUncheckedUpdateWithoutSourceInput>
  }

  export type ArticleUpdateManyWithWhereWithoutSourceInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutSourceInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: StringFilter<"Article"> | string
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    url?: StringFilter<"Article"> | string
    author?: StringNullableFilter<"Article"> | string | null
    publishedAt?: DateTimeNullableFilter<"Article"> | Date | string | null
    fetchedAt?: DateTimeFilter<"Article"> | Date | string
    status?: EnumArticleStatusFilter<"Article"> | $Enums.ArticleStatus
    errorMessage?: StringNullableFilter<"Article"> | string | null
    sourceId?: StringFilter<"Article"> | string
    createdAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type ExploredUrlUpsertWithWhereUniqueWithoutSourceInput = {
    where: ExploredUrlWhereUniqueInput
    update: XOR<ExploredUrlUpdateWithoutSourceInput, ExploredUrlUncheckedUpdateWithoutSourceInput>
    create: XOR<ExploredUrlCreateWithoutSourceInput, ExploredUrlUncheckedCreateWithoutSourceInput>
  }

  export type ExploredUrlUpdateWithWhereUniqueWithoutSourceInput = {
    where: ExploredUrlWhereUniqueInput
    data: XOR<ExploredUrlUpdateWithoutSourceInput, ExploredUrlUncheckedUpdateWithoutSourceInput>
  }

  export type ExploredUrlUpdateManyWithWhereWithoutSourceInput = {
    where: ExploredUrlScalarWhereInput
    data: XOR<ExploredUrlUpdateManyMutationInput, ExploredUrlUncheckedUpdateManyWithoutSourceInput>
  }

  export type ExploredUrlScalarWhereInput = {
    AND?: ExploredUrlScalarWhereInput | ExploredUrlScalarWhereInput[]
    OR?: ExploredUrlScalarWhereInput[]
    NOT?: ExploredUrlScalarWhereInput | ExploredUrlScalarWhereInput[]
    id?: StringFilter<"ExploredUrl"> | string
    url?: StringFilter<"ExploredUrl"> | string
    title?: StringNullableFilter<"ExploredUrl"> | string | null
    depth?: IntFilter<"ExploredUrl"> | number
    status?: EnumExploredUrlStatusFilter<"ExploredUrl"> | $Enums.ExploredUrlStatus
    errorMessage?: StringNullableFilter<"ExploredUrl"> | string | null
    parentUrl?: StringNullableFilter<"ExploredUrl"> | string | null
    sourceId?: StringFilter<"ExploredUrl"> | string
    createdAt?: DateTimeFilter<"ExploredUrl"> | Date | string
    updatedAt?: DateTimeFilter<"ExploredUrl"> | Date | string
  }

  export type RewrittenArticleCreateWithoutSystemPromptInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticle: ArticleCreateNestedOneWithoutRewrittenArticleInput
  }

  export type RewrittenArticleUncheckedCreateWithoutSystemPromptInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticleId: string
  }

  export type RewrittenArticleCreateOrConnectWithoutSystemPromptInput = {
    where: RewrittenArticleWhereUniqueInput
    create: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput>
  }

  export type RewrittenArticleCreateManySystemPromptInputEnvelope = {
    data: RewrittenArticleCreateManySystemPromptInput | RewrittenArticleCreateManySystemPromptInput[]
    skipDuplicates?: boolean
  }

  export type RewrittenArticleUpsertWithWhereUniqueWithoutSystemPromptInput = {
    where: RewrittenArticleWhereUniqueInput
    update: XOR<RewrittenArticleUpdateWithoutSystemPromptInput, RewrittenArticleUncheckedUpdateWithoutSystemPromptInput>
    create: XOR<RewrittenArticleCreateWithoutSystemPromptInput, RewrittenArticleUncheckedCreateWithoutSystemPromptInput>
  }

  export type RewrittenArticleUpdateWithWhereUniqueWithoutSystemPromptInput = {
    where: RewrittenArticleWhereUniqueInput
    data: XOR<RewrittenArticleUpdateWithoutSystemPromptInput, RewrittenArticleUncheckedUpdateWithoutSystemPromptInput>
  }

  export type RewrittenArticleUpdateManyWithWhereWithoutSystemPromptInput = {
    where: RewrittenArticleScalarWhereInput
    data: XOR<RewrittenArticleUpdateManyMutationInput, RewrittenArticleUncheckedUpdateManyWithoutSystemPromptInput>
  }

  export type RewrittenArticleScalarWhereInput = {
    AND?: RewrittenArticleScalarWhereInput | RewrittenArticleScalarWhereInput[]
    OR?: RewrittenArticleScalarWhereInput[]
    NOT?: RewrittenArticleScalarWhereInput | RewrittenArticleScalarWhereInput[]
    id?: StringFilter<"RewrittenArticle"> | string
    title?: StringFilter<"RewrittenArticle"> | string
    content?: StringFilter<"RewrittenArticle"> | string
    llmModel?: StringFilter<"RewrittenArticle"> | string
    tokensUsed?: IntNullableFilter<"RewrittenArticle"> | number | null
    processingTime?: IntNullableFilter<"RewrittenArticle"> | number | null
    createdAt?: DateTimeFilter<"RewrittenArticle"> | Date | string
    originalArticleId?: StringFilter<"RewrittenArticle"> | string
    systemPromptId?: StringFilter<"RewrittenArticle"> | string
  }

  export type SourceCreateWithoutArticlesInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exploredUrls?: ExploredUrlCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateWithoutArticlesInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    exploredUrls?: ExploredUrlUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceCreateOrConnectWithoutArticlesInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
  }

  export type RewrittenArticleCreateWithoutOriginalArticleInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    systemPrompt: SystemPromptCreateNestedOneWithoutRewrittenArticlesInput
  }

  export type RewrittenArticleUncheckedCreateWithoutOriginalArticleInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    systemPromptId: string
  }

  export type RewrittenArticleCreateOrConnectWithoutOriginalArticleInput = {
    where: RewrittenArticleWhereUniqueInput
    create: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
  }

  export type SourceUpsertWithoutArticlesInput = {
    update: XOR<SourceUpdateWithoutArticlesInput, SourceUncheckedUpdateWithoutArticlesInput>
    create: XOR<SourceCreateWithoutArticlesInput, SourceUncheckedCreateWithoutArticlesInput>
    where?: SourceWhereInput
  }

  export type SourceUpdateToOneWithWhereWithoutArticlesInput = {
    where?: SourceWhereInput
    data: XOR<SourceUpdateWithoutArticlesInput, SourceUncheckedUpdateWithoutArticlesInput>
  }

  export type SourceUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exploredUrls?: ExploredUrlUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateWithoutArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    exploredUrls?: ExploredUrlUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type RewrittenArticleUpsertWithoutOriginalArticleInput = {
    update: XOR<RewrittenArticleUpdateWithoutOriginalArticleInput, RewrittenArticleUncheckedUpdateWithoutOriginalArticleInput>
    create: XOR<RewrittenArticleCreateWithoutOriginalArticleInput, RewrittenArticleUncheckedCreateWithoutOriginalArticleInput>
    where?: RewrittenArticleWhereInput
  }

  export type RewrittenArticleUpdateToOneWithWhereWithoutOriginalArticleInput = {
    where?: RewrittenArticleWhereInput
    data: XOR<RewrittenArticleUpdateWithoutOriginalArticleInput, RewrittenArticleUncheckedUpdateWithoutOriginalArticleInput>
  }

  export type RewrittenArticleUpdateWithoutOriginalArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    systemPrompt?: SystemPromptUpdateOneRequiredWithoutRewrittenArticlesNestedInput
  }

  export type RewrittenArticleUncheckedUpdateWithoutOriginalArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    systemPromptId?: StringFieldUpdateOperationsInput | string
  }

  export type SourceCreateWithoutExploredUrlsInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutSourceInput
  }

  export type SourceUncheckedCreateWithoutExploredUrlsInput = {
    id?: string
    name: string
    url: string
    type?: $Enums.SourceType
    isActive?: boolean
    parserKey?: string | null
    requestDelayMs?: number
    lastFetched?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutSourceInput
  }

  export type SourceCreateOrConnectWithoutExploredUrlsInput = {
    where: SourceWhereUniqueInput
    create: XOR<SourceCreateWithoutExploredUrlsInput, SourceUncheckedCreateWithoutExploredUrlsInput>
  }

  export type SourceUpsertWithoutExploredUrlsInput = {
    update: XOR<SourceUpdateWithoutExploredUrlsInput, SourceUncheckedUpdateWithoutExploredUrlsInput>
    create: XOR<SourceCreateWithoutExploredUrlsInput, SourceUncheckedCreateWithoutExploredUrlsInput>
    where?: SourceWhereInput
  }

  export type SourceUpdateToOneWithWhereWithoutExploredUrlsInput = {
    where?: SourceWhereInput
    data: XOR<SourceUpdateWithoutExploredUrlsInput, SourceUncheckedUpdateWithoutExploredUrlsInput>
  }

  export type SourceUpdateWithoutExploredUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutSourceNestedInput
  }

  export type SourceUncheckedUpdateWithoutExploredUrlsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    type?: EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType
    isActive?: BoolFieldUpdateOperationsInput | boolean
    parserKey?: NullableStringFieldUpdateOperationsInput | string | null
    requestDelayMs?: IntFieldUpdateOperationsInput | number
    lastFetched?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type ArticleCreateWithoutRewrittenArticleInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    createdAt?: Date | string
    source: SourceCreateNestedOneWithoutArticlesInput
  }

  export type ArticleUncheckedCreateWithoutRewrittenArticleInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    sourceId: string
    createdAt?: Date | string
  }

  export type ArticleCreateOrConnectWithoutRewrittenArticleInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutRewrittenArticleInput, ArticleUncheckedCreateWithoutRewrittenArticleInput>
  }

  export type SystemPromptCreateWithoutRewrittenArticlesInput = {
    id?: string
    name: string
    content: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptUncheckedCreateWithoutRewrittenArticlesInput = {
    id?: string
    name: string
    content: string
    description?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemPromptCreateOrConnectWithoutRewrittenArticlesInput = {
    where: SystemPromptWhereUniqueInput
    create: XOR<SystemPromptCreateWithoutRewrittenArticlesInput, SystemPromptUncheckedCreateWithoutRewrittenArticlesInput>
  }

  export type ArticleUpsertWithoutRewrittenArticleInput = {
    update: XOR<ArticleUpdateWithoutRewrittenArticleInput, ArticleUncheckedUpdateWithoutRewrittenArticleInput>
    create: XOR<ArticleCreateWithoutRewrittenArticleInput, ArticleUncheckedCreateWithoutRewrittenArticleInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutRewrittenArticleInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutRewrittenArticleInput, ArticleUncheckedUpdateWithoutRewrittenArticleInput>
  }

  export type ArticleUpdateWithoutRewrittenArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: SourceUpdateOneRequiredWithoutArticlesNestedInput
  }

  export type ArticleUncheckedUpdateWithoutRewrittenArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    sourceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptUpsertWithoutRewrittenArticlesInput = {
    update: XOR<SystemPromptUpdateWithoutRewrittenArticlesInput, SystemPromptUncheckedUpdateWithoutRewrittenArticlesInput>
    create: XOR<SystemPromptCreateWithoutRewrittenArticlesInput, SystemPromptUncheckedCreateWithoutRewrittenArticlesInput>
    where?: SystemPromptWhereInput
  }

  export type SystemPromptUpdateToOneWithWhereWithoutRewrittenArticlesInput = {
    where?: SystemPromptWhereInput
    data: XOR<SystemPromptUpdateWithoutRewrittenArticlesInput, SystemPromptUncheckedUpdateWithoutRewrittenArticlesInput>
  }

  export type SystemPromptUpdateWithoutRewrittenArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemPromptUncheckedUpdateWithoutRewrittenArticlesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserHasRoleCreateManyUserInput = {
    roleId: string
  }

  export type UserHasRoleUpdateWithoutUserInput = {
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserHasRoleUncheckedUpdateWithoutUserInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserHasRoleUncheckedUpdateManyWithoutUserInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type UserHasRoleCreateManyRoleInput = {
    userId: string
  }

  export type RoleHasPermissionCreateManyRoleInput = {
    permissionId: string
  }

  export type UserHasRoleUpdateWithoutRoleInput = {
    user?: UserUpdateOneRequiredWithoutRolesNestedInput
  }

  export type UserHasRoleUncheckedUpdateWithoutRoleInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserHasRoleUncheckedUpdateManyWithoutRoleInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionUpdateWithoutRoleInput = {
    permission?: PermissionUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutRoleInput = {
    permissionId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionCreateManyPermissionInput = {
    roleId: string
  }

  export type RoleHasPermissionUpdateWithoutPermissionInput = {
    role?: RoleUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type RoleHasPermissionUncheckedUpdateWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type RoleHasPermissionUncheckedUpdateManyWithoutPermissionInput = {
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type ArticleCreateManySourceInput = {
    id?: string
    title: string
    content: string
    url: string
    author?: string | null
    publishedAt?: Date | string | null
    fetchedAt?: Date | string
    status?: $Enums.ArticleStatus
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type ExploredUrlCreateManySourceInput = {
    id?: string
    url: string
    title?: string | null
    depth?: number
    status?: $Enums.ExploredUrlStatus
    errorMessage?: string | null
    parentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrittenArticle?: RewrittenArticleUpdateOneWithoutOriginalArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rewrittenArticle?: RewrittenArticleUncheckedUpdateOneWithoutOriginalArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    author?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumArticleStatusFieldUpdateOperationsInput | $Enums.ArticleStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExploredUrlUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    status?: EnumExploredUrlStatusFieldUpdateOperationsInput | $Enums.ExploredUrlStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    parentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RewrittenArticleCreateManySystemPromptInput = {
    id?: string
    title: string
    content: string
    llmModel: string
    tokensUsed?: number | null
    processingTime?: number | null
    createdAt?: Date | string
    originalArticleId: string
  }

  export type RewrittenArticleUpdateWithoutSystemPromptInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticle?: ArticleUpdateOneRequiredWithoutRewrittenArticleNestedInput
  }

  export type RewrittenArticleUncheckedUpdateWithoutSystemPromptInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticleId?: StringFieldUpdateOperationsInput | string
  }

  export type RewrittenArticleUncheckedUpdateManyWithoutSystemPromptInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    llmModel?: StringFieldUpdateOperationsInput | string
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    processingTime?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalArticleId?: StringFieldUpdateOperationsInput | string
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