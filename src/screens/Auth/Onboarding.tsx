import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SocialButton from '../../components/buttons/SocialButton'
import Button from '../../components/buttons/Button'
import BackButton from '../../components/buttons/BackButton'
const Onboarding = ({ navigation }: any) => {
    const gotoSignup = () => {
        navigation.navigate('SignUp')
    }
    return (
        <View style={{
            backgroundColor: "#1e1e1e",
            flex: 1

        }}>
            <Image
                source={require('../../assets/images/Ellipse.png')} style={{ position: "absolute", width: "100%" }} />
            <View style={styles.container}>
                <View style={styles.head}>

                    <Text style={styles.slogan}>Connect friends <Text style={{ fontWeight: "bold" }}>easily & quickly</Text></Text>
                    <Text style={styles.desc} >Our chat app is the perfect way to stay connected with friends and family</Text>
                </View>
                <View
                    style={{
                        flex: 0.4,
                    }}
                >
                    <View style={styles.socials}>
                        <SocialButton source={require("../../assets/images/fbicon.png")} />
                        <SocialButton source={require("../../assets/images/gmil.png")} />
                        <SocialButton source={require("../../assets/images/app.png")} />
                    </View>
                    <View style={styles.or}>
                        <View style={styles.line}></View>
                        <Text style={{ color: "#d6e4e0", fontSize: 14 }}>OR</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Button title='Sign up within mail' color='#fff' onPress={gotoSignup} />
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 46, justifyContent: "center" }}>
                        <Text style={{ color: "white", fontWeight: "200" }}>Existing account?</Text>
                        <TouchableOpacity><Text style={{ color: "white" }} onPress={() => { navigation.navigate('Login') }}> Log in</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >

    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24

    },
    head: {
        flex: 0.6,
        justifyContent: "flex-end",
    },
    slogan: {
        fontSize: 68,
        color: "white",
    },
    desc: {
        marginTop: 10,
        color: "#B9C1BE",
        opacity: 0.5,
        fontSize: 16

    },
    socials: {
        flexDirection: "row",
        marginTop: 38,
        justifyContent: "center",
        gap: 20
    },
    or: {
        marginTop: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    line: {
        height: 1,
        width: 132,
        opacity: 0.2,
        borderWidth: 1,
        borderColor: "#cdd1d0"
    }
})