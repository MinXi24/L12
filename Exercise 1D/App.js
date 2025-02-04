import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {Barometer} from "expo-sensors";

const styles = StyleSheet.create({
    container: {
        flex: 1,                    // Makes the View take up the full screen
        justifyContent: 'center',    // Centers content vertically
        alignItems: 'center',        // Centers content horizontally
    },
    text: {
        fontSize: 24,
        marginBottom: 10,            // Adds spacing between lines
    },
});


export default function App() {

  const [{pressure, relativeAltitude},setData] = useState({pressure:0,relativeAltitude:0});

  useEffect(()=> {
      Barometer.setUpdateInterval(100);
    const subscription = Barometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View>
      <StatusBar/>
        <Text></Text>
        <Text></Text>
      <Text style={styles.text}>Pressure: {pressure}</Text>
      <Text style={styles.text}>Relative Altitude: {relativeAltitude}</Text>
    </View>
  );
}


