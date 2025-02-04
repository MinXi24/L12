import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";
import { Audio } from "expo-av";
import {Picker} from "@react-native-picker/picker"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink",
    },
    text: {
        fontSize: 50,
        fontWeight: "bold",
        color: "black",
    },
    picker: {
        height: 50,
        width: 200,
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 10,
    },
});

export default function App() {
    const [shake, setShake] = useState(false);
    const [mySound, setMySound] = useState();
    const [selectedSound, setSelectedSound] = useState("shake1");
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [lastZ, setLastZ] = useState(0);

    async function playSound() {
        const soundFiles = {
            shake1: require("./shake.wav"), // Change to your actual file paths
            shake2: require("./Shake2.wav"),
            shake3: require("./Shake3.mp3"),
        };
            const { sound } = await Audio.Sound.createAsync(soundFiles[selectedSound]);
            setMySound(sound);
            await sound.playAsync();
    }

    useEffect(() => {
        Gyroscope.setUpdateInterval(100);

        const subscription = Gyroscope.addListener(({ x, y, z }) => {
            if ((x - lastX > 0.2 || y - lastY > 0.2 || z - lastZ > 0.2) ||
                (x - lastX < -0.2 || y - lastY < -0.2 || z - lastZ < -0.2))  {
                setShake(true);
                playSound();
            } else {
                setShake(false);
            }

            setLastX(x);
            setLastY(y);
            setLastZ(z);
        });

        return () => subscription.remove();
    }, [selectedSound, lastX, lastY, lastZ]);

    return (
        <View style={styles.container}>
            <StatusBar />
            {shake && <Text style={styles.text}>SHAKE</Text>}
            <Picker
                selectedValue={selectedSound}
                onValueChange={(itemValue) => setSelectedSound(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Shake 1" value="shake1" />
                <Picker.Item label="Shake 2" value="shake2" />
                <Picker.Item label="Shake 3" value="shake3" />
            </Picker>
        </View>
    );
}
