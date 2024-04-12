import {View, ListRenderItemInfo, FlatListProps} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Card from '@components/Card';
import {useAtom, useAtomValue} from 'jotai';
import {Tasks, addTask, updateTaskStatus, addTasks} from '@state/store';
import FormAddTask from '@screens/HomeScreen/components/FormAddTask';
import {PATH} from '@services/path';
import {API_GET, API_PUT, TResponse} from '../../services/api';
import {API_POST} from '@services/api';
import DeviceInfo from 'react-native-device-info';
import {FA6Style} from 'react-native-vector-icons/FontAwesome6';
type Props = {} & Partial<FlatListProps<any>>;
const ListCard = ({...rest}: Props) => {
  const ref = useRef<FlatList>(null);
  const [, updateTaskStatusAtom] = useAtom(updateTaskStatus);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState<Partial<ITask>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);
  const [, addTasksAtom] = useAtom(addTasks);
  const tasks = useAtomValue(Tasks);
  const loadMoreTasks = async () => {
    const userId = await DeviceInfo.getUniqueId();
    if (!hasMoreData) return;
    setIsLoading(true);
    try {
      const res = await API_GET({
        url: PATH.TODO.GET_TODO,
        params: {
          userId: userId,
          page: currentPage,
          limit: 8,
        },
      });
      if (res.data && Array.isArray(res.data)) {
        const newTasks: ITask[] = res.data;
        addTasksAtom({newTasks: newTasks});
        if (newTasks.length === 0) {
          setHasMoreData(false);
        } else setCurrentPage(currentPage + 1);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  const onEndReached = () => {
    if (!isLoading) {
      loadMoreTasks();
    }
  };

  const renderItem = ({item, index}: ListRenderItemInfo<ITask>) => {
    return (
      <View key={index}>
        <Card
          userId=""
          _id={item._id}
          taskName={item.taskName}
          status={item.status}
          priority={item.priority}
          simultaneousHandlers={ref}
          description={item.description}
          onUpdateTaskStatus={async () => {
            // update db

            updateTaskStatusAtom({task: item});
            await API_PUT({
              url: PATH.TODO.UPDATE_TODO,
              request: {
                ...item,
                status: !item.status,
              },
            })
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.error(error);
              });
          }}
          onEditTask={() => {
            setTaskEdit(item);
            setOpenEdit(true);
          }}
        />
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        removeClippedSubviews
        renderToHardwareTextureAndroid
        simultaneousHandlers={ref}
        ref={ref}
        {...rest}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.9}
        // paging

        //onScroll={}
      />
      {openEdit && (
        <FormAddTask
          visible={openEdit}
          setIsVisible={setOpenEdit}
          newTask={taskEdit!}
          setNewTask={setTaskEdit}
          type={'Edit'}
        />
      )}
    </>
  );
};

export default ListCard;
