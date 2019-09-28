import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    imgBanner: {
        width: "100%",
        height: 250,
        position: "absolute"
    },
    contentImageFollowing: {
        flexDirection: "row",
        height: Utils.scaleWithPixel(160),
        marginTop: 10
    },
    contentButtonBottom: {
        borderTopColor: BaseColor.textSecondaryColor,
        borderTopWidth: 1,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
