import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, Pressable, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

function FormScreen({ navigation }) {
  const [name, setName] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [showIncidentDate, setShowIncidentDate] = useState(false);
  const [treatmentDate, setTreatmentDate] = useState(new Date());
  const [showTreatmentDate, setShowTreatmentDate] = useState(false);
  const [showThankyouModal, setShowThankyouModal] = useState(false);

  const postData = () => {
    const currentDate = new Date()
    const body = {
      "name": name,
      "coordinates": { "latitude": coordinates[0], "longitude": coordinates[1] },
      "signal_date": currentDate.toLocaleDateString(),
      "incident_date": incidentDate.toLocaleDateString(),
      "title": `Date de l'incident : ${incidentDate.toLocaleDateString()}`,
      "description": `Date de traitement : ${treatmentDate.toLocaleDateString()}`
    }
    axios.post('https://node-postgres-cloudinary-b3575d43839e.herokuapp.com/map_points', body)
      .then((response) => {
        setName("")
        setIncidentDate(new Date())
        setTreatmentDate(new Date())
        setCoordinates([])
        setShowThankyouModal(true)
      })
      .catch((error) => console.log(error))
  };

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>Signaler un incident</Text>
      </View>
      <Text style={styles.label}>Adresse de l'incident</Text>
      <GooglePlacesAutocomplete
        placeholder="Tapez l'adresse"
        query={{ key: process.env.GOOGLE_MAPS_API_KEY, components: 'country:fr' }}
        onPress={(data, details = null) => {
          setCoordinates([details.geometry.location.lat, details.geometry.location.lng])
          setName(data.description)
        }}
        fetchDetails={true}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        styles={styles.placecontainer}
      />
      <Text style={styles.label}>Date de l'incident</Text>
      <Pressable style={styles.dateinput} onPress={() => setShowIncidentDate(!showIncidentDate)}>
        <Text>{incidentDate.toLocaleDateString()}</Text>
      </Pressable>
      {showIncidentDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={incidentDate}
          mode="date"
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setShowIncidentDate(false)
            setIncidentDate(selectedDate)
          }
          }
          positiveButton={{ label: 'OK', textColor: "#DB5A42" }}
          negativeButton={{ label: 'Cancel', textColor: "#DB5A42" }}
        />
      )}
      <Text style={styles.label}>Date de traitement</Text>
      <Pressable style={styles.dateinput} onPress={() => setShowTreatmentDate(!showTreatmentDate)}>
        <Text>{treatmentDate.toLocaleDateString()}</Text>
      </Pressable>
      {showTreatmentDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={treatmentDate}
          mode="date"
          is24Hour={true}
          onChange={(event, selectedDate) => {
            setShowTreatmentDate(false)
            setTreatmentDate(selectedDate)
          }
          }
          positiveButton={{ label: 'OK', textColor: "#DB5A42" }}
          negativeButton={{ label: 'Cancel', textColor: "#DB5A42" }}
        />
      )}
      <View style={styles.btncontainer}>
        <Button
          color="#DB5A42"
          title="Envoyer"
          onPress={() => postData()}
          disabled={coordinates.length === 0}
        />
      </View>
      <View style={styles.mapbtncontainer}>
        <Button
          color="#A57F60"
          title="Visualiser la carte"
          onPress={() => navigation.navigate('Map')}
        />
      </View>
      {showThankyouModal &&
        <View style={styles.thankyoumodal}>
          <Pressable style={styles.thankyoumodalexit} onPress={() => setShowThankyouModal(false)}><Text style={styles.thankyoumodalexittext}>x</Text></Pressable>
          <Text style={styles.thankyoumodaltext}>Merci pour votre signalement !</Text>
        </View>
      }
    </View>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  placecontainer: {
    container: {
      flex: 0,
      width: 250,
      zIndex: 99,
    },
    description: {
      color: '#000',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#3caf50',
    },
  },
  container: {
    padding: 50,
    backgroundColor: '#F8E5CE',
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 15,
    color: "#858180",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 10,
  },
  btncontainer: {
    marginTop: 30,
    width: 80,
  },
  mapbtncontainer: {
    position: "absolute",
    width: 180,
    bottom: 60,
    marginLeft: Dimensions.get('window').width / 2 - 90,
  },
  dateinput: {
    backgroundColor: "#fff",
    width: 250,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    paddingLeft: 10,
  },
  thankyoumodal: {
    backgroundColor: "#A57F60",
    position: "absolute",
    width: 220,
    height: 100,
    justifyContent: "center",
    paddingLeft: 15,
    fontWeight: "bold",
    left: Dimensions.get('window').width / 2 - 110,
    top: Dimensions.get('window').height / 2 - 50,
    borderRadius: 5,
  },
  thankyoumodaltext: {
    fontWeight: "bold",
    color: "#fff",
  },
  thankyoumodalexit: {
    position: "absolute",
    top: 4,
    right: 8,
  },
  thankyoumodalexittext: {
    fontSize: 22,
  },
});