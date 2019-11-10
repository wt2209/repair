const fakerList = [
  {
    serialNumber: "20191101001222",
    name: "zhangsan",
    company: "asdfhjasdflh",
    location: "1-1021",
    phone: "13333333333",
    content: "asdfhjkasdifgjklsadf",
    serviceContent: "asfdasd",
    material: "asdfasdfsadfasdfasd",
    appointmentTime: "2019-11-1",
    createTime: "2019-11-01 12:30:09",
    completeTime: "2019-11-2",
    repairer: "zasdf",
    timely: "yes", // yes no
    attitude: "good", // good general bad
    clean: "yes",
    satisfaction: "good" // very good bad
  },
  {
    serialNumber: "20191101001233",
    name: "zhangsan",
    company: "asdfhjasdflh",
    location: "1-1021",
    phone: "13333333333",
    content: "asdfhjkasdifgjklsadf",
    serviceContent: "asfdasd",
    material: "asdfasdfsadfasdfasd",
    appointmentTime: "2019-11-1",
    createTime: "2019-11-01 12:30:09",
    completeTime: "2019-11-2",
    repairer: "zasdf",
    timely: "no", // yes no
    attitude: "bad", // good general bad
    clean: "yes",
    satisfaction: "good" // very good bad
  }
];

function generateSerial() {
  return "123";
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
        table.timestamps();
      })
      .then(s => {
        console.log(s);
      });
  }
});

/**
 *
 * @api {get} /records get list
 * @apiName getList
 * @apiGroup records
 * @apiVersion  major.minor.patch
 *
 *
 * @apiParam  {String} location 报修地点
 * @apiParam  {String} serialNumber 报修地点
 * @apiParam  {Array} createRange 受理时间，格式：[开始日， 结束日]
 * @apiParam  {Array} attitude 态度，格式 ['very', 'good', 'bad']
 * @apiParam  {Array} printed 是否已打印，格式 ['yes', 'no']
 *
 * @apiSuccess (200) {json} result 返回值
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *     location : 1-1202,
 *     serialNumber: 20191103001,
 *     createRange: ['2019-11-1', '2019-11-30'],
 *     attitude: ['very', 'bad'],
 *     printed: ['yes', 'no']
 * }
 *
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
 *
 *
 */
function fetchList(options, pagination) {
  console.log(options, pagination);
  return knex
    .select("*")
    .from(tableName)
    .then(function(rows) {
      return {
        status: "ok",
        list: rows,
        pagination: {
          current: 1,
          total: 101,
          pageSize: 10
        }
      };
    });
}

function deleteOne(record) {
  return knex(tableName)
    .where("id", record.id)
    .del();
}

function store(record) {
  record.serialNumber = generateSerial();
  var newRecord = record;

  // 返回的是一个promise
  return knex(tableName)
    .insert(record)
    .then(id => {
      newRecord.id = id[0];
      return newRecord;
    });
}

const { ipcMain } = require("electron");

ipcMain.handle("store", async (event, record) => {
  const newRecord = await store(record);
  return newRecord;
});

ipcMain.handle("fetchList", async (event, options, pagination) => {
  const result = await fetchList(options, pagination);
  return result;
});

ipcMain.handle("delete", async (event, record) => {
  await deleteOne(record);
  return record;
});
