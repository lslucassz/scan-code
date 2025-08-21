import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function Button({ ...rest }: TouchableOpacityProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#228b22',
        width: '80%',
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})