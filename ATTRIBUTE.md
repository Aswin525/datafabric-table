# Component Attributes

This command provides functionality to manage attributes for components in a component. It allows adding various types of attributes to components with different UI types and field mappings.

## Usage

```sh
    neutrinos generate attribute [componentName] [Options] | neutrinos g a [componentName] [Options]
```

### Arguments:

- `[componentName]` Name of the component to generate an attribute

### Options

- `-t` , `--type <attributeType>` Type of attribute can be property, event, validation
- `-u` , `--ui-type <uiType>` Ui-type of attribute can be ===> input, toggle, dropdown, multi-select, typed-input, range, color-picker,data-source, data-set, table-actions, data-mapping
- `-l` , `--label <label>` Label for an attribute
- `-e` , `--event <event>` Event name for an attribute if -t/--type is event
- `-c` , `--category <category>` Category for an attribute
- `-p` , `--placeholder <placeholder>` Placeholder for an attribute
- `-d` , `--defaultValue <defaultValue>` DefaultValue for an attribute
- `-o` , `--options <options...>` Options for an attribute
- `-f` , `--fieldMappings <FieldMappings>` FieldMappings for package
- `-n` , `--validation <validation>` Validation for an attribute

## Attribute Inteface

```ts
    Interface AlphaAttribute {
        type: 'property' | 'event' | 'validation',
        uiType: 'input' | 'toggle ' | 'dropdown' |'multi-select' | 'typed-input' | 'range' |'color-picker' | 'data-source' | 'data-set' | 'table-actions' | 'data-mapping',
        label: string;
        event: string;
        category: string;
        placeholder: string;
        defaultValue: boolean | string | number | any[] | object;
        options:
                Array<{
                    displayText: string | number; value: string | number | boolean
                }> |
                Array<{
                    name:'CMS' | 'CO' | 'Task Instance' | 'Case Instance' | 'String' | 'Language' | 'Local';
                    value: 'cms' | 'co' | 'task_instance' | 'case_instance' | 'string' | 'lang' | 'local';
                }> |
                {
                    minLabel: string;
                    maxLabel: string;
                    minRange: number;
                    maxRange: number;
                } |
                {
                    maxLength: number;
                } |
                {
                    type: 'text' | 'number';
                };
        fieldMappings: string |
                {
                    type: string;
                    value: string;
                } |
                {
                    response: any;
                    label: string;
                    value: string;
                } |
                Record<string, string>;
        validation: Record<string, any>;
    }
```

## Attribute Types

There are three main types of attributes:

1. **property**: Regular attributes that define properties of a component.
2. **event**: Attributes that define events for a component.
3. **validation**: Attributes that define validation rules for a component.

## UI Types

The UI types specify the type of user interface element associated with an attribute. The following UI types are supported:

- input
- toggle
- dropdown
- multi-select
- typed-input
- range
- color-picker
- data-source
- data-set
- table-actions
- data-mapping

## Field Mappings

Field mappings is the value of attribute assign to which property of component. These ui type will emmit these values;

- **Data mapping**: `response`, `actions`, `columns`, `actionColumn`, `pagination`, `paginationData`
- **Dataset**: `value`
- **Datasource**: `response`, `label`, `value`
- **Typed input**: `type`, `value`

## Options

Some UI types required options:

- **Drop down**: Requires array of `displayText`, `value`,

```ts
Array<{
    displayText: string;
    value: string;
}>;
```

- **Typed input**: Requires array of `name`, `value`

```ts
Array<{
    name: string;
    value: string;
}>;
```
