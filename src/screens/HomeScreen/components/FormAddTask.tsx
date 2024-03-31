import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Portal} from 'react-native-portalize';
import {COLORS, width} from '@utils/colors';
import {TextInput} from 'react-native-gesture-handler';
import {useAtom} from 'jotai';
import {addTask, updateTask} from '@state/store';
import {ZoomIn, ZoomOut} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
type TPrority = 'High' | 'Medium';
type Props = {
  visible?: boolean;
  setIsVisible: (visible: boolean) => void;
  newTask: Partial<ITask>;
  setNewTask: Dispatch<SetStateAction<Partial<ITask>>>;
  type?: 'Add' | 'Edit';
};
type TRadioBtn = {
  isCheck?: boolean;
  txt: string;
  onPress?: () => void;
};
const RadioBtn = ({isCheck, txt, onPress}: TRadioBtn) => {
  return (
    <TouchableOpacity style={styles.radioBtnContainer} onPress={onPress}>
      <View style={styles.outer}>
        {isCheck && <View style={styles.inner} />}
      </View>
      <Text style={[styles.label, {fontSize: 14}]}>{txt}</Text>
    </TouchableOpacity>
  );
};
const FormAddTask = ({
  visible = true,
  setIsVisible,
  newTask,
  setNewTask,
  type = 'Add',
}: Props) => {
  const [, addTaskAtom] = useAtom(addTask);
  const [, updateTaskAtom] = useAtom(updateTask);
  const onPress = (txt: TPrority) => {
    if (newTask.priority === txt) return;
    setNewTask(prevValue => ({
      ...prevValue,
      priority: txt,
    }));
  };

  const [error, setError] = useState(false);
  const onChangeText = (field: string, value: string) => {
    setNewTask(prevValue => ({
      ...prevValue,
      [field]: value,
    }));
  };
  const onAddTask = () => {
    if (newTask.taskName === '') {
      setError(true);
      return;
    }
    if (error) {
      setError(false);
    }

    if (type === 'Add') {
      const newItem: ITask = {
        id: Math.floor(Math.random() * 1000).toFixed(),
        taskName: newTask.taskName!,
        description: newTask.description,
        priority: newTask.priority!,
        createdAt: new Date().getTime(),
        status: 'Todo',
      };
      addTaskAtom({newItem});
    } else {
      updateTaskAtom({task: {...(newTask as ITask)}});
    }

    setIsVisible(false);
  };
  if (visible)
    return (
      <Portal>
        <Animated.View style={styles.container}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setIsVisible(false)}
          />
          <Animated.View
            style={styles.box}
            entering={ZoomIn.delay(500)}
            exiting={ZoomOut}>
            <Text style={styles.title}>{type} Task</Text>
            <Text style={styles.label}>Task name</Text>
            <TextInput
              style={styles.input}
              defaultValue={newTask.taskName}
              onChangeText={value => onChangeText('taskName', value)}
            />
            {error && (
              <Text style={styles.error}>Please fill in this field</Text>
            )}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              defaultValue={newTask.description}
              onChangeText={value => onChangeText('description', value)}
            />
            <Text style={styles.label}>Priority</Text>
            <View style={[styles.radioBtnContainer, {gap: 20}]}>
              <RadioBtn
                isCheck={newTask.priority === 'High'}
                txt="High"
                onPress={() => onPress('High')}
              />
              <RadioBtn
                isCheck={newTask.priority === 'Medium'}
                txt="Medium"
                onPress={() => onPress('Medium')}
              />
            </View>
            <TouchableOpacity style={styles.buttonAdd} onPress={onAddTask}>
              <Text style={styles.buttonTitle}>{type}</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Portal>
    );
};
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000099',
  },
  box: {
    width: width * 0.9,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: COLORS.black,
  },
  error: {
    fontSize: 14,
    color: COLORS.red,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  radioBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  outer: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: COLORS.blue,
  },
  buttonAdd: {
    width: width * 0.8,
    backgroundColor: COLORS.blue,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonTitle: {
    color: COLORS.white,
    fontWeight: '800',
  },
});
export default FormAddTask;
