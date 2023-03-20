import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuth = () => {
    const [userId, setUser] = useState<any>(null)
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem('userId').then((data: any) => {

            if (data) {
                setUser(data)
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

    return [status, userId, loading];

}

export default UserAuth
