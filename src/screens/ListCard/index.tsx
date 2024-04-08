import {View, ListRenderItemInfo, FlatListProps} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Card from '@components/Card';
import {useAtom} from 'jotai';
import {Tasks, addTask, updateTaskStatus, addTasks} from '@state/store';
import FormAddTask from '@screens/HomeScreen/components/FormAddTask';
import {PATH} from '@services/path';
import {API_GET, TResponse} from '../../services/api';


type Props = {
  data?: ITask[];
} & Partial<FlatListProps<any>>;
const ListCard = ({data = [], ...rest}: Props) => {
  const ref = useRef<FlatList>(null);
  const [, updateTaskStatusAtom] = useAtom(updateTaskStatus);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState<Partial<ITask>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [, addTasksAtom] = useAtom(addTasks);

  useEffect(() => {
    loadMoreTasks();
  }, []);

  const loadMoreTasks = async () => {
    if (!hasMoreData) return; 
    setIsLoading(true);
    try {
      const response = await API_GET({
        url: `${PATH.TODO.GET_TODO}/pagination`,
        params: { page: currentPage, limit: 8 },
      });
  
      console.log('current page:', currentPage);
      if (response.data && Array.isArray(response.data)) {
        const newTasks: ITask[] = response.data;
        console.log('New Tasks:', newTasks);
        console.log('Get tasks successfully!');
        addTasksAtom({ newTasks: newTasks });
        if (newTasks.length === 0) {
          setHasMoreData(false); 
        } else {
          setCurrentPage(currentPage + 1);
        }
      } else {
        console.error('Error fetching more tasks: Response data is invalid');
      }
    } catch (error) {
      console.error('Error fetching more tasks:', error);
    } finally {
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
          id={item.id}
          taskName={item.taskName}
          status={item.status}
          priority={item.priority}
          simultaneousHandlers={ref}
          description={item.description}
          onUpdateTaskStatus={() => {
            // update db
            updateTaskStatusAtom({task: item});
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
        data={data}
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
  // return (
  //   <ScrollView ref={ref}>
  //     {data.map((item, index) => (
  //       <View key={index}>
  //         <Card
  //           title={item.taskName}
  //           status={item.status}
  //           priority={item.priority}
  //           simultaneousHandlers={ref}
  //           description={item.description}
  //         />
  //       </View>
  //     ))}
  //   </ScrollView>
  // );
};

export default ListCard;
