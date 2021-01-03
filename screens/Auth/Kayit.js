import React, { Component } from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Card, Text, Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import Colors from '../../utils/color';

class Kayit extends Component {
    state = {
        loading: false,
        user: null,
        email: null,
        passord: null,
    };
    constructor(props) {
        super(props);
    }

    createUserWithEmailAndPassword() {
        const { email, password } = this.state;
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                return res;
            })
            .catch(err => {
                console.log(err);
                alert(err + ' Giriş yapmalısınız.');
                throw new Error(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>

                <Card
                    title='Hesap Oluştur'
                    containerStyle={styles.card}
                >
                    {(this.state.loading) ? <ActivityIndicator size='large' /> : null}
                    <Input
                        placeholder='E-mail'
                        leftIcon={
                            <Icon
                                name='envelope'
                                color='black'
                            />
                        }
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <Input
                        placeholder='Şifre'
                        leftIcon={
                            <Icon
                                name='lock'
                                color='black'
                            />
                        }
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <Button
                        icon={{
                            name: "sign-up",
                            type: 'font-awesome',
                            size: 15,
                            color: "white"
                        }}
                        disabled={!(this.state.email && this.state.password)}
                        buttonStyle={{ backgroundColor: Colors.primary }}
                        loading={false}
                        raised
                        title="Kayıt Ol"
                        onPress={() => this.createUserWithEmailAndPassword()}
                    >
                    </Button>

                </Card>
                <View>
                    <Text style={{ textAlign: 'center', fontSize: 16, padding: 15 }}>Zaten hesabınız var mı?</Text>
                    <Button
                        icon={{
                            name: "sign-in",
                            type: 'font-awesome',
                            size: 15,
                            color: "white"
                        }}
                        buttonStyle={{ backgroundColor: Colors.primary }}
                        titleStyle={{ color: 'white' }}
                        loading={false}
                        raised
                        title="Giriş"
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                    </Button>
                </View>
            </View>
        );
    }
}

export default Kayit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Colors.primary
    },
    card: {
        width: '75%',
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    buttonContainer: {
        top: 20
    },
    button: {
        backgroundColor: Colors.secondry,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 50,
    }
})
