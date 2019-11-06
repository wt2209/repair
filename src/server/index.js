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
export function fetchList(options, pagination) {
  console.log(options, pagination);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: "ok",
        list: fakerList,
        pagination: {
          current: 1,
          total: 101,
          pageSize: 10
        }
      });
    }, 1000);
  });
}

export function deleteOne(record) {
  console.log(record);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(record);
    }, 1000);
  });
}
