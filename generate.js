const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');

const templatesDir = path.join(__dirname, 'templates');

const generateModule = async (name) => {
  const moduleDir = path.join(process.cwd(), name);
  const entityDir = path.join(moduleDir, 'entity');

  try {
    await fs.ensureDir(moduleDir);
    await fs.ensureDir(path.join(moduleDir, 'dto'));
    await fs.ensureDir(entityDir);

    const files = [
      { template: 'controller.ejs', output: `${name.toLowerCase()}.controller.ts` },
      { template: 'service.ejs', output: `${name.toLowerCase()}.service.ts` },
      { template: 'module.ejs', output: `${name.toLowerCase()}.module.ts` },
      { template: 'dto/create-dto.ejs', output: `dto/${name.toLowerCase()}.create.dto.ts` },
      { template: 'dto/update-dto.ejs', output: `dto/${name.toLowerCase()}.update.dto.ts` },
      { template: 'dto/response-dto.ejs', output: `dto/${name.toLowerCase()}.response.dto.ts` },
      { template: 'entity.ejs', output: `entity/${name.toLowerCase()}.entity.ts` }
    ];

    for (const file of files) {
      const templatePath = path.join(templatesDir, file.template);
      const outputPath = path.join(moduleDir, file.output);

      const template = await fs.readFile(templatePath, 'utf-8');
      const rendered = ejs.render(template, { name });

      await fs.writeFile(outputPath, rendered);
    }

    console.log(`Module ${name} generated successfully!`);
  } catch (err) {
    console.error('Error generating module:', err);
  }
};

module.exports = { generateModule };
