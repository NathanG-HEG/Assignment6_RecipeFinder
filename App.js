import {StatusBar} from 'expo-status-bar';
import {Alert, Button, FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";

export default function App() {
    const [keyword, setKeyword] = useState('');
    const [meals, setMeals] = useState([]);

    const fetchRepositories = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
            .then(response => response.json())
            .then(data => setMeals(data.meals))
            .catch(error => {
                Alert.alert('Error', error);
            });
        console.log(meals);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={meals}
                renderItem={({item}) =>
                    <View style={{marginBottom: 11,}}>
                        <Text style={styles.boldText}>{item.strMeal}</Text>
                        <Image
                            style={{width: 60, height: 60, marginLeft: 5}}
                            source={{uri:item.strMealThumb}}
                        />
                    </View>
                }
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{height: 1, backgroundColor: 'lightblue', marginHorizontal: 5}}/>
                    )
                }}
            />
            <TextInput
                style={styles.textInput}
                onChangeText={text => setKeyword(text)}
                placeholder={'keyword'}
                placeholderTextColor={'grey'}
            />
            <Button
                title='Search'
                onPress={fetchRepositories}
            />
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 11,
        marginTop: 66,
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 16,
        padding: 5,
        marginTop: 11,
        minWidth: 200,
        marginBottom: 5
    },
    text: {
        paddingHorizontal: 5,
        fontSize: 14,
    },
    boldText: {
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 16
    }

});
