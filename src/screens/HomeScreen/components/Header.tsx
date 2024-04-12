import {View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import React, {useCallback, useDeferredValue, useEffect, useState} from 'react';
import {COLORS, width} from '@utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';
import {API_GET, TResponse} from '@services/api';
import {PATH} from '@services/path';
import {addTasks, store, Tasks} from '@state/store';
import {useSetAtom} from 'jotai';
const Header = () => {
  const [search, setSearch] = useState('');
  const defferValue = useDeferredValue(search);

  const onClear = useCallback(() => {
    if (search !== '') {
      setSearch('');
    }
    if (Keyboard.isVisible()) {
      //console.log('close keyboard');
      Keyboard.dismiss();
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const deviceId = await DeviceInfo.getUniqueId();
      if (defferValue.length > 0) {
        try {
          const res: TResponse<ITask[]> = await API_GET({
            url: PATH.TODO.SEARCH_TODO,
            params: {
              userId: deviceId,
              text: defferValue,
            },
          });
          const data = res.message;
          console.log('task', data);
          store.set(Tasks, data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        try {
          const res: TResponse<ITask[]> = await API_GET({
            url: PATH.TODO.GET_TODO,
            params: {
              userId: deviceId,
            },
          });
          const data = res.data;
          console.log('task', data);
          store.set(Tasks, data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [defferValue]);
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
