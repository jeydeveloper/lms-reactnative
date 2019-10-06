import React, { Component } from "react";
import { View } from "react-native";
import { Images, BaseColor } from "@config";
import { Text, Image, StarRating } from "@components";
import PropTypes from "prop-types";
import styles from "./styles";
import * as Utils from "@utils";
import {
  SelectMultipleButton,
  SelectMultipleGroupButton
} from "react-native-selectmultiple-button";

export default class CommentItem extends Component {
    render() {
        const { style, image, name, rate, date, title, comment, no } = this.props;
        return (
            <View style={[styles.contain, style]}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{marginRight: 10}}>
                        <Text subhead semibold>
                            {no}.
                        </Text>
                    </View>
                    <View>
                        <Text subhead semibold>
                            {title}
                        </Text>
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <SelectMultipleGroupButton
                      multiple={false}
                      group={[
                        { value: 'XC40, this is one of car series XC90 is a large SUV S90 is' },
                        { value: 'XC60 is a Sports Utility Vehicle' },
                        { value: 'XC90 is a large SUV' },
                        { value: 'S90 is a business car' }]}
                      textStyle={{ fontSize: 15, textAlign: 'left' }}
                      buttonViewStyle={{ alignItems: 'flex-start', borderWidth: 0, margin: 0, borderRadius: 0, width: "100%" }}
                      highLightStyle={{
                        borderColor: 'transparent', textColor: BaseColor.primaryColor, backgroundColor: 'transparent',
                        borderTintColor: 'transparent', textTintColor: 'white', backgroundTintColor: BaseColor.primaryColor
                      }}
                      containerViewStyle={{ flexDirection: 'column', height:150, justifyContent:'space-between'}}
                    />
                </View>
            </View>
        );
    }
}

CommentItem.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    image: PropTypes.node.isRequired,
    name: PropTypes.string,
    rate: PropTypes.number,
    date: PropTypes.string,
    title: PropTypes.string,
    comment: PropTypes.string,
    no: PropTypes.number
};

CommentItem.defaultProps = {
    style: {},
    image: Images.profile2,
    name: "",
    rate: 0,
    date: "",
    title: "",
    comment: "",
    no: 0
};
