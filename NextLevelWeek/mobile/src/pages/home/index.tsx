import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api';
import axios from 'axios';
import toTitleCase from '../../lib/index';

interface UF {
    id: number;
    nome: string;
    sigla: string;
}

interface City {
    city: string;
}

const Home = () => {

    const [ufs, setUfs] = useState<UF[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [registeredUfs, setRegisteredUfs] = useState([]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const navigation = useNavigation();

    // Carrega UFs dos pontos cadastrados na API
    useEffect(() => {
        api.get(`ufs/`)
            .then(response => {
                setRegisteredUfs(response.data);
            })
    }, []);

    // Carrega UFs do IBGE conforme o que foi carregado no registeredUFs
    useEffect(() => {
        const loadUfs = (uf: string) => {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`)
                .then(response => {
                    console.log(response.data);
                    setUfs(prevUfs => ([...prevUfs,
                    response.data]))
                })
        }
        setUfs([]);
        registeredUfs.forEach(uf => loadUfs(uf));

    }, [registeredUfs]);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        api.get(`points/cities/${selectedUf}`)
            .then(response => {
                console.log(response.data);
                setCities(response.data);
            })
    }, [selectedUf]);


    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            selectedUf,
            selectedCity,

        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) => {
                            setSelectedUf(String(value));
                            setSelectedCity('0')
                        }}
                        placeholder={{ label: 'Selecione uma UF', value: 0 }}
                        items={ufs.map(item => ({ label: item.nome, value: item.sigla }))}
                    />

                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) =>
                            setSelectedCity(value)}
                        placeholder={{ label: 'Selecione uma Cidade', value: 0 }}
                        items={cities.map((item, index) => ({ label: toTitleCase(item.city), value: item.city, key: String(index) }))}
                    />

                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>

    );
}
const pickerSelectStyles = StyleSheet.create({
    viewContainer: {
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    inputAndroid: {
        color: '#322153'
    },

    inputIOS: {
        color: '#322153'
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
    picker: {
        height: 60,
        backgroundColor: '#FFF'
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;