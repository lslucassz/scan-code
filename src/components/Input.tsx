import { StyleSheet, TextInput, TextInputProps } from "react-native";

export default function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput style={styles.container} {...rest}/>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#228b22',
        borderWidth: 2,
        width: '80%',
        borderRadius: 10,
        backgroundColor: 'white',
        textAlign: 'center',
        height: 45
    }
})