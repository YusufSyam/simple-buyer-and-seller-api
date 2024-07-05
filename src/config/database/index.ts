import { DBConfig } from "./DBConfig";

import { prismaDb } from "./PrismaORMDBConfig";

function connectDatabase() {
  prismaDb.load();
}

export default connectDatabase;
