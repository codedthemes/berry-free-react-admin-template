# SQLTools Formatter

[![GitHub](https://img.shields.io/github/license/mtxr/vscode-sqltools)](https://github.com/mtxr/vscode-sqltools/blob/dev/LICENSE)

> Forked from [zeroturnaround/sql-formatter](https://zeroturnaround.github.io/sql-formatter/) but with improvements and ported Typescript.

This package is part of [vscode-sqltools](https://vscode-sqltools.mteixeira.dev/?umd_source=repository&utm_medium=readme&utm_campaign=formatter) extension.

&rarr; Try it online using our **[playground](https://vscode-sqltools.mteixeira.dev/playground/formatter?umd_source=repository&utm_medium=readme&utm_campaign=formatter)**.

## Install

Get the latest version from NPM/Yarn:

```shell
npm install @sqltools/formatter
#
yarn add @sqltools/formatter
```

## Usage

```ts
import sqlFormatter from '@sqltools/formatter';

console.log(sqlFormatter.format('SELECT * FROM table1'));
```

Will output:

```
SELECT *
FROM table1
```

You can also pass in configuration options:

```js
sqlFormatter.format('SELECT *', {
  language: 'sql',
  indent: '\t', // Defaults to two spaces
});
```

## Options

| option              | description                                      | type                                                       | default            |
| ------------------- | ------------------------------------------------ | ---------------------------------------------------------- | ------------------ |
| language            | Query language, default is Standard SQL          | `sql, n1ql, db2, pl/sql`                                   | `sql`              |
| indent              | Characters used for indentation                  | `string`                                                   | ` ` (2 spaces)     |
| reservedWordCase    | How to change the case of reserved words         | `upper`, `lower`, `null`                                   | `null` (no change) |
| linesBetweenQueries | How many line breaks between queries             | `number` or `'preserve'`                                   | `1`                |
| params              | Collection of params for placeholder replacement | `object` for name params, `array` for indexed placeholders |                    |

## Changelog

#### v1.2.4

- Support PostgreSQL c-style escape strings in formatter. [#935](https://github.com/mtxr/vscode-sqltools/pull/935) - thanks to [@sivaramasubramanian](https://github.com/sivaramasubramanian).
- Support PostgreSQL @@ operator in formatter. [#936](https://github.com/mtxr/vscode-sqltools/pull/936) - thanks to [@remlse](https://github.com/remlse).

#### v1.2.3

- Update types path. Thanks to [@sgtpep](https://github.com/sgtpep)
- Update README.md. Thanks to [@hacker0limbo](https://github.com/hacker0limbo)

#### v1.2.2

- Add playground link and options to README.md
- Emitting declarations files for usage with Typescript.

#### v1.2.1

- Fixes JSON operators not inserting spaces. Issue [#605](https://github.com/mtxr/vscode-sqltools/issues/605)
- Fixes Grant type queries. Issue [#460](https://github.com/mtxr/vscode-sqltools/issues/460)

#### v1.2.1

- (Almost) first public version
