import React, { Component } from "react";
import { store, persistor } from "app/store";
import { StatusBar } from "react-native";
import { BaseColor } from "@config";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import I18n from "react-native-i18n";
import App from "./navigation";

console.disableYellowBox = true;

export default class index extends Component {
    constructor(props) {
        super(props);

        /**
         * Define translation
         * 
         * @author Passion UI <passionui.com>
         * @date 2019-08-03
         */
        I18n.fallbacks = true;
        I18n.translations = {
            en: require("./lang/en.json"),
            ko: require("./lang/ko.json"),
            vi: require("./lang/vi.json")
        };
    }

    componentDidMount() {
        StatusBar.setBackgroundColor(BaseColor.primaryColor, true);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}
