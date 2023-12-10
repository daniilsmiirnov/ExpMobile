import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export interface ObjectInt {
    ID_Object: number;
    Name_Obj: string;
    Region: string;
    Year: number;
    Opener: string;
    Status: string;
    Image_Url: string;
  }
interface ObjectCardProps {
  object: ObjectInt; // Принимаем объект типа ObjectInt
  onPress: () => void; // Функция, которая будет вызвана при нажатии на карточку
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object, onPress }) => {
    console.log('Image URL:', object.Image_Url);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: object.Image_Url }} style={styles.image} />
      <View style={styles.details}> 
        <Text style={styles.title}>{object.Name_Obj}</Text>
        <Text style={styles.region}>{object.Region}</Text>
        <Text style={styles.year}>{object.Year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  region: {
    fontSize: 16,
    color: 'gray',
  },
  year: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ObjectCard;
