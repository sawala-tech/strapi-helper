
# @sawala-tech/strapi-helper

Strapi helper to boost up your app model using strapi.

## Installation

Using NPM:

```bash
  npm install @sawala-tech/strapi-helper
```

Using Yarn:

```bash
  yarn add @sawala-tech/strapi-helper
```

## API Reference

### `upload(file, callback)`

Upload single file

```ts
import { Strapi } from '@sawala-tech/strapi-helper'

const file = new File(['anjay'], 'anjay')

await Strapi.upload(file, (res) => {
    console.log(res)
})
```

### `bulkUpload(files, callback)`

Upload multiple files at once

```ts
import { Strapi } from '@sawala-tech/strapi-helper'

const files = [new File(['anjay'], 'yani'), new File(['wah'], 'anjay')]

await Strapi.bulkUpload(files, (res) => {
    console.log(res)
})
```

## Authors

- [@aldycavalera](https://www.github.com/aldycavalera)

## License

[MIT](https://choosealicense.com/licenses/mit/)
