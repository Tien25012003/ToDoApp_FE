import {
  View,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  VirtualizedList,
} from 'react-native';
import React, {useRef} from 'react';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Card from '@components/Card';
type Props = {
  data?: ITask[];
};
const ListCard = ({data = []}: Props) => {
  const ref = useRef<ScrollView>(null);
  const renderItem = ({item, index}: ListRenderItemInfo<ITask>) => {
    return (
      <View key={index}>
        <Card
          title={item.title}
          status={item.status}
          priority={item.priority}
          simultaneousHandlers={ref}
        />
      </View>
    );
  };
  // return (
  //   <FlatList
  //     data={data}
  //     renderItem={renderItem}
  //     removeClippedSubviews
  //     renderToHardwareTextureAndroid
  //     simultaneousHandlers={ref}
  //     ref={ref}
  //   />
  // );
  return (
    <ScrollView ref={ref}>
      {data.map((item, index) => (
        <View key={index}>
          <Card
            title={item.title}
            status={item.status}
            priority={item.priority}
            simultaneousHandlers={ref}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default ListCard;
