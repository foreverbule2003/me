const readline = require("readline");

const inputs = ["2026", "okinawa", "沖繩", "大云永續極境出發"];
let i = 0;

readline.createInterface = function (options) {
  return {
    question: (query, cb) => {
      console.log(query + inputs[i]);
      cb(inputs[i++]);
    },
    close: () => {},
  };
};

require("./tools/new-trip.js");
