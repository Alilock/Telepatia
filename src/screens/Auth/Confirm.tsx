import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StoreType } from '../../redux'
import { confirmEmail } from '../../redux/slice/AuthSlice'
import { ActivityIndicator, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Confirm = ({ navigation }: any) => {
    const state = useSelector((state: StoreType) => state.authSlice);
    const loading = state.loading
    const token = state.token;
    const error = state.error
    const dispatch = useDispatch<AppDispatch>()
    const [otp, setOtp] = useState("");
    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
    const submitConfirm = async () => {
        const payload: any = {
            email: state.email,
            confirmCode: parseInt(otp)
        }

        dispatch(confirmEmail(payload))
    }


    useEffect(() => {
        if (token) {
            AsyncStorage.setItem('userId', state.userId)
            AsyncStorage.setItem("@token", state.token);
            navigation.navigate("AppStack")
        }

    }, [token])
    const handleTextChange = (text: string, index: number) => {

        if (text.length === 1 && index < inputRefs.current.length - 1) {
            const nextInput = inputRefs.current[index + 1];
            nextInput?.focus();
        }
        const otpArray = otp.split('');
        otpArray[index] = text;
        setOtp(otpArray.join(''));
    };

    // useEffect(() => {
    //     // animationRef.current?.play()
    //     // if (otp.length == 4) {
    //     //     submitConfirm()
    //     // }
    // }, [otp])

    return (
        <KeyboardAvoidingView style={{
            backgroundColor: "#000",
            flex: 1
        }}>
            {loading == 'pending' ?
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator />
                </View>
                : (
                    <View>
                        <View style={{ marginHorizontal: 24 }}>
                            <LottieView
                                autoPlay
                                loop
                                style={{ width: '100%' }}
                                source={require('../../assets/animation/emailanim.json')}
                            />
                        </View>
                        <View style={styles.container}>

                            {[0, 1, 2, 3].map((i) => (
                                <TextInput
                                    key={i}
                                    style={styles.input}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    selectionColor="white"
                                    onChangeText={(text) => handleTextChange(text, i)}
                                    onSubmitEditing={() => {
                                        // If user taps the "Done" button on the last input field, dismiss keyboard
                                        if (i === inputRefs.current.length - 1) {
                                            inputRefs.current[i]?.blur();
                                        }
                                    }}
                                    onKeyPress={({ nativeEvent }: any) => {
                                        // If user taps the "Backspace" button on an empty input field, move focus to the previous one
                                        if (nativeEvent.key === 'Backspace' && nativeEvent.target === null && i > 0) {
                                            const prevInput = inputRefs.current[i - 1];
                                            prevInput?.focus();
                                        }
                                    }}
                                    ref={(ref) => (inputRefs.current[i] = ref)}
                                />
                            ))}

                        </View>
                        <Button onPress={submitConfirm}>Submit</Button>

                        <View style={styles.titles}>
                            <Text style={styles.title}>Confirm Email OTP code</Text>
                            <Text style={styles.desc}>Enter the code we sent to your email to start chatting with friends and family on our app!</Text>
                        </View>
                        {error && <Text style={styles.error}>{error}</Text>}

                    </View>
                )
            }
        </KeyboardAvoidingView>
    )
}

export default Confirm

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#fff"
    },
    titles: {
        alignItems: "center",
        marginTop: 60,

    },
    desc: {
        textAlign: "center",
        fontSize: 14,
        marginHorizontal: 28,
        marginTop: 20,
        color: "#797C7B"
    },
    container: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    input: {
        width: 40,
        height: 40,
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#24786D",
        borderRadius: 5,
        textAlign: 'center',
        color: "white"
    }, error: {
        color: "red"
    }
})