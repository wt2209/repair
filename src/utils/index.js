export function formatRecordDate(record) {
  let newRecord = {};
  Object.keys(record).map(key => {
    // moment
    if (typeof record[key] === "object") {
      if (key === "createTime") {
        newRecord[key] = record[key].format("YYYY-MM-DD HH:mm");
      } else {
        newRecord[key] = record[key].format("MM-DD HH:mm");
      }
    } else {
      newRecord[key] = record[key];
    }
  });
  return newRecord;
}
