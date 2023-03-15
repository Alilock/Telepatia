import { StyleSheet, Text, View, TextStyle, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'
import Button from '../../components/buttons/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { loginThunk, registerThunk } from '../../redux/slice/AuthSlice'
import { AppDispatch, StoreType } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
//error messages
const Login = ({ navigation }: any) => {
    const dispatch = useDispatch<AppDispatch>();

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
    })
    const state = useSelector((state: StoreType) => state.authSlice);
    const loading = state.loading
    const error = state.error

    const handleSubmit = (values: any) => {
        dispatch(loginThunk(values))

    }
    useEffect(() => {
        if (loading == 'fullfied') {
            navigation.navigate('Confirm')
        }

    }, [state.loading])


    return (
        <SafeAreaView style={{
            backgroundColor: "#1e1e1e",
            flex: 1
        }}>
            {
                loading == 'pending' ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <ActivityIndicator />
                </View> :
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={handleSubmit}
                        validationSchema={SignupSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={styles.titles}>
                                    <Text style={styles.titles.title}>Log in to Telepatia</Text>
                                    <Text style={styles.titles.desc}>Welcome back! Sign in using your social account or email to continue us</Text>
                                </View>
                                <View style={styles.form}>
                                    {error && <Text style={styles.error}>{error}</Text>}

                                    {errors.email && touched.email &&
                                        <Text style={styles.error}>{errors.email}</Text>
                                    }
                                    <TextInput
                                        label="Email"
                                        underlineColor='#24786D'
                                        activeUnderlineColor='#24786D'
                                        textColor='white'
                                        mode="flat"
                                        style={styles.input}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {errors.password && touched.password &&
                                        <Text style={styles.error}>{errors.password}</Text>
                                    }

                                    <TextInput
                                        label="Password"
                                        underlineColor='#24786D'
                                        activeUnderlineColor='#24786D'
                                        textColor='white'
                                        mode="flat"
                                        style={styles.input}
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />

                                </View>
                                <View style={{ marginHorizontal: 24, marginTop: 60 }}>
                                    <Button title='Login' color='#24786D' onPress={handleSubmit} />
                                </View>
                            </>
                        )}
                    </Formik>
            }

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    titles: {
        alignItems: "center",
        marginTop: 60,
        title: {
            fontWeight: 'bold',
            fontSize: 18,
            color: "#fff"
        } as TextStyle,
        desc: {
            textAlign: "center",
            fontSize: 14,
            marginHorizontal: 28,
            marginTop: 20,
            color: "#797C7B"
        } as TextStyle,

    },
    form: {
        marginHorizontal: 24,
        marginTop: 60,

    },
    input: {
        backgroundColor: "#1e1e1e",
        marginBottom: 30,
    },
    error: {
        color: "red"
    }
})