# Project Name

> Amazon Profile Page Clone

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Update package.json "schema" script with correct database user
> Update /server/db/db.js with correct database user and password
> npm run schema
> npm run seed
> npm run build
> npm start

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

## CRUD API

### MongoDB Routes

router.get('/:category/:query', productsController.get);
router.post('/create/:category/:query', productsController.create);
router.put('/update/:category/:oldProduct/:newProduct', productsController.update);
router.delete('/delete/:category/:query', productsController.remove);
router.get('/', categoriesController.getAll);
router.post('/create/:category', categoriesController.create);
router.put('/update/:category/:newCategory', categoriesController.update);
router.delete('/delete/:category', categoriesController.remove);

### PostgreSQL Routes

router.get('/', categoriesController.getAll);
router.post('/create/:category', categoriesController.create);
router.put('/update/:category/:newCategory', categoriesController.update);
router.delete('/delete/:category', categoriesController.remove);
router.get('/:category/:query', productsController.get);
router.post('/create/:category/:query', productsController.create);
router.put('/update/:category/:oldProduct/:newProduct', productsController.update);
router.delete('/delete/:category/:query', productsController.remove);