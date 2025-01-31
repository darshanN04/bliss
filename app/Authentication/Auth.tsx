import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import errorMap from 'zod/lib/locales/en'

const authschema = zod.object({
    email: zod.string().email({ message: 'Invalid email address' }),
    password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})
const Auth = () => {
    const {} = useForm({
        resolver: zodResolver(authschema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const signIn = (data: zod.infer<typeof authschema>) => {
        console.log(data);
    };

  return (
    <ImageBackground
    source={{
        uri: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    }}
    style={styles.backgroundImage}
    
    >

    </ImageBackground>
  )
}

export default Auth

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
})