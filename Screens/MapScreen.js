import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";

export default function MapScreen({ navigation }) {
  const [MarkersList, setMarkersList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://node-postgres-cloudinary-b3575d43839e.herokuapp.com/map_points')
      setMarkersList(response.data);
    } catch (error) {
      console.log('error is:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 46.227638,
          longitude: 2.213749,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}>
        {MarkersList.map((marker, index) => {
          return (
            <Marker
              key={index}
              coordinate={marker.coordinates}
              title={marker.title}
              description={marker.description}
            />
          )
        })}
      </MapView>
      <View style={styles.formbtncontainer}>
        <Button
          color="#A57F60"
          title="Signaler un incident"
          onPress={() => navigation.navigate('Form')}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E5CE',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
  },
  formbtncontainer: {
    position: "absolute",
    width: 180,
    bottom: 60,
    marginLeft: Dimensions.get('window').width / 2 - 90,
  }
});
