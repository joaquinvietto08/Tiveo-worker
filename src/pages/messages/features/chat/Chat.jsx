import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./ChatStyles";

const ChatItem = React.memo(
  ({ text, sender, timestamp, type, imageUrl, onImagePress }) => {
    const isMe = sender === "client";

    return (
      <>
        {type === "text" && (
          <View
            style={[
              styles.messages__chat__item,
              isMe
                ? styles.messages__chat__item__me
                : styles.messages__chat__item__other,
            ]}
          >
            <Text
              style={[
                styles.messages__chat__text,
                isMe && styles.messages__chat__text__me,
              ]}
            >
              {text}
            </Text>
            <Text
              style={[
                styles.messages__chat__time,
                isMe && styles.messages__chat__time__me,
              ]}
            >
              {timestamp}
            </Text>
          </View>
        )}

        {type === "image" && imageUrl && (
          <Pressable
            onPress={() => onImagePress?.(imageUrl)}
            style={[
              styles.messages__chat__imageContainer,
              isMe
                ? styles.messages__chat__image__me
                : styles.messages__chat__image__other,
            ]}
          >
            <Image
              source={{ uri: imageUrl }}
              style={styles.messages__chat__image}
            />
            <Text
              style={[
                styles.messages__chat__timeImage,
                isMe && styles.messages__chat__time__me,
              ]}
            >
              {timestamp}
            </Text>
          </Pressable>
        )}
      </>
    );
  }
);

const Chat = ({ data }) => {
  const listRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (listRef.current && data.length > 0) {
      listRef.current.scrollToOffset({ animated: true });
    }
  }, [data]);

  const renderItem = useCallback(
    ({ item }) => (
      <ChatItem
        text={item.text}
        imageUrl={item.imageUrl}
        type={item.type}
        sender={item.sender}
        timestamp={item.timestamp}
        onImagePress={(uri) => setPreviewImage(uri)}
      />
    ),
    []
  );

  return (
    <>
      <FlatList
        data={data}
        ref={listRef}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={styles.messages__chat__list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={styles.messages__chat__separator} />
        )}
        inverted
      />
      <Modal
        visible={!!previewImage}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewImage(null)}
      >
        <TouchableWithoutFeedback onPress={() => setPreviewImage(null)}>
          <View style={styles.messages__chat__fullscreenOverlay}>
            <Image
              source={{ uri: previewImage }}
              style={styles.messages__chat__fullscreenImage}
              resizeMode="contain"
            />
            <Text style={styles.messages__chat__fullscreenHint}>
              Tocá en cualquier lado para cerrar
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Chat;
