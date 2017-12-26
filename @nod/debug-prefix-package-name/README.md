# @nod/debug-with-package-name

Auto prefixes [debug module](https://www.npmjs.com/package/debug) with package name

```javascript
import debug from '@nod/debug-with-package-name'

debug()('description %O', {foo: 'bar'}) // your-package-name  description: { foo: bar }
```

```javascript
const optionaExtraParam = 'optional-param'

debug(optionaExtraParam)('description %O', {foo: 'bar'}) // your-package-name/optionalParam  description: { foo: bar }
```

## Scripts
- ### `npm start`
Starts auto build process

- ### `npm test`
Run test

- ### `npm run build`
Run module

- ### `npm test-once`
Run test without watch mode

## Development and additional usage
Please see [@nod/nod](https://github.com/NOD-studios/nod) monorepo

## License
Apache 2.0
