import React, { useState } from 'react';
import { Modal, View, StyleSheet, Button, Image } from 'react-native';
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

const ImagePickerModal = ({ visible, onSelect, onClose }: any) => {
    const [selectedImageuri, setSelectedImageuri] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleImagePicker = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response: ImagePickerResponse) => {
                if (response.assets && response.assets.length > 0) {
                    const asset: Asset = response.assets[0];
                    setSelectedImageuri(asset.uri);
                    setSelectedImage(asset);
                }
            },
        );
    };

    const handleDone = () => {
        onSelect(selectedImage);
        setSelectedImage(null);
    };

    return (
        <Modal animationType="slide" visible={visible}>
            <View style={styles.container}>
                {selectedImage && <Image source={{ uri: selectedImageuri }} style={styles.image} />}
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={onClose} />
                    <Button title="Done" onPress={handleDone} />
                </View>
                <Button title="Choose Photo" onPress={handleImagePicker} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 10,
    },
    image: {
        height: '70%',
        width: '100%',
        resizeMode: 'contain',
    },
});

export default ImagePickerModal;
