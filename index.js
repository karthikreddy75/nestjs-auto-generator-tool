const { program } = require('commander');
const { generateModule } = require('./generate');

program
  .version('1.0.0')
  .description('NestJS Module Generator');

program
 .command('generate <names...>')
 .description('Generate new modules with controllers, services, etc.')
 .action((names) => {
    names.forEach(name => generateModule(name));
  });
console.log(process.argv);

program.parse(process.argv);
