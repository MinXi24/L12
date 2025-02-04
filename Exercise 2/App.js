import React,{useState, useEffect} from 'react';
import {StatusBar, Button, StyleSheet, Text, View} from 'react-native';

import {Audio} from 'expo-av'
import {Sound} from "expo-av/build/Audio/Sound";

const styles = StyleSheet.create({
  container: {

  },
});


export default function App() {

    const [mySound, setMySound] = useState();

    async function playSound() {
        const soundfile = require(`./short1.wav`);
        const {sound} = await Audio.Sound.createAsync(soundfile);
        setMySound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return mySound
            ? () => {
                console.log("Unloading Sound");
                mySound.unloadAsync();
            }
            : undefined
    }, [mySound]);

  return (
    <View>
      <StatusBar />
        <Text></Text>
        <Text></Text>
        <Text></Text>

      <Button title="Play Sound" onPress={
      ()=>{
          playSound();
      }}
      />
    </View>
  );
}


