import moment from "moment";

const getRelativeTime = (time, verbose = false) => {
  if (!verbose) {
    moment.updateLocale("en", {
      relativeTime : {
          future: "in %s",
          past: "%s",
          s:  "%ds",
          m:  "1m",
          mm: "%dm",
          h:  "1h",
          hh: "%dh",
          d:  "1d",
          dd: "%dd",
          M:  "1mo",
          MM: "%dmo",
          y:  "1y",
          yy: "%dy"
      }
    });
  }

  return moment(time).fromNow();
}

export default getRelativeTime;
