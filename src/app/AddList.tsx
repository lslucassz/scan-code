import { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import Input from "../components/Input";
import Button from "../components/Button";

export default function AddList() {
    
    const [codeA, setCodeA] = useState('Código do Produto');
    const [name, setName] = useState('Nome do Produto');
    const [quantity, setQuantity] = useState('Quantidade');
    const [scan, setScan] = useState(false);

    const { code, type } = useGlobalSearchParams();

    const { getItem } = useAsyncStorage('@product_list');

    // Atualiza o estado com os dados do produto se já existir
    const update = async () => {
        const item = await getItem();
        const list = item ? JSON.parse(item) : [];
        
        // verifica se o código já exoste na lista e atualiza o nome e quantidade
        list.map((item: any) => {
            if (item.code === code ) {
                setCodeA(item.code);
                setName(item.name)
                setQuantity(item.quantity);
            }
        });
        
    }

    const updateList = async () => {
        // Atuzaliza ou adiciona o produto
        const item = await getItem();
        const products = item ? JSON.parse(item) : [];
        // Verifica se o produto já existe
        const existing = products.findIndex((product: any) => product.code === codeA);
        if (existing !== -1) {
            products.map((product: any) => {
                if (product.code === codeA) {
                    setName(product.name);
                    setQuantity(product.quantity);
                }
            })
        } else {
            setName('Nome do Produto');
            setQuantity('Quantidade');
        }
    }

    // Verifica se o código já foi escaneado
    const scanned = () => {
        if (type === 'blocked') {
            setScan(false)
        } else {
            setScan(true)
        }
    }

    useEffect(() => {
        if (code) {
            setCodeA(code as string);
        }
        update();
        updateList();
        scanned();
    }, [codeA])
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>📦 Cadastrar/Atualizar Produto</Text>
            

            <View style={styles.input}>
                
                {scan ? <Input placeholder={codeA} onChangeText={setCodeA} /> : <Input placeholder={codeA} onChangeText={setCodeA} editable={false} />}
                <Input placeholder={name} onChangeText={setName} />
                <Input placeholder={quantity} keyboardType="numeric" onChangeText={setQuantity} />
            </View>
            
            

            <View style={styles.button}>
                <Button onPress={async () => {
                    // Deletar o item existente
                    // await useAsyncStorage('@product_list').removeItem()
                    // Adicionar um novo item e atualizar caso o code já exista

                    // Atuzaliza ou adciona o produto
                    const item = await getItem();
                    const products = item ? JSON.parse(item) : [];
                    const newProduct = {
                        name: name,
                        quantity: quantity,
                        code: codeA
                    }
                    // Verifica se o produto já existe
                    const existing = products.findIndex((product: any) => product.code === codeA);
                    if (existing !== -1) {
                        products[existing] = newProduct;
                    } else {
                        products.push(newProduct);
                    }
                    // Atualiza o AsyncStorage
                    await useAsyncStorage('@product_list').setItem(JSON.stringify(products));
                    router.push('/Home');
                    
                }}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 30,
        justifyContent: 'space-evenly',
        paddingVertical: '20%'
    },
    viewCode: {
        borderColor: '#228b22',
        borderWidth: 2,
        width: '80%',
        borderRadius: 10,
        backgroundColor: 'white',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingTop: '20%',
    },
    input: {
        width: '100%',
        alignItems: 'center',
        gap: 16
    },
    text: {
        fontSize: 24,
        color: 'white',
        width: '70%',
        textAlign: 'center',
    }
})