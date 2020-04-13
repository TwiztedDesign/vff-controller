# vff-image-browser



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type      | Default |
| ---------------- | ----------------- | ----------- | --------- | ------- |
| `error`          | `error`           |             | `string`  | `''`    |
| `progress`       | `progress`        |             | `boolean` | `false` |
| `progressStatus` | `progress-status` |             | `number`  | `0`     |
| `selectedFiles`  | --                |             | `File[]`  | `[]`    |


## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `vff:change` |             | `CustomEvent<any>` |


## Methods

### `addFiles(files: any) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [vff-progress-bar](../progress-bar)

### Graph
```mermaid
graph TD;
  vff-image-browser --> vff-progress-bar
  style vff-image-browser fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
