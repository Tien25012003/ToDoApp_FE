import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, width} from '@utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = () => {
  const [search, setSearch] = useState('');
  const onClear = useCallback(() => {
    if (search !== '') {
      setSearch('');
    }
    if (Keyboard.isVisible()) {
      //console.log('close keyboard');
      Keyboard.dismiss();
    }
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color={COLORS.gray} />
        <TextInput
          style={styles.input}
          placeholder="Search ..."
          placeholderTextColor={COLORS.lightGray}
          defaultValue={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={onClear}>
          <AntDesign name="closecircle" size={20} color={COLORS.lightGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    width: width,
  },
  searchContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    color: COLORS.black,
  },
});
export default Header;
