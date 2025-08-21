import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function Screencam() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if(!permission){
        // As permissões da câmera estão sendo carregadas
        return <View />;
    }

    if(!permission.granted){
        // As permissões da câmera ainda não foram concedidas
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', paddingBottom: 10 }}>Precisa da permissão para acessar a câmera</Text>
                <Button onPress={requestPermission} title="Garantir Permissão" />
            </View>
        );
    }
    

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.cameraView}
                barcodeScannerSettings={{
                    barcodeTypes: ['ean13']
                }}
                onBarcodeScanned={scanned ? undefined : (code) => {
                    setScanned(true);
                    router.push({
                        pathname: '/AddList',
                        params: { code: code.data, type: 'blocked' }
                    })
                }}
            >

            </CameraView>

            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: '/AddList'
                    })
                }}
                style={styles.button}>
                
                <Text style={styles.text}>
                    Colocar Código manualmente
                </Text>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center' 
    },
    cameraView: {
        flex: 1
    },
    button: {
        position: 'absolute',
        bottom: 100,
        width: '60%',
        backgroundColor: '#27bb02ff',
        height: 60,
        justifyContent: 'center',
        borderRadius: 10,
        alignSelf: 'center'
    },
    text: {
         textAlign: 'center',
         color: 'white',
         fontSize: 16,
         fontWeight: 'bold' 
    }
})