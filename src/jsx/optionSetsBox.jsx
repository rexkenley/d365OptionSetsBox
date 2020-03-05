import React, { useState, useEffect } from "react";
import {
  Stack,
  Callout,
  DirectionalHint,
  IconButton,
  ActionButton
} from "office-ui-fabric-react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { TagPicker } from "office-ui-fabric-react/lib/Pickers";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { initializeIcons } from "@uifabric/icons";

initializeIcons();

/** @module optionSetsBox */

/**
 * @module optionSetsBox/OptionSetsBoxProps
 * @typedef {{}} OptionSetsBoxProps
 * @property {[{}]} optionSets
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
    onResolveSuggestions = (filterText, selectedItems) => {
      return filterText
        ? optionSets
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
    [_selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setShowAvailable(false);

    if (optionSets && value)
      setSelectedItems([optionSets.find(os => os.key === value)]);
    else setSelectedItems([]);
  }, [optionSets, value]);

  if (hidden) return <Fabric />;

  return (
    <Fabric>
      <Stack tokens={{ childrenGap: 8 }} horizontal verticalAlign="end">
        <div ref={divRef}>
          <TagPicker
            disabled={disabled}
            getTextFromItem={getTextFromItem}
            itemLimit={isMultipleSelect ? undefined : 1}
            pickerSuggestionsProps={{
              suggestionsHeaderText: "Options",
              noResultsFoundText: "No Options Found"
            }}
            selectedItems={_selectedItems}
            onChange={items => {
              setSelectedItems(items);
              onChange && onChange(items);
            }}
            onResolveSuggestions={onResolveSuggestions}
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
        calloutWidth={350}
        directionalHint={DirectionalHint.rightTopEdge}
        hidden={!_showAvailable}
        onDismiss={() => {
          setShowAvailable(false);
        }}
      >
        {isMultipleSelect && (
          <CommandBar
            items={[
              {
                key: "selectAll",
                text: "Select All",
                onClick: () => {
                  setSelectedItems(
                    _selectedItems.concat(
                      optionSets.filter(o =>
                        _selectedItems.every(s => s.key !== o.key)
                      )
                    )
                  );
                  setShowAvailable(false);
                  onChange && onChange(optionSets);
                }
              },
              {
                key: "removeAll",
                text: "Remove All",
                onClick: () => {
                  setSelectedItems([]);
                  setShowAvailable(false);
                  onChange && onChange([]);
                }
              }
            ]}
            farItems={[
              {
                key: "close",
                iconOnly: true,
                iconProps: { iconName: "ChromeClose" },
                onClick: () => {
                  setShowAvailable(false);
                }
              }
            ]}
          />
        )}
        <Stack tokens={{ childrenGap: 8 }} horizontal wrap verticalAlign="end">
          {optionSets &&
            optionSets
              .filter(os => _selectedItems.every(si => si && si.key !== os.key))
              .map(os => (
                <ActionButton
                  iconProps={{ iconName: isMultipleSelect ? "Add" : "Switch" }}
                  key={os.key}
                  text={os.name}
                  onClick={() => {
                    let newSelection;

                    if (isMultipleSelect) {
                      newSelection = _selectedItems.concat([os]);
                      setSelectedItems(newSelection);
                    } else {
                      newSelection = [os];
                      setSelectedItems(newSelection);
                      setShowAvailable(false);
                    }

                    onChange && onChange(newSelection);
                  }}
                />
              ))}
        </Stack>
      </Callout>
    </Fabric>
  );
};

export default OptionSetsBox;
