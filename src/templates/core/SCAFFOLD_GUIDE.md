# Scaffold Command Guide

> Read updated version of this doc on: [clingon.dev/docs/advanced](https://www.clingon.dev/docs/advanced)

This documentation describes how to use the `meta.yaml` file to create local resources based on templates found in the `.clingon/templates` folder.

If you don't know how to create YAML or custom local template files, I recommend that you run the initialization command with the `--examples` flag, which will do all the local configuration necessary for the project to work, in addition to adding some ready-made files. example so you can use it.

```shell
npx clingon init --examples
```

## Structure of the `meta.yaml` File

The `meta.yaml` file contains definitions of resources that the CLI tool uses to generate components, pages, async functions, or whatever you want.

## Field Details

The table below describes the fields used in the resource definitions in the `meta.yaml` file.

| Field                | Type         | Required | Description                                                                             |
| -------------------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| `identifier`         | `string`     | Yes      | Unique identifier for the resource (used on `scaffold` flag `--template` as tag value). |
| `folderWrapper`      | `boolean`    | No       | Indicates if the resource should be wrapped by a folder.                                |
| `case`               | `Case`       | No       | Indicates if the resource should be wrapped by a folder.                                |
| `resources`          | `Resource[]` | Yes      | List of resources to be created.                                                        |
| `resources.path`     | `string`     | Yes      | Path target directory where the resource will be generated.                             |
| `resources.template` | `string`     | Yes      | Path to the resource template.                                                          |

### Types

> Reference for table types

```ts
type Case =
  | 'camelCase'
  | 'PascalCase'
  | 'snake_case'
  | 'kebab-case'
  | 'UPPERCASE'
  | 'lowercase'

interface Resource {
  path: string
  template: string
}

interface Meta {
  identifier: string
  folderWrapper?: boolean
  case?: Case
  resources: Resource[]
}
```

## Detailed Examples

### React Component

```yaml
- identifier: component
  folderWrapper: true
  resources:
    - path: src/components
      template: ./ReactComponent/index.tsx
    - path: src/components
      template: ./ReactComponent/Component.tsx
    - path: src/components
      template: ./ReactComponent/Component.spec.tsx
    - path: src/components
      template: ./ReactComponent/Component.stories.tsx
    - path: src/components
      template: ./ReactComponent/Component.styles.css
```

### Asynchronous Function

```yaml
- identifier: async-function
  resources:
    - path: src/utils
      template: ./Functions/AsyncFunction.ts
    - path: src/utils
      template: ./Functions/AsyncFunction.spec.ts
```

### Markdown Documentation

```yaml
- identifier: markdown
  resources:
    - path: src/docs
      template: ./Docs/ReactHookDoc.md
```

### `.nvmrc` File

```yaml
- identifier: nvmrc
  resources:
    - path: .
      template: ./Core/.nvmrc
```

## How to Use

1. Place the `meta.yaml` or `meta.json` file in the `.clingon/templates` folder along with your templates.
   1. I strongly recommend using YAML, for a better readability but you can also use JSON
2. Run the CLI tool according to your project's instructions to generate the resources defined in the `meta` file.

   ```shell
   npx clingon scaffold <name> --template <templateIdentifier>
   ```

This structure allows for easy definition and generation of different types of resources in your project, ensuring consistency and organization.
