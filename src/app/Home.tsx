import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Animated } from "react-native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {

    // Estado para controlar a visibilidade do botão
    const [showButton, setShowButton] = useState(true);
    const lastOffset = useRef(0);

    const [data, setData] = useState<any[]>([]);

    // Acessando o AsyncStorage com a chave '@product_list'
    const { getItem, setItem } = useAsyncStorage('@product_list');

    // Mudar a visibilidade do botão na rolagem
    const handleScroll = (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        // Se o usuário está rolando para baixo e a posição é maior que 0, mostrar o botão
        if(currentOffset > lastOffset.current && currentOffset > 0) {
            setShowButton(false);
        } else if (currentOffset < lastOffset.current) {
            // Se o usuário está rolando para cima, esconder o botão
            setShowButton(true);
        }
        // Atualiza o último offset
        lastOffset.current = currentOffset;
    };

    // Função para deletar um produto
    const handleDelete = async (code: string) => {
        const item = await getItem();
        const products = item ? JSON.parse(item) : [];
        // Filtra os produtos para remover o produto com o código especificado
        const filtered = products.filter((product: any) => product.code !== code);
        await setItem(JSON.stringify(filtered));
        setData(filtered);
    }

    // Funcção para buscar os produtos do AsyncStorage
    const getProducts = async () => {
        const item = await getItem();
        // Se houver dados, parse o JSON, caso contrário, defina como um array vazio
        setData(item ? JSON.parse(item) : []);
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <View style={styles.container}>

            <View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.code?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.code} style={styles.viewCard}
                            onPress={() => router.push({
                                pathname: '/AddList',
                                params: { code: item.code, type: 'blocked' }
                            })}>
                            <View style={{ width: 350,  }}>
                                <Text numberOfLines={1} style={styles.text}>Nome: {item.name}</Text>
                                <Text style={styles.text}>Quantidade: {item.quantity}</Text>
                                <Text style={styles.text}>Código: {item.code}</Text>
                            </View>

                            <TouchableOpacity style={styles.delete} onPress={() => handleDelete(item.code)}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                            </TouchableOpacity>
                            
                        </TouchableOpacity>
                    )}
                    onScroll={handleScroll}
                    // Use o evento animado para rastrear a posição de rolagem
                    scrollEventThrottle={50}
                    showsVerticalScrollIndicator={false}
                />

            </View>
            
            {
                // Redenderiza o botão flutuante apenas quando o showButton é true
                showButton && (
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/Screencam')}>
                        <MaterialIcons name="add" size={40} color="white" />
                    </TouchableOpacity>
                )
            }
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: '10%'
    },
    viewCard: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#228b22',
        width: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        height: 80,
        flexDirection: 'row'
    },
    button: {
        bottom: '11%',
        left: '33%',
        width: 70,
        height: 70,
        borderRadius: 30,
        backgroundColor: '#228b22',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16
    },
    delete: {
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
    }
})