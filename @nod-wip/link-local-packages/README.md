# @nod/link-local-packages
Reads dependencies and links them if they exist in the given or current path

## Install
```bash
npm i @nod/link-local-packages
```

## CLI usage
```bash
linkLocalPackages
# or
linkLocalPackages ../local/modules/path ../package.json/path
```

## API usage
```javascript
const linkLocalPackages = require('@nod/link-local-packages')
linkLocalPackages()
//or
linkLocalPackages('path/to/look/for/the/local/packages')
```

## Scripts
- ### `yarn start`
Starts auto build process

- ### `yarn test`
Run test

- ### `yarn build`
Run module

- ### `yarn test-once`
Run test without watch mode


## Development and additional usage
Please see [@nod/nod](https://github.com/NOD-studios/nod) monorepo

## License
Apache 2.0
