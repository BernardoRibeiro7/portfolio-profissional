const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of ['index.html']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

for (const dir of ['assets', 'public']) {
  fs.cpSync(path.join(root, dir), path.join(dist, dir), { recursive: true });
}

console.log('Build concluído: arquivos estáticos copiados para dist/.');
