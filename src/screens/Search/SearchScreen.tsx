import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SvgSearch from '../../components/Icons/Search'
import { AppDispatch, StoreType } from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers } from '../../redux/slice/SearchSlice'
import SearchedUser from '../../components/User/SearchedUser'
import UserAuth from '../../features/hooks/UserAuth'

const SearchScreen = () => {
    const [status, userId, loadingd] = UserAuth()

    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = useState<any>('');
    const { results, loading, error } = useSelector((state: StoreType) => state.searchSlice);
    useEffect(() => {
        if (searchQuery) {
            dispatch(searchUsers(searchQuery));
        }
    }, [searchQuery, dispatch]);
    return (
        <SafeAreaView>
            <View style={styles.inputwrap}>
                <TextInput style={styles.input}
                    placeholder='Search for people'
                    onChangeText={setSearchQuery}
                    placeholderTextColor={"#ECEBED"}
                />
                <TouchableOpacity style={{ right: 20 }}>
                    <SvgSearch stroke={'#fff'} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={results.filter((e: any) => e._id != userId)}
                // keyExtractor={({ item }: any) => item._id}

                renderItem={({ item, index }) => <SearchedUser item={item} index={index} />}
            />
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    inputwrap: {
        marginHorizontal: 24,
        flexDirection: "row",
        backgroundColor: "#323436",
        borderRadius: 32,
        height: 44,
        paddingHorizontal: 16,
        paddingVertical: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        color: "#ECEBED",
        width: "100%"
    },
    comments: {
        fontSize: 12,
        color: "#ECEBED",
        letterSpacing: 2
    },
})