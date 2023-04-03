import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Notification, fetchNotifications, markAsRead, selectNotifications, selectNotificationsStatus } from '../../redux/slice/NotificationSlice'
import { AppDispatch, RootState } from '../../redux';
import UserAuth from '../../features/hooks/UserAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigations';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SvgLike from '../../components/Icons/Like';
import SvgComment from '../../components/Icons/Comment';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';

const NotificationScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [status, userId, loading] = UserAuth();
    const dispatch = useDispatch<AppDispatch>();
    const notifications = useSelector((state: RootState) => selectNotifications(state));
    const loadingnot = useSelector((state: RootState) => selectNotificationsStatus(state))
    useEffect(() => {
        if (userId)
            dispatch(fetchNotifications(userId));
    }, [dispatch, userId]);

    const handleNotificationPress = (notificationId: string, postId: string) => {
        if (notificationId) {
            dispatch(markAsRead(notificationId));
            navigation.navigate("Comment", postId)
        }
    };

    const handleRefresh = () => {
        dispatch(fetchNotifications(userId));

    }

    const renderItem = ({ item }: { item: Notification }) => {
        const { userBy, type, post, date, isRead } = item;
        const timeSinceCreated = moment(item.date).fromNow();

        const notificationText = `${userBy.username} ${type === 'like' ? 'liked' : 'commented on'} your post`;

        return (
            <TouchableOpacity
                style={[styles.notification, isRead && styles.readNotification]}
                onPress={() => item._id && handleNotificationPress(item._id, post._id)}
            ><View style={styles.icon}>
                    {
                        type == 'like' ? <SvgLike stroke={"#2E8AF6"} /> : <SvgComment stroke={"#F62E8E"} />
                    }
                </View>

                <View>
                    <Text style={styles.notificationText}>{notificationText}</Text>
                    <Text style={styles.notificationDate}>{timeSinceCreated}</Text>
                </View>

            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {
                loadingnot == 'pending' ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator /></View> :
                    notifications.length > 0 ? (
                        <SectionList
                            sections={notifications}
                            onRefresh={handleRefresh}
                            refreshing={false}
                            keyExtractor={(item) => item._id}
                            renderItem={renderItem}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={styles.sectionHeader}>{title}</Text>
                            )}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <Text>No notifications</Text>
                    )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        color: "#727477",
        fontWeight: '400',
        fontSize: 16,
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: "#323436",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    notification: {
        flexDirection: "row",
        backgroundColor: '#323436',

        // backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom: 10,
        gap: 12,
        borderRadius: 5,

    },
    readNotification: {
        backgroundColor: '#1c1c1c',
    },
    notificationText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    notificationDate: {
        fontSize: 12,
        color: '#999',
    },
});

export default NotificationScreen;