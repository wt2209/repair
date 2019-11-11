function generateSerial() {
  const date = new Date();
  const dateStr =
    "" + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
  return dateStr + "111";
}

const tableName = "records";
var knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite"
  },
  useNullAsDefault: true
});
knex.schema.hasTable(tableName).then(function(exists) {
  if (!exists) {
    knex.schema
      .createTable(tableName, function(table) {
        table.increments("id");
        table.string("serialNumber");
        table.string("name");
        table.string("location");
        table.string("content");
        table.string("company");
        table.string("phone");
        table.string("serviceContent");
        table.string("material");
        table.string("repairer");
        table.string("timely");
        table.string("attitude");
        table.string("clean");
        table.string("satisfaction");
        table.dateTime("createTime");
        table.dateTime("appointmentTime");
        table.dateTime("completeTime");
        table.string("printed").defaultTo("no");
        table.timestamps();
      })
      .then(s => {
        console.log(s);
      });
  }
});

function createBuilder(options) {
  const builder = knex.from(tableName);
  if (options.location) {
    builder.where("location", "like", `%${options.location}%`);
  }
  if (options.serialNumber) {
    builder.where("serialNumber", options.serialNumber);
  }
  if (options.createRange && options.createRange.length > 0) {
    builder.whereBetween("createTime", options.createRange);
  }
  Object.keys(options.ins || {}).map(key => {
    const item = options.ins[key];
    if (item && item.length > 0) {
      builder.whereIn(key, item);
    }
    return key;
  });
  return builder;
}

/**
 * @apiParamExample  {json} Request-Example:
 * {
 *     location : 1-1202,
 *     serialNumber: 20191103001,
 *     createRange: ['2019-11-1', '2019-11-30'],
 *     ins:{
 *         attitude: ['very', 'bad'],
 *         printed: ['yes', 'no']
 *     }
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     status : 'ok',
 *     list: [],
 *     pagination: {
 *         current: 1,
 *         pageSize: 10,
 *         total: 100
 *     }
 * }
 */
async function fetchList(options, pagination) {
  const pageSize = pagination.pageSize || 10;
  const current = pagination.current || 1;
  const offset = (current - 1) * pageSize;

  const total = await createBuilder(options)
    .count("* as total")
    .then(result => result[0].total);

  const rows = await createBuilder(options)
    .select("*")
    .orderBy("id", "desc")
    .limit(pageSize)
    .offset(offset);

  return {
    status: "ok",
    list: rows,
    pagination: {
      current,
      pageSize,
      total
    }
  };
}

async function print(record) {
  await knex(tableName)
    .where("id", record.id)
    .update({ printed: "yes" });
}
function deleteOne(record) {
  return knex(tableName)
    .where("id", record.id)
    .del();
}

async function store(record) {
  record.serialNumber = generateSerial();
  var newRecord = record;

  // 返回的是一个promise
  const id = await knex(tableName).insert(record);
  newRecord.id = id[0];
  return newRecord;
}

/**
 * 开始注册事件
 */
const { ipcMain } = require("electron");

ipcMain.handle("store", async (event, record) => {
  const newRecord = await store(record);
  return newRecord;
});

ipcMain.handle("print", async (event, record) => {
  await print(record);
  return record;
});

ipcMain.handle("fetchList", async (event, options, pagination) => {
  const result = await fetchList(options, pagination);
  return result;
});

ipcMain.handle("delete", async (event, record) => {
  await deleteOne(record);
  return record;
});
