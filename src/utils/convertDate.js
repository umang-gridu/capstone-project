import moment from "moment";

function convertDate(date) {
  return moment.utc(date, "YYYY-MM-DD").toDate();
}

export default convertDate;
