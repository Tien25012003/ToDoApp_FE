import {View, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import TabBar from './components/TabBar';
import {COLORS, width} from '@utils/colors';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import ListCard from '@screens/ListCard';
export type TAB = 'Todo' | 'Done';
const DATA: ITask[] = [
  {
    id: '1',
    priority: 'High',
    title: 'Go to school',
    status: 'Todo',
  },
  {
    id: '2',
    priority: 'Medium',
    title: 'Have a break',
    status: 'Todo',
  },
  {
    id: '3',
    priority: 'Medium',
    title: 'Do Homework',
    status: 'Todo',
  },
  {
    id: '4',
    priority: 'Medium',
    title: 'Sleep',
    status: 'Todo',
  },
  {
    id: '5',
    priority: 'Medium',
    title: 'Go to the supermarket',
    status: 'Done',
  },
  {
    id: '6',
    priority: 'Medium',
    title: 'Have Lunch',
    status: 'Done',
  },
  {
    id: '7',
    priority: 'High',
    title: 'Go to school',
    status: 'Todo',
  },
  {
    id: '8',
    priority: 'Medium',
    title: 'Have a break',
    status: 'Todo',
  },
  {
    id: '9',
    priority: 'Medium',
    title: 'Do Homework',
    status: 'Todo',
  },
  {
    id: '10',
    priority: 'Medium',
    title: 'Sleep',
    status: 'Todo',
  },
  {
    id: '11',
    priority: 'Medium',
    title: 'Go to the supermarket',
    status: 'Done',
  },
  {
    id: '12',
    priority: 'Medium',
    title: 'Have Lunch',
    status: 'Done',
  },
  {
    id: '13',
    priority: 'Medium',
    title: 'Have Lunch',
    status: 'Done',
  },
  {
    id: '14',
    priority: 'High',
    title: 'Go to school',
    status: 'Todo',
  },
  {
    id: '15',
    priority: 'Medium',
    title: 'Have a break',
    status: 'Todo',
  },
  {
    id: '16',
    priority: 'Medium',
    title: 'Do Homework',
    status: 'Todo',
  },
  {
    id: '17',
    priority: 'Medium',
    title: 'Sleep',
    status: 'Todo',
  },
  {
    id: '18',
    priority: 'Medium',
    title: 'Go to the supermarket',
    status: 'Done',
  },
  {
    id: '19',
    priority: 'Medium',
    title: 'Have Lunch',
    status: 'Done',
  },
];
const HomeScreen = () => {
  const [tab, setTab] = useState<TAB>('Todo');
  const TODOS = useMemo(
    () => DATA.filter(data => data.status === 'Todo'),
    [DATA],
  );
  const DONES = useMemo(
    () => DATA.filter(data => data.status === 'Done'),
    [DATA],
  );
  const scrollRef = useRef<ScrollView>(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TabBar
        tab={tab}
        onPressDone={() => {
          setTab('Done');
          scrollRef?.current?.scrollTo({x: width, animated: true});
        }}
        onPressTodo={() => {
          setTab('Todo');
          scrollRef?.current?.scrollTo({x: 0, animated: true});
        }}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={scrollRef}
        onMomentumScrollEnd={e => {
          if (e.nativeEvent.contentOffset.x === 0 && tab !== 'Todo') {
            setTab('Todo');
            return;
          }
          if (e.nativeEvent.contentOffset.x === width && tab !== 'Done') {
            setTab('Done');
            return;
          }
        }}>
        <View style={{width}}>
          <ListCard data={TODOS} />
        </View>
        <View style={{width}}>
          <ListCard data={DONES} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
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
});
export default HomeScreen;
