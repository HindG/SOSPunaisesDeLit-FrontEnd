import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import BackgroundImg from '../assets/background-shapes.png';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Bienvenue sur SOS Punaises de lit</Text>
        <Text style={styles.subtitle}>L'application pour signaler les punaises de lit</Text>
      </View>
      <View style={styles.btncontainer}>
        <Button
          color="#DB5A42"
          title="Signaler un incident"
          onPress={() => navigation.navigate('Form')}
        />
      </View>
      <View style={styles.btncontainer}>
        <Button
          color="#DB5A42"
          title="Visualiser la carte"
          onPress={() => navigation.navigate('Map')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titlecontainer: {
    position: "absolute",
    top: 70,
    paddingHorizontal: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8E5CE',
    backgroundImage: `url(${BackgroundImg})`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btncontainer: {
    marginBottom: 50,
  }
});
