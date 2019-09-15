import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Icon, Button } from "@components";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "@config";
export default class PostItem extends Component {
    render() {
        const {
            style,
            children,
            title,
            description,
            onPress,
            image,
            onPressLike, 
            onPressFavourite, 
            onPressFavouriteRemove,
            buttonTitle
        } = this.props;
        return (
            <View 
                style={styles.mainContent} 
                onPressLike={onPressLike}
                onPressFavourite={onPressFavourite}
                onPressFavouriteRemove={onPressFavouriteRemove}
                buttonTitle={buttonTitle}
            >
                {children}
                <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                    <Image style={styles.imagePost} source={image} />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text headline semibold style={{ marginBottom: 6 }}>
                        {title}
                    </Text>
                    <Text body2>{description}</Text>
                    <View
                        style={styles.contentButtonLike}
                    >
                        <View>
                            <Button
                                style={styles.btnFavourite}
                                onPressFavourite={onPressFavourite}
                            >
                                <Text body2 semibold whiteColor>
                                    {buttonTitle}
                                </Text>
                            </Button>
                        </View>
                        <View 
                            style={styles.btnLike}
                        >
                            <TouchableOpacity
                                onPressLike={onPressLike}
                                activeOpacity={0.9}
                            >
                                <Icon name="heart" size={18} />
                            </TouchableOpacity>
                            <Text
                                caption1
                                grayColor
                                style={{
                                    marginLeft: 3
                                }}
                                numberOfLines={1}
                            >
                                100
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

PostItem.propTypes = {
    image: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    onPressLike: PropTypes.func,
    onPressFavourite: PropTypes.func,
    onPressFavouriteRemove: PropTypes.func,
    buttonTitle: PropTypes.string
};

PostItem.defaultProps = {
    image: "",
    title: "",
    description: "",
    style: {},
    onPress: () => {},
    onPressLike: () => {},
    onPressFavourite: () => {},
    onPressFavouriteRemove: () => {},
    buttonTitle: ""
};
