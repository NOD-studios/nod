# @nod/nod

Monorepo of @nod/modules
- [@nod/swiss-kase](./@nod/swiss-kase)
- [@nod/link-local-packages](./@nod/link-local-packages)
- [@nod/debug-prefix-package-name](./@nod/debug-prefix-package-name)

## Installation
```bash
npm i
```

## Usage

## Environment Variables
- For debugging `DEBUG=@chantelle/*` or `DEBUG=@chantelle/ui` or `DEBUG=@chantelle/util` etc.

## Commands

- ### `npm start`
Start servers

- ### `npm run reinstall`
Purges all modules and installs everything again

- ### `npm run start:prod`
Start production servers

- ### `npm test`
Start test process on all modules

- ### `npm run publish`
Set version, tag git version and after publish all modules to npm

- ### `npm run build`
Start build process on all modules

- ### `npm run lint`
Start lint process on all modules

- ### `npm run link-global`
Link all modules globally for local development (runs on postinstall)

- ### `npm run lint-watch`
Start lint process on all modules with watching option

- ### `npm run bootstrap`
Installs all submodules and links them together (runs on postinstall)

- ### `npm run reinstall`
Purges all modules and installs everything

- ### `npm run exec <command>`
Run a command in all modules

- ### `npm run clean`
Clean all modules installed in submodules

- ### `npm run purge`
Purge all installed modules and lock files


## License
Apache 2.0
