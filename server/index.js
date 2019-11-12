const { ipcMain } = require("electron");
const moment = require("moment");
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
        table.integer("subSerial").defaultTo(1); // 每日报修的子序列号
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

function generateSerial(next) {
  return moment().format("YYYYMMDD") + next.toString().padStart(3, "0");
}

async function getMaxSubSerial() {
  const today = moment();
  const tomorrow = moment().add(1, "day");
  const result = await knex(tableName)
    .whereBetween("created_at", [
      today.format("YYYY-MM-DD"),
      tomorrow.format("YYYY-MM-DD")
    ])
    .max("subSerial as max");
  return result[0].max;
}

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

async function fetchAll(options) {
  const rows = await createBuilder(options)
    .select("*")
    .orderBy("id", "desc");
  return rows;
}

function print(record) {
  return knex(tableName)
    .where("id", record.id)
    .update({ printed: "yes" });
}

function deleteOne(record) {
  return knex(tableName)
    .where("id", record.id)
    .del();
}

async function store(record) {
  const max = await getMaxSubSerial();
  const next = max ? max + 1 : 1;
  record.serialNumber = generateSerial(next);
  record.subSerial = next;
  record.created_at = record.updated_at = moment().format(
    "YYYY-MM-DD HH:mm:ss"
  );
  var newRecord = record;

  // 返回的是一个promise
  const id = await knex(tableName).insert(record);
  newRecord.id = id[0];
  return newRecord;
}

async function update(record) {
  record.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  // 返回的是一个promise
  await knex(tableName)
    .where("id", record.id)
    .update(record);
}

ipcMain.handle("store", async (event, record) => {
  const newRecord = await store(record);
  return newRecord;
});

ipcMain.handle("update", async (event, record) => {
  await update(record);
  return record;
});

ipcMain.handle("print", async (event, record) => {
  await print(record);
  return record;
});

ipcMain.handle("fetchList", async (event, options, pagination) => {
  const result = await fetchList(options, pagination);
  return result;
});

ipcMain.handle("export", async (event, options) => {
  const records = await fetchAll(options);
  const yesOrNo = {
    yes: "是",
    no: "否"
  };
  const attitudes = {
    good: "好",
    general: "一般",
    bad: "差"
  };
  const satisfactions = {
    good: "满意",
    very: "非常满意",
    bad: "不满意"
  };
  const exports = records.map(record => {
    return {
      报修单位: record.company,
      报修人: record.name,
      报修地点: record.location,
      联系电话: record.phone,
      受理内容: record.content,
      预约时间: record.appointmentTime,
      完成时间: record.completeTime,
      服务内容: record.serviceContent,
      完工签字: record.repairer,
      使用材料: record.material,
      是否准时: record.timely ? yesOrNo[record.timely] : "",
      态度: record.attitude ? attitudes[record.attitude] : "",
      打扫现场: record.clean ? yesOrNo[record.timely] : "",
      满意度: record.satisfaction ? satisfactions[record.satisfaction] : ""
    };
  });
  const xlsx = require("xlsx");
  const fs = require("fs");

  const ws = xlsx.utils.json_to_sheet(exports, { header: ["报修单位"] });
  const workBook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workBook, ws);
  const result = xlsx.write(workBook, {
    bookType: "xlsx", // 输出的文件类型
    type: "buffer", // 输出的数据类型
    compression: true // 开启zip压缩
  });
  fs.writeFile("./hello.xlsx", result, err => {
    console.log(err);
  });
  return "ok";
});

ipcMain.handle("delete", async (event, record) => {
  await deleteOne(record);
  return record;
});
