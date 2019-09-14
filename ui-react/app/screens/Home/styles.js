import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    imageBackground: {
        height: 140,
        width: "100%",
        position: "absolute"
    },
    searchForm: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BaseColor.fieldColor,
        backgroundColor: BaseColor.whiteColor,
        width: "90%",
        shadowColor: "black",
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1
    },
    contentServiceIcon: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    iconContent: {
        justifyContent: "center",
        alignItems: "center",
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: BaseColor.fieldColor,
        marginBottom: 10
    },
    promotionItem: {
        borderRadius: 8,
        width: Utils.scaleWithPixel(200),
        height: Utils.scaleWithPixel(250)
    }
});
