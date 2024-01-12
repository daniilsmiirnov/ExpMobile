import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import ObjectCard, { ObjectInt } from './ObjectCard';
import NavigationBar from './NavBar';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainScreen: undefined;
  ObjectDetailsScreen: { object: ObjectInt };
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  const [originalObjects, setOriginalObjects] = useState<ObjectInt[]>([]);
  const [filteredObjects, setFilteredObjects] = useState<ObjectInt[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await axios.get<ObjectInt[]>('http://172.20.10.2:8000/object/', {
        params: {
          name: searchQuery,
        },
      });
      if (response.status === 200) {
        setOriginalObjects(response.data);
        setFilteredObjects(response.data);
      } else {
        throw new Error('Failed to get data from the server');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', fetchData);
  //   return unsubscribe;
  // }, [navigation]);

  const handleDetailsPress = (object: ObjectInt) => {
    console.log('Details Pressed:', object.Name_Obj);
    navigation.navigate('ObjectDetailsScreen', { object });
  };

  const renderObjectCard = ({ item }: { item: ObjectInt }) => (
    <TouchableOpacity onPress={() => handleDetailsPress(item)}>
      <ObjectCard object={item} onDetailsPress={() => {}} />
    </TouchableOpacity>
  );

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
    marginTop: 10,
  },
});

export default MainScreen;
