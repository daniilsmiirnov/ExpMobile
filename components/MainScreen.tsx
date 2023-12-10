import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import ObjectCard, { ObjectInt } from './ObjectCard';
import NavigationBar from './NavBar';
import NetworkInfo from 'react-native-network-info';

const MainScreen: React.FC = () => {
  const [objects, setObjects] = useState<ObjectInt[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<ObjectInt[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ObjectInt[]>('http://172.20.10.2:8000/object/');
        if (response.status === 200) {
          setObjects(response.data);
          setFilteredObjects(response.data);
        } else {
          throw new Error('Failed to get data from the server');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredObjects(objects);
    } else {
      const filtered = objects.filter(
        (object) =>
          object.Name_Obj.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredObjects(filtered);
    }
  }, [searchQuery, objects]);

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
    <View style={styles.container}>
      <NavigationBar />
      <TextInput
        style={styles.input}
        placeholder="Поиск по названию..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <FlatList
        data={filteredObjects}
        renderItem={renderObjectCard}
        keyExtractor={(item) => item.ID_Object.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:10,
  },
});

export default MainScreen;
