import React,{useState, useEffect} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {Accelerometer} from "expo-sensors";

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

  const [{x,y,z},setData] = useState({x:0,y:0,z:0});

  useEffect(()=> {
      Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View>
      <StatusBar/>
        <Text></Text>
        <Text></Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
    </View>
  );
}


