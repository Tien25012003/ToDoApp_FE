import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  InteractionManager,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '@utils/colors';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {TAB} from '..';
import FloatButton from './FloatButton';
const {width} = Dimensions.get('screen');
type Props = {
  tab?: TAB;
  onPressTodo: () => void;
  onPressDone: () => void;
  animatedValue: SharedValue<number>;
};
const TabBar = ({
  onPressTodo,
  onPressDone,
  tab = 'Todo',
  animatedValue,
}: Props) => {
  const _onPressTodo = useCallback(() => {
    if (tab === 'Todo') return;
    animatedValue.value = 0;
    InteractionManager.runAfterInteractions(() => {
      onPressTodo();
    });
  }, [tab]);

  const _onPressDone = useCallback(() => {
    if (tab === 'Done') return;
    animatedValue.value = width * 0.5;
    InteractionManager.runAfterInteractions(() => {
      onPressDone();
    });
  }, [tab]);
  const animatedTranslateX = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(animatedValue.value)}],
  }));
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabWrapper} onPress={_onPressTodo}>
        <Text style={styles.text}>Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabWrapper} onPress={_onPressDone}>
        <Text style={styles.text}>Done</Text>
      </TouchableOpacity>
      <Animated.View style={[animatedTranslateX, styles.indicatorWrapper]}>
        <Animated.View style={styles.indicator}></Animated.View>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: width,
    backgroundColor: COLORS.white,
    elevation: 10,
  },
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  text: {
    color: COLORS.black,
    fontWeight: '600',
    fontSize: 18,
  },
  indicatorWrapper: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: width * 0.5,
  },
  indicator: {
    height: 3,
    width: width * 0.4,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
  },
});
export default TabBar;
