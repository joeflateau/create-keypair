#!/usr/bin/env node
import { Command } from 'commander';
import { access, writeFile } from 'fs/promises';
import keypair from 'keypair';

async function main() {
  await new Command()
    .argument('[name]', 'An alternate name for your keys', 'key')
    .option('--bits <bits>', 'Key length', '2048')
    .action(async (name, options) => {
      const pair = keypair({ bits: Number(options.bits) });

      let uniqueCounter = 0;
      let publicKeyFilename: string;
      let privateKeyFilename: string;

      do {
        uniqueCounter++;
        const uniqifier = uniqueCounter === 1 ? '' : uniqueCounter;
        publicKeyFilename = `${name}${uniqifier}.public.pem`;
        privateKeyFilename = `${name}${uniqifier}.private.pem`;
      } while (
        (await exists(publicKeyFilename)) ||
        (await exists(privateKeyFilename))
      );

      await writeFile(publicKeyFilename, pair.public);
      await writeFile(privateKeyFilename, pair.private);
    })
    .parseAsync(process.argv);
}

async function exists(filename: string) {
  try {
    await access(filename);
    return true;
  } catch {
    return false;
  }
}

main();
