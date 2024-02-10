import chalk from "chalk";

const logger = {
  success: (value: string) => console.log(chalk.green(value)),
  warning: (value: string) => console.log(chalk.yellow(value)),
  error: (value: string) => console.log(chalk.red(value)),
};

export default logger;
