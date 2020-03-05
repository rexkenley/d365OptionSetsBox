# d365OptionSetsBox
An enhanced option sets box for single (and multiple, soon)

**Features**

- Options can be selected by an easy to use callout box
- Options can be selected by manual entry

**Planned Features**

- Multiple select optionsets support

**Settings**

- value - the option set attribute

**Testing and Review**

- npm run storybook
  - Note: If you get an error, make sure you have a **\_\_results\_\_** folder in test and run **npm run test:output**
- npm run test

**Create deployment file**

- msbuild /t:build /restore /p:configuration=Release
