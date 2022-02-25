#!/usr/bin/env node
import { Command } from 'commander';
import { writeFile } from 'fs/promises';
import keypair from 'keypair';

async function main() {
  await new Command()
    .argument('[name]', 'An alternate name for your keys', '')
    .option('--bits <bits>', 'Key length', '2048')
    .action(async (name, options) => {
      const pair = keypair({ bits: Number(options.bits) });
      const prefix = name ? `${name}.` : '';
      await writeFile(`${prefix}public.pem`, pair.public);
      await writeFile(`${prefix}private.pem`, pair.private);
    })
    .parseAsync(process.argv);
}

main();
