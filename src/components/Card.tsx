import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {Dispatch, SetStateAction, memo, useMemo, useState} from 'react';
import {COLORS, width} from '@utils/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  GestureDetector,
  Gesture,
  PanGesture,
  PanGestureHandlerProps,
  PanGestureHandler,
  GestureType,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useAtom} from 'jotai';
import {removeTask} from '@state/store';
type TCard = ITask & {
  simultaneousHandlers: any;
  onUpdateTaskStatus: () => void;
  onEditTask: () => void;
} & Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;
const CARD_COLOR = {
  High: COLORS.red,
  Medium: COLORS.blue,
  Done: COLORS.green,
};
const RIGHT_ACTION_WIDTH = 140;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Card = ({
  id,
  priority = 'High',
  taskName = 'To do taskName',
  status = 'Todo',
  createdAt = 1711821657613,
  description,
  simultaneousHandlers,
  onUpdateTaskStatus,
  onEditTask,
}: TCard) => {
  const [, removeTaskAtom] = useAtom(removeTask);

  const cardBorderColor = useMemo(
    () => (status === 'Todo' ? CARD_COLOR[priority] : CARD_COLOR.Done),
    [status, priority],
  );
  const startX = useSharedValue(0);
  const offset = useSharedValue(0);
  const pan = Gesture.Pan()
    .onStart(e => {
      startX.value = offset.value;
    })
    .onUpdate(e => {
      if (
        e.translationX + startX.value < 0 &&
        e.translationX + startX.value > -(RIGHT_ACTION_WIDTH - 10)
      ) {
        offset.value = e.translationX + startX.value;
      }
    })
    .onEnd(e => {
      if (e.translationX < 0) {
        offset.value = -(RIGHT_ACTION_WIDTH - 10);
      } else {
        offset.value = 0;
      }
    })
    .simultaneousWithExternalGesture(simultaneousHandlers)
    .failOffsetY([-5, 5])
    .activeOffsetY([-5, 5]);
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(offset.value, {
          overshootClamping: false,
          stiffness: 280,
        }),
      },
    ],
  }));
  const onPress = () => {
    if (offset.value === 0) {
      offset.value = -(RIGHT_ACTION_WIDTH - 10);
    } else {
      offset.value = 0;
    }
  };
  const onRemoveTask = () => {
    removeTaskAtom({id: id});
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.actionRightContainer}>
        {status === 'Todo' && (
          <TouchableOpacity
            onPress={() => {
              onEditTask();
              offset.value = 0;
            }}
            style={[styles.actionRight, {backgroundColor: COLORS.blue}]}>
            <FontAwesome name="edit" color={COLORS.white} size={30} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onRemoveTask}
          style={[styles.actionRight, {backgroundColor: COLORS.lightRed}]}>
          <FontAwesome name="trash-o" color={COLORS.white} size={30} />
        </TouchableOpacity>
      </View>
      <GestureDetector gesture={pan}>
        <AnimatedPressable
          style={[
            styles.container,
            {borderColor: cardBorderColor},
            cardAnimatedStyle,
          ]}
          onPress={onPress}>
          <View style={{width: '80%'}}>
            <Text style={styles.date}>
              {new Date(createdAt)?.toLocaleDateString()}
            </Text>
            <Text style={styles.taskName} numberOfLines={1}>
              {taskName}
            </Text>
            {description && (
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.circle} onPress={onUpdateTaskStatus}>
            {status === 'Done' && (
              <FontAwesome6 name="check" size={18} color={COLORS.green} />
            )}
          </TouchableOpacity>
        </AnimatedPressable>
      </GestureDetector>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: width * 0.8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  container: {
    width: width * 0.8,
    alignSelf: 'center',
    maxWidth: width * 0.8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    borderRadius: 8,
    borderLeftWidth: 7,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  taskName: {
    color: COLORS.gray,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: COLORS.lightGray,
  },
  description: {
    fontSize: 12,
    color: COLORS.gray,
    opacity: 0.6,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRightContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: RIGHT_ACTION_WIDTH,
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'row',
  },
  actionRight: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default memo(Card);
