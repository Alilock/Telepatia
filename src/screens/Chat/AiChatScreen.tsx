import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OpenAIApi, ChatCompletionRequestMessage, Configuration } from 'openai';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import SvgBack from '../../components/Icons/Back';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigations';

const AiChatScreen: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>()

    const [messages, setMessages] = useState<IMessage[]>([]);
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    const sendMessage = useCallback(async (messages: IMessage[] = []) => {
        const messageText = messages[0].text;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: messageText,
            max_tokens: 1024
        })
        console.log("res", response.data.choices[0].text);
        const textAi: any = response.data.choices[0].text?.trim()
        const aiMessage: IMessage = {
            _id: Math.random().toString(36).substring(7),
            text: textAi,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'AI',
            },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [aiMessage]));
    }, []);

    const onSend = useCallback((newMessages: IMessage[] = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        sendMessage(newMessages);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <SvgBack stroke={"#000"} />
                </TouchableOpacity>
                <Text style={styles.title}>AI Chat</Text>

            </View>
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: 1,
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 16,
    },
});

export default AiChatScreen;
