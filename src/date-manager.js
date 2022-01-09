import { formatDistanceToNowStrict, isPast, format } from "date-fns";

function isExpired(date) {
  return isPast(new Date(date));
}

function getTimeLeft(date) {
  return formatDistanceToNowStrict(new Date(date));
}

function formatDate(date) {
  return format(new Date(date), "dd/MM/yyyy");
}

export { isExpired, getTimeLeft, formatDate };
