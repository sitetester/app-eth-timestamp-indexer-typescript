const dbConfig = {
  client: 'sqlite3',
  connection: {filename: './db/blocks.db'},
  migrations: {tableName: 'migrations'},
  useNullAsDefault: true,
};

export = dbConfig;