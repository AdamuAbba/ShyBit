import ora from "ora";

const spinner = {
  start: () => ora("please wait").start(),
  stop: () => ora().stop(),
  succeed: () => ora("success").succeed(),
  warn: () => ora("error fetching data").warn(),
};

export default spinner;
