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
  object: ObjectInt;
  onDetailsPress: () => void; 
}

const ObjectCard: React.FC<ObjectCardProps> = ({ object, onDetailsPress }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: object.Image_Url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{object.Name_Obj}</Text>
        <Text style={styles.region}>{object.Region}</Text>
        <Text style={styles.year}>{object.Year}</Text>
      </View>
      <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
        <Text style={styles.buttonText}>Подробнее</Text>
      </TouchableOpacity>
    </View>
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
  detailsButton: {
    backgroundColor: '#171717',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ObjectCard;
