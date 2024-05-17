# Documentation for Local Resource Creation

This documentation describes how to use the `meta.yaml` file to create local resources based on templates found in the `.clingon/templates` folder.

## Structure of the `meta.yaml` File

The `meta.yaml` file contains definitions of resources that the CLI tool uses to generate components, asynchronous functions, markdown documents, and `.nvmrc` configurations.

## Field Details

The table below describes the fields used in the resource definitions in the `meta.yaml` file.

| Field                   | Type    | Required                 | Description                                                           |
| ----------------------- | ------- | ------------------------ | --------------------------------------------------------------------- |
| `identifier`            | string  | Yes                      | Unique identifier for the resource.                                   |
| `folderWrapper`         | boolean | No                       | Indicates if the resource should be wrapped by a folder.              |
| `resource`              | object  | Yes                      | Contains information about the main resource.                         |
| `resource.index`        | boolean | No                       | Indicates if an `index` file should be created.                       |
| `resource.target`       | string  | Yes                      | Target directory where the resource will be generated.                |
| `resource.templatePath` | string  | Yes                      | Path to the resource template.                                        |
| `test`                  | object  | No                       | Contains information about the resource's test file.                  |
| `test.target`           | string  | Yes (if `test` present)  | Target directory where the test will be generated.                    |
| `test.templatePath`     | string  | Yes (if `test` present)  | Path to the test template.                                            |
| `story`                 | object  | No                       | Contains information about the resource's story file (for Storybook). |
| `story.target`          | string  | Yes (if `story` present) | Target directory where the story will be generated.                   |
| `story.templatePath`    | string  | Yes (if `story` present) | Path to the story template.                                           |

## Detailed Examples

### React Component

```yaml
- identifier: component
  folderWrapper: true
  resource:
    index: true
    target: src/components
    templatePath: ./ReactComponent/Component.tsx
  test:
    target: src/components
    templatePath: ./ReactComponent/Component.spec.tsx
  story:
    target: src/components
    templatePath: ./ReactComponent/Component.stories.tsx
```

- **identifier**: `component`
- **folderWrapper**: `true`
- **resource**:
  - **index**: `true`
  - **target**: `src/components`
  - **templatePath**: `./ReactComponent/Component.tsx`
- **test**:
  - **target**: `src/components`
  - **templatePath**: `./ReactComponent/Component.spec.tsx`
- **story**:
  - **target**: `src/components`
  - **templatePath**: `./ReactComponent/Component.stories.tsx`

### Asynchronous Function

```yaml
- identifier: async-function
  resource:
    target: src/utils
    templatePath: ./Functions/AsyncFunction.ts
  test:
    target: src/utils
    templatePath: ./Functions/AsyncFunction.spec.ts
```

- **identifier**: `async-function`
- **resource**:
  - **target**: `src/utils`
  - **templatePath**: `./Functions/AsyncFunction.ts`
- **test**:
  - **target**: `src/utils`
  - **templatePath**: `./Functions/AsyncFunction.spec.ts`

### Markdown Documentation

```yaml
- identifier: markdown
  resource:
    target: src/docs
    templatePath: ./Docs/ReactHookDoc.md
```

- **identifier**: `markdown`
- **resource**:
  - **target**: `src/docs`
  - **templatePath**: `./Docs/ReactHookDoc.md`

### `.nvmrc` File

```yaml
- identifier: nvmrc
  resource:
    target: .
    templatePath: ./Core/.nvmrc
```

- **identifier**: `nvmrc`
- **resource**:
  - **target**: `.`
  - **templatePath**: `./Core/.nvmrc`

## How to Use

1. Place the `meta.yaml` file in the `.clingon/templates` folder along with your templates.
2. Run the CLI tool according to your project's instructions to generate the resources defined in the `meta.yaml`.

This structure allows for easy definition and generation of different types of resources in your project, ensuring consistency and organization.
