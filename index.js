const { program } = require('commander');
const { generateModule } = require('./generate');

program
  .version('1.0.0')
  .description('NestJS Module Generator');

program
  .command('generate <name>')
  .description('Generate a new module with controllers, services, etc.')
  .action((name) => {
    generateModule(name);
  });

program.parse(process.argv);
