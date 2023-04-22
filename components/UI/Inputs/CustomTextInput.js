import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import COLORS from "../../../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomTextInput = (props) => {
  const [isSecured, setIsSecured] = useState(props.password);
  const [rightIconOn, setRightIconOn] = useState(false);

  const handleToggleSecured = () => {
    setIsSecured((oldState) => !oldState);
  };

  const handleOnPressIcon = () => {
    handleToggleSecured();
    setRightIconOn((oldState) => !oldState);
  };

  return (
    <View>
      <HelperText
        style={styles.helper}
        type="error"
        visible={props.errorMessage}
      >
        {props.errorMessage}
      </HelperText>
      <TextInput
        mode={props.mode}
        label={props.label}
        placeholder={props.placeholder}
        style={{
          backgroundColor: props.light ? COLORS.milkBackground : COLORS.black,
          ...styles.input,
        }}
        theme={theme}
        outlineColor={COLORS.primary}
        secureTextEntry={isSecured}
        error={!!props.errorMessage}
        textColor={props.light ? COLORS.black : COLORS.white}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        value={props.value}
        keyboardType={props.keyboardType ? props.keyboardType : "default"}
        left={
          props.leftIconName ? (
            <TextInput.Icon
              icon={() => (
                <Icon name={props.leftIconName} size={28} color={COLORS.grey} />
              )}
            />
          ) : null
        }
        right={
          props.rightIconName ? (
            <TextInput.Icon
              onPress={handleOnPressIcon}
              icon={() => (
                <Icon
                  name={props.rightIconName}
                  size={28}
                  color={rightIconOn ? COLORS.white : COLORS.grey}
                />
              )}
            />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    marginBottom: 5,
  },
  helper: {
    height: 26,
    fontSize: 16,
  },
});

const theme = {
  colors: {
    primary: COLORS.green,
    background: COLORS.greyLight,
   
  },
};

export default CustomTextInput;
