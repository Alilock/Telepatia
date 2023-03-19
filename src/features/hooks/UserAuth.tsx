import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuth = () => {
    const [user, setUser] = useState<any>(null)
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem('userInfo').then((data: any) => {
            const user = JSON.parse(data)
            if (user) {
                setUser(user)
            }
        })
        AsyncStorage.getItem("@token").then(data => {
            const token = JSON.stringify(data)
            if (token != 'null') {
                setStatus(true);
                setLoading(false);


            } else {
                setStatus(false)
                setLoading(false)
            }
        })

    }, [])

    return [status, user, loading];

}

export default UserAuth
