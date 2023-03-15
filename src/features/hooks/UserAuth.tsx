import { Alert, Text, View } from 'react-native'
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserAuth = () => {
    const [status, setStatus] = useState(false);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem("@token").then(data => {
            const token = JSON.stringify(data)
            console.log(token);
            if (token != 'null') {
                setStatus(true);
                setLoading(false);

            } else {
                setStatus(false)
                setLoading(false)
            }
        })

    }, [])

    return [status, loading];

}

export default UserAuth
