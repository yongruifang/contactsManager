import { StringOrNull } from '@/Types';
//创建接口，用来添加ITable公开的信息
//流畅接口的思想：将方法连接起来，易读性更高
//这个接口是流畅的，因为都返回ITableBuilder，允许我们将方法连接起来
export interface ITableBuilder {
    WithDatabase(databaseName: string): ITableBuilder;
    WithVersion(version: number): ITableBuilder;
    WithTableName(tableName: string): ITableBuilder;
    WithPrimaryField(primaryField: string): ITableBuilder;
    WithIndexName(indexName: string): ITableBuilder;
}

/**
 * 任务：从生成器中获取值，生成IndexedDB数据库
 */
export interface ITable {
    Database(): string;
    Version(): number;
    TableName(): string;
    IndexName(): string;
    Build(database: IDBDatabase): void;
}

export class TableBuilder implements ITableBuilder, ITable {
    private database: StringOrNull;
    private tableName: StringOrNull;
    private primaryField: StringOrNull;
    private indexName: StringOrNull;
    private version: number = 1;

    public WithDatabase(databaseName: string): ITableBuilder {
        this.database = databaseName;
        return this;
    }

    public WithVersion(versionNumber: number): ITableBuilder {
        this.version = versionNumber;
        return this;
    }

    public WithTableName(tableName: string): ITableBuilder {
        this.tableName = tableName;
        return this;
    }

    public WithPrimaryField(primaryField: string): ITableBuilder {
        this.primaryField = primaryField;
        return this;
    }

    public WithIndexName(indexName: string): ITableBuilder {
        this.indexName = indexName;
        return this;
    }

    public Database(): string {
        if (!this.database) {
            throw new Error("You must give a database name");
        }
        return this.database;
    }

    public Version(): number {
        return this.version;
    }

    public TableName(): string {
        if (!this.tableName) {
            throw new Error("You must give a table name");
        }
        return this.tableName;
    }

    public IndexName(): string {
        if (!this.indexName) {
            throw new Error("You must specify an index name");
        }
        return this.indexName;
    }

    /**
     * 在Build方法中，使用底层的IndexedDB API来创建数据库
     * IDBDatabase用于表示数据库连接
     * 当我们开始编写核心数据库功能时会获取这个连接
     * 设置keypath为对象存储提供一个可以搜索的字段
     */
    public Build(database: IDBDatabase): void {
        if (!this.tableName) {
            throw new Error("You must specify the table name");
        }
        if (!this.primaryField) {
            throw new Error("You must specify a primary field");
        }
        if (!this.indexName) {
            throw new Error("You must specify the index name")
        }

        const parameters: IDBObjectStoreParameters = { keyPath: this.primaryField };
        const objectStore = database.createObjectStore(this.tableName, parameters);
        objectStore!.createIndex(this.indexName, this.primaryField);
    }
}