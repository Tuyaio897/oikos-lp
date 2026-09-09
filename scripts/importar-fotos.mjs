/**
 * Importa as fotos da pasta de entrega para dentro de public/.
 *
 * Uso:  node scripts/importar-fotos.mjs [pasta-de-origem]
 *
 * Por padrão lê a pasta OIKOS-FOTOS na Área de Trabalho. Cada arquivo é
 * redimensionado para a largura máxima do slot, convertido para JPEG de
 * qualidade alta e gravado no caminho que `src/config/fotos.ts` espera.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';

/** Espelha os slots de src/config/fotos.ts. */
const SLOTS = [
  { entrada: 'heroi-cavalete', destino: 'imagens/campo/heroi-cavalete.jpg', largura: 1600 },
  { entrada: 'purgador-vazando', destino: 'imagens/campo/purgador-vazando.jpg', largura: 1400 },
  { entrada: 'ronda-tablet', destino: 'imagens/campo/ronda-tablet.jpg', largura: 1400 },
  { entrada: 'up100', destino: 'imagens/equipamento/up100.jpg', largura: 1200 },
  { entrada: 'casa-caldeiras', destino: 'imagens/campo/casa-caldeiras.jpg', largura: 1800 },
  { entrada: 'sistema-em-uso', destino: 'imagens/sistema/sistema-em-uso.jpg', largura: 1600 },
  { entrada: 'equipe', destino: 'imagens/equipe/equipe.jpg', largura: 1600 },
];

const EXTENSOES = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

const origem =
  process.argv[2] ??
  path.join(os.homedir(), 'OneDrive', 'Área de Trabalho', 'OIKOS-FOTOS');

if (!fs.existsSync(origem)) {
  console.error(`Pasta de origem não encontrada: ${origem}`);
  process.exit(1);
}

const disponiveis = fs.readdirSync(origem);

let importadas = 0;
for (const slot of SLOTS) {
  const arquivo = disponiveis.find((nome) => {
    const ext = path.extname(nome).toLowerCase();
    return EXTENSOES.includes(ext) && path.basename(nome, ext).toLowerCase() === slot.entrada;
  });

  if (!arquivo) {
    console.log(`  faltando   ${slot.entrada}`);
    continue;
  }

  const destino = path.join('public', slot.destino);
  fs.mkdirSync(path.dirname(destino), { recursive: true });

  const entrada = path.join(origem, arquivo);
  const antes = fs.statSync(entrada).size;

  await sharp(entrada)
    .rotate()
    .resize({ width: slot.largura, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);

  const depois = fs.statSync(destino).size;
  console.log(
    `  importada  ${slot.entrada}  ${(antes / 1e6).toFixed(2)} MB -> ${(depois / 1e6).toFixed(2)} MB`,
  );
  importadas += 1;
}

console.log(`\n${importadas} de ${SLOTS.length} fotos importadas.`);
