// Quick well-formedness check for public/logo.svg (and any future SVG assets).
import { readFileSync } from 'node:fs';

const file = process.argv[2] ?? 'public/logo.svg';
const src = readFileSync(file, 'utf8');

const VOID = new Set(['stop', 'feDropShadow', 'path', 'rect']);
const stack = [];
let ok = true;

for (const m of src.matchAll(/<([/]?[a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)([/]?)>/g)) {
  const [full, rawName, , selfClose] = m;
  if (full.startsWith('</')) {
    const name = rawName.slice(1);
    const top = stack.pop();
    if (top !== name) {
      console.error(`✖ expected </${top}> but found </${name}>`);
      ok = false;
      break;
    }
  } else {
    const name = rawName;
    if (!selfClose && !VOID.has(name)) stack.push(name);
  }
}

if (ok && stack.length) {
  console.error('✖ unclosed tags:', stack.join(', '));
  ok = false;
}

if (ok && !src.trimStart().startsWith('<svg')) {
  console.error('✖ root element is not <svg>');
  ok = false;
}

console.log(ok ? `✔ ${file} is well-formed` : `✖ ${file} FAILED`);
process.exit(ok ? 0 : 1);
