import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {memo, useMemo, useState} from 'react';
import {TAB} from '@screens/HomeScreen';
import {COLORS, width} from '@utils/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  GestureDetector,
  Gesture,
  PanGesture,
  PanGestureHandlerProps,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
type TCard = {
  priority?: 'High' | 'Medium';
  title?: string;
  status?: TAB;
  simultaneousHandlers:
    | React.RefObject<PanGestureHandler | undefined>
    | React.RefObject<React.ComponentType<{}> | undefined>;
} & Pick<PanGestureHandlerProps, 'simultaneousHandlers'>;
const CARD_COLOR = {
  High: COLORS.red,
  Medium: COLORS.blue,
  Done: COLORS.green,
};
const RIGHT_ACTION_WIDTH = 80;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const Card = ({
  priority = 'High',
  title = 'To do title',
  status = 'Todo',
  simultaneousHandlers,
}: TCard) => {
  const [isCheck, setIsScheck] = useState(status === 'Done');
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
        e.translationX + startX.value > -(RIGHT_ACTION_WIDTH - 20)
      ) {
        offset.value = e.translationX + startX.value;
      }
    })
    .onEnd(e => {
      if (e.translationX < 0) {
        offset.value = -(RIGHT_ACTION_WIDTH - 20);
      } else {
        offset.value = 0;
      }
    })
    .simultaneousWithExternalGesture(simultaneousHandlers);
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
      offset.value = -(RIGHT_ACTION_WIDTH - 20);
    } else {
      offset.value = 0;
    }
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.actionRightContainer}>
        <FontAwesome name="trash-o" color={COLORS.white} size={30} />
      </TouchableOpacity>
      <GestureDetector gesture={pan}>
        <AnimatedPressable
          style={[
            styles.container,
            {borderColor: cardBorderColor},
            cardAnimatedStyle,
          ]}
          onPress={onPress}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => setIsScheck(!isCheck)}>
            {isCheck && (
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
  title: {
    color: COLORS.gray,
    width: '80%',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightRed,
    borderRadius: 10,
  },
});
export default memo(Card);
