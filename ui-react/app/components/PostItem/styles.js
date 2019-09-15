import { StyleSheet } from "react-native";
import { BaseColor } from "@config";
import * as Utils from "@utils";

export default StyleSheet.create({
    imagePost: { width: "100%", height: Utils.scaleWithPixel(220) },
    content: {
        marginHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: BaseColor.textSecondaryColor,
        borderBottomWidth: 1
    },
    mainContent: {
        paddingVertical: 10
    },
    contentButtonLike: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    btnFavourite: {
        height: 25,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnFavouriteRemove: {
        height: 25,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5,
        opacity: 0.7
    },
    btnLike: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});
