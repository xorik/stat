export default function(mins) {
  let negative = false;
  if (mins < 0) {
    negative = true;
    mins = -mins;
  }

  let hours = Math.floor(mins / 60);
  mins -= hours * 60;
  mins = mins > 9 ? mins : `0${mins}`;

  let sign = negative ? "-" : "";

  return `${sign}${hours}:${mins}`;
}
