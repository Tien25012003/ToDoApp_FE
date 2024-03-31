import {View, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import TabBar from './components/TabBar';
import {COLORS, height, width} from '@utils/colors';
import {ScrollView} from 'react-native-gesture-handler';
import ListCard from '@screens/ListCard';
import Animated, {
  ZoomIn,
  ZoomOut,
  useSharedValue,
} from 'react-native-reanimated';
export type TAB = 'Todo' | 'Done';
import {DATA} from './mock/data';
import FloatButton from './components/FloatButton';
import Header from './components/Header';
import FormAddTask from './components/FormAddTask';
import {Tasks, store} from '@state/store';
import {useAtom} from 'jotai';
import {SlideInDown, SlideOutUp} from 'react-native-reanimated';
const HomeScreen = () => {
  const [openFormAdd, setOpenAddForm] = useState(false);
  const [showButtonAdd, setShowButtonAdd] = useState(false);
  const [tasks] = useAtom(Tasks);
  useEffect(() => {
    store.set(Tasks, DATA);
  }, []);

  const [newTask, setNewTask] = useState<Partial<ITask>>({
    taskName: '',
    description: '',
    priority: 'Medium',
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={{width}}>
        <ListCard
          data={tasks}
          onScroll={e => {
            if (e.nativeEvent.contentOffset.y > height && showButtonAdd) {
              setShowButtonAdd(false);
            }
          }}
          onMomentumScrollEnd={e => {
            if (e.nativeEvent.contentOffset.y < height && !showButtonAdd) {
              setShowButtonAdd(true);
            }
          }}
        />
      </View>
      {showButtonAdd && (
        <Animated.View
          style={styles.floatBtnContainer}
          entering={ZoomIn}
          exiting={ZoomOut}>
          <FloatButton onPress={() => setOpenAddForm(true)} />
        </Animated.View>
      )}

      <FormAddTask
        visible={openFormAdd}
        setIsVisible={setOpenAddForm}
        newTask={newTask}
        setNewTask={setNewTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  cardListContainer: {
    width: width * 2,
    flexDirection: 'row',
    borderWidth: 1,
  },
  floatBtnContainer: {
    position: 'absolute',
    bottom: 65,
    right: 20,
  },
});
export default HomeScreen;
