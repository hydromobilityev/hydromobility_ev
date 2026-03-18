import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CustomSegmentedControl = ({ options, selectedIndex, onChange, theme, regular }) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, alignItems: 'center' }}>
      {options.map((option, index) => {
        const selected = index === selectedIndex;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(index)}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 6,
              backgroundColor: selected ? theme.primary : 'transparent',
              borderRadius: 8,
              marginHorizontal: 4,
              shadowColor: selected ? theme.primary : 'transparent',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: selected ? 0.2 : 0,
              shadowRadius: 3,
            }}
          >
            <Text
              style={{
                fontFamily: selected ? regular : regular,
                fontSize: 14,
                color: selected ? theme.textPrimary : theme.textSecondary,
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default CustomSegmentedControl;