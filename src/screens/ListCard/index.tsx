import {View, ListRenderItemInfo, FlatListProps} from 'react-native';
import React, {useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Card from '@components/Card';
import {useAtom} from 'jotai';
import {updateTaskStatus} from '@state/store';
import FormAddTask from '@screens/HomeScreen/components/FormAddTask';
type Props = {
  data?: ITask[];
} & Partial<FlatListProps<any>>;
const ListCard = ({data = [], ...rest}: Props) => {
  const ref = useRef<FlatList>(null);
  const [, updateTaskStatusAtom] = useAtom(updateTaskStatus);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState<Partial<ITask>>({});

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
