import {StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '@utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
type TFloatButton = {
  onPress?: () => void;
};
const FloatButton = ({onPress}: TFloatButton) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AntDesign name="plus" color={COLORS.white} size={25} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    elevation: 10,
  },
});
export default FloatButton;
