import React from "react";
import { StyleSheet, LogBox } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import Shop from "./navigation/ShopNavigator";
import { useFonts } from "expo-font";
import cartReducer from "./store/reducers/cart";
import productReducer from "./store/reducers/products";
import orderReducer from "./store/reducers/orders";
import {drawerReducer} from "./store/reducers/drawer";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./store/reducers/auth";
import { StatusBar } from 'expo-status-bar';



// LogBox.ignoreLogs([
// 	"Non-serializable values were found in the navigation state",
// 	"Warning: Cannot update a component from inside the function body of a different component."
// ]);

const rootReducer = combineReducers({
	products: productReducer,
	cart: cartReducer,
	order: orderReducer,
	auth: authReducer,
	drawer: drawerReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

	const [loaded] = useFonts({
		"open-sans": require("./constants/fonts/Glory-Light.ttf"),
		"open-sans-bold": require("./constants/fonts/Glory-Bold.ttf"),
	});

	if (!loaded) {
		return null;
	}
	return (
		<Provider store={store}>
			<Shop />
			<StatusBar style='auto'/>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
