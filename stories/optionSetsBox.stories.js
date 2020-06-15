import React from "react";
import { initializeIcons } from "@uifabric/icons";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import OptionSetsBox from "../src/jsx/optionSetsBox";

const optionSets = [];
for (let i = 1; i < 21; i += 1)
  optionSets.push({ key: i, name: `Option ${i}` });

initializeIcons();

storiesOf("OptionSetsBox", module)
  .add("Initial", () => <OptionSetsBox />)
  .add("with props hidden", () => <OptionSetsBox hidden />)
  .add("with props disabled", () => <OptionSetsBox disabled />)
  .add("with props optionSets", () => <OptionSetsBox optionSets={optionSets} />)
  .add("with props optionSets and value 0", () => (
    <OptionSetsBox optionSets={optionSets} value={0} />
  ))
  .add("with props optionSets and value 10", () => (
    <OptionSetsBox optionSets={optionSets} value={10} />
  ))
  .add("with props onChange and optionSets", () => (
    <OptionSetsBox onChange={action("onChange")} optionSets={optionSets} />
  ))
  .add("with props isMultipleSelect, onChange and optionSets", () => (
    <OptionSetsBox
      isMultipleSelect
      onChange={action("onChange")}
      optionSets={optionSets}
    />
  ));
