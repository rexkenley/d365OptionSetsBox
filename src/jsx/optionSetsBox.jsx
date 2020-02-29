import React, { useState, useEffect } from "react";
import {
  Stack,
  Callout,
  DirectionalHint,
  IconButton,
  PrimaryButton,
  ActionButton
} from "office-ui-fabric-react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TagPicker } from "office-ui-fabric-react/lib/Pickers";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

/** @module optionSetsBox */

/**
 * @module optionSetsBox/OptionSetsBoxProps
 * @typedef {{}} OptionSetsBoxProps
 * @property {{}} optionSets
 * @property {string} value
 * @property {boolean} isMultipleSelect
 * @property {boolean} disabled
 * @property {boolean} hidden
 * @property {function} onChange
 */

/**
 * AdddressBox
 * @module optionSetsBox/OptionSetsBox
 * @function
 * @param {OptionSetsBoxProps} props
 * @returns {{}}
 */

const OptionSetsBox = props => {
  const {
      optionSets,
      value,
      isMultipleSelect,
      disabled,
      hidden,
      onChange
    } = props,
    divRef = React.useRef(),
    tagRef = React.useRef(),
    _optionSets = optionSets
      ? Object.keys(optionSets).map(k => ({
          key: optionSets[k],
          name: k
        }))
      : [],
    onFilterChanged = (filterText, selectedItems) => {
      return filterText
        ? _optionSets
            .filter(
              option =>
                !option.name.toLowerCase().indexOf(filterText.toLowerCase())
            )
            .filter(option => !selectedItems.find(s => s.key === option.key))
        : [];
    },
    getTextFromItem = item => {
      return item.name;
    },
    [_showAvailable, setShowAvailable] = useState(false),
    [_selectedItems, setSelectedItems] = useState([]),
    onClick = val => {
      const { current } = tagRef;

      !isMultipleSelect && current.removeItems(current.selection.getItems());

      current.addItem(val);
      onChange && onChange(current.items);

      !isMultipleSelect && setShowAvailable(false);
    };

  useEffect(() => {
    setShowAvailable(false);
    setSelectedItems([]);
  }, [optionSets, value]);

  if (hidden) return <Fabric />;

  return (
    <Fabric>
      <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
        <div ref={divRef}>
          <TagPicker
            componentRef={tagRef}
            disabled={disabled}
            items={_selectedItems}
            onResolveSuggestions={onFilterChanged}
            getTextFromItem={getTextFromItem}
            onChange={items => {
              setSelectedItems(items);
              onChange && onChange(items);
            }}
            pickerSuggestionsProps={{
              suggestionsHeaderText: "Options",
              noResultsFoundText: "No Options Found"
            }}
          />
        </div>
        <IconButton
          disabled={disabled}
          iconProps={{ iconName: "MultiSelect" }}
          onClick={() => {
            setShowAvailable(true);
          }}
        />
      </Stack>
      <Callout
        target={divRef}
        coverTarget={false}
        calloutMaxWidth={350}
        directionalHint={DirectionalHint.rightTopEdge}
        hidden={!_showAvailable}
        onDismiss={() => {
          setShowAvailable(false);
        }}
      >
        <Stack tokens={{ childrenGap: 8 }} horizontal wrap verticalAlign="end">
          {_optionSets &&
            _optionSets
              .filter(o => _selectedItems.every(s => s.key !== o.key))
              .map(o => (
                <ActionButton
                  iconProps={{ iconName: isMultipleSelect ? "Add" : "Switch" }}
                  key={o.key}
                  text={o.name}
                  onClick={() => {
                    onClick(o);
                  }}
                />
              ))}
        </Stack>
        {isMultipleSelect && (
          <PrimaryButton
            text="Select All"
            onClick={() => {
              setShowAvailable(false);
            }}
          />
        )}
      </Callout>
    </Fabric>
  );
};

export default OptionSetsBox;
