import * as React from "react";
import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

import OsB from "../src/jsx/optionSetsBox";

export class OptionSetsBox
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private notifyOutputChanged: () => void;
  private value: number | null;
  private optionSets: [{}];
  private updatedByReact: boolean;
  private isControlDisabled: boolean;
  private isVisible: boolean;

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    const { parameters, mode } = context,
      { value } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;
    // @ts-ignore
    this.optionSets = value.attributes.Options.map(o => {
      return { key: o.Value, name: o.Label };
    });
    this.value = value && value.raw;
    this.updatedByReact = false;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    ReactDOM.render(
      // @ts-ignore
      React.createElement(OsB, {
        optionSets: this.optionSets,
        value: this.value,
        isMultipleSelect: false,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onChange: items => {
          // @ts-ignore
          this.value = items.length ? items[0].key : null;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const { parameters, mode } = context,
      { value } = parameters,
      { isControlDisabled, isVisible } = mode;

    this.value = value && value.raw;
    this.isControlDisabled = isControlDisabled;
    this.isVisible = isVisible;

    ReactDOM.render(
      React.createElement(OsB, {
        optionSets: this.optionSets,
        value: this.value,
        isMultipleSelect: false,
        disabled: this.isControlDisabled,
        hidden: !this.isVisible,
        onChange: items => {
          // @ts-ignore
          this.value = items.length ? items[0].key : null;
          this.updatedByReact = true;
          this.notifyOutputChanged();
        }
      }),
      this.container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    // @ts-ignore
    return { value: this.value };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
