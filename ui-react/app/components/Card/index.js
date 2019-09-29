import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import { 
    Image,
    Icon,
    Text,
    Button
} from "@components";
import { 
    Images,
    BaseColor
} from "@config";

export default class Card extends Component {
    render() {
        const { style, children, styleContent, image, onPress, onPressLike, onPressFavourite, onPressFavouriteRemove, title1, title2, buttonTitle } = this.props;
        return (
            <TouchableOpacity
                style={style}
                onPress={onPress}
                onPressLike={onPressLike}
                onPressFavourite={onPressFavourite}
                onPressFavouriteRemove={onPressFavouriteRemove}
                activeOpacity={0.9}
                title1={title1}
                title2={title2}
                buttonTitle={buttonTitle}
            >
                <Image source={image} style={styles.imageBanner} />
                <View style={styleContent}>
                    <Text subhead whiteColor>
                        {title1}
                    </Text>
                    <Text headline whiteColor semibold>
                        {title2}
                    </Text>
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
                        <TouchableOpacity
                            onPressLike={onPressLike}
                            activeOpacity={0.9}
                        >
                            <Icon name="heart" color={BaseColor.whiteColor} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

Card.propTypes = {
    image: PropTypes.node.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    styleContent: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    onPress: PropTypes.func,
    onPressLike: PropTypes.func,
    onPressFavourite: PropTypes.func,
    onPressFavouriteRemove: PropTypes.func,
    title1: PropTypes.string,
    title2: PropTypes.string,
    buttonTitle: PropTypes.string
};

Card.defaultProps = {
    image: Images.profile2,
    style: {},
    styleContent: {
        position: "absolute",
        bottom: 0,
        padding: 10,
        right: 0,
        left: 0
    },
    onPress: () => {},
    onPressLike: () => {},
    onPressFavourite: () => {},
    onPressFavouriteRemove: () => {},
    title1: "",
    title2: "",
    buttonTitle: ""
};
