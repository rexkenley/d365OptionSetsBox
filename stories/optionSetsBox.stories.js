import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import OptionSetsBox from "../src/jsx/optionSetsBox";

const optionSets = {};
for (let i = 0; i < 20; i += 1) optionSets[`Option ${i}`] = i;

storiesOf("OptionSetsBox", module)
  .add("Initial", () => <OptionSetsBox />)
  .add("with props hidden", () => <OptionSetsBox hidden />)
  .add("with props disabled", () => <OptionSetsBox disabled />)
  .add("with props optionSets", () => <OptionSetsBox optionSets={optionSets} />)
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
