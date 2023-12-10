import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import ObjectCard, { ObjectInt } from './ObjectCard';
import NavigationBar from './NavBar';
import NetworkInfo from 'react-native-network-info';

const MainScreen: React.FC = () => {
  const [objects, setObjects] = useState<ObjectInt[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ObjectInt[]>('http://172.20.10.2:8000/object/');
        if (response.status === 200) {
          setObjects(response.data);
        } else {
          throw new Error('Failed to get data from the server');
        }
      } catch (error) {
        console.error(error);

      }
    };

    fetchData();
  }, []);

  const renderObjectCard = ({ item }: { item: ObjectInt }) => {
    return (
      <ObjectCard
        object={item}
        onPress={() => handleObjectPress(item)}
      />
    );
  };

  const handleObjectPress = (object: ObjectInt) => {

    console.log('Pressed:', object.Name_Obj);
  };

  return (
    <View>
      <NavigationBar /> 
      <FlatList
        data={objects}
        renderItem={renderObjectCard}
        keyExtractor={(item) => item.ID_Object.toString()}
      />
    </View>
  );
};

export default MainScreen;
