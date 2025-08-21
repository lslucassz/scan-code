import { StyleSheet, View } from "react-native";
import Home from "./Home";

export default function Index() {
    return (
        <View style={styles.container}>
            <Home />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})