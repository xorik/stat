import moment from "moment/moment";

class TimeCalc {
  getProgress(planed, done, workingHours) {
    let dailyStat = [];
    let totalDone = 0.0;
    let plannedByNow = 0.0;

    let now = moment();

    let dayStart = moment()
      .utc()
      .startOf("isoWeek");
    let dayEnd = moment(dayStart).add(1, "d");

    // Calculate worked hours and percentage by day
    for (let i = 0; i < 7; i++) {
      totalDone += done[i];

      // Day is ended
      if (now.isAfter(dayEnd)) {
        dailyStat[i] = planed[i] > 0 ? done[i] / planed[i] : null;
        plannedByNow += planed[i];
      } else if (now.isBefore(dayStart)) {
        // Day isn't started
        dailyStat[i] = null;
      } else {
        // Today
        let workStart = moment(dayStart)
          .local()
          .hour(workingHours[0]);
        let workEnd = moment(dayStart)
          .local()
          .hour(workingHours[1]);

        // Working time is not started yet or planned day off
        if (now.isBefore(workStart) || planed[i] === 0) {
          dailyStat[i] = null;
        } else if (now.isAfter(workEnd)) {
          // Working time is end
          dailyStat[i] = planed[i] > 0 ? done[i] / planed[i] : null;
          plannedByNow += planed[i];
        } else {
          // Working hours is now
          let percent = now.diff(workStart) / workEnd.diff(workStart);
          dailyStat[i] = done[i] / (planed[i] * percent);
          plannedByNow += planed[i] * percent;
        }
      }

      // Goto next day
      dayStart.add(1, "d");
      dayEnd.add(1, "d");
    }

    let totalStat = plannedByNow > 0 ? totalDone / plannedByNow : 0;

    return {
      dailyStat,
      totalStat
    };
  }
}

export default new TimeCalc();
