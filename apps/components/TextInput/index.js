import {BaseColor, BaseStyle, useFont} from '@config';
import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import {I18nManager, TextInput, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Index = forwardRef((props, ref) => {
  const font = useFont();
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    inputStyle,
    position,
    ...attrs
  } = props;
  return (
    <View
      style={[
        BaseStyle.textInput,
        {
          backgroundColor: cardColor,
          borderColor: BaseColor.corn30,
          borderWidth: 1,
        },
        style,
      ]}>
      {position == 'left' ? icon : null}
      <TextInput
        ref={ref}
        style={[
          {
            fontFamily: `${font}-Regular`,
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'auto',
            color: colors.text,
            paddingTop: 5,
            paddingBottom: 5,
          },
          inputStyle,
        ]}
        onChangeText={text => onChangeText(text)}
        onFocus={() => onFocus()}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={success ? BaseColor.corn30 : colors.primary}
        secureTextEntry={secureTextEntry}
        value={value}
        selectionColor={colors.primary}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        {...attrs}
      />
      {position == 'right' ? icon : null}
      {/* {icon} */}
    </View>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  inputStyle: PropTypes.object,
  position: PropTypes.string,
};

Index.defaultProps = {
  inputStyle: {},
  style: {},
  position: '',
  onChangeText: text => {},
  onFocus: () => {},
  placeholder: 'Placeholder',
  value: '',
  success: true,
  secureTextEntry: false,
  keyboardType: 'default',
  multiline: false,
  textAlignVertical: 'center',
  icon: null,
  onSubmitEditing: () => {},
};

export default Index;
