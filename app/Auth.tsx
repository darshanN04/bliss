import { ImageBackground, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, DrawerLayoutAndroid } from 'react-native'
import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import errorMap from 'zod/lib/locales/en'
import {  Redirect, router } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/auth-provider'


const authschema = zod.object({
    email: zod.string().email({ message: 'Invalid email address' }),
    password: zod
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
})

const Auth = () => {
    const Toast = useToast();
    const{session}=useAuth();

    if(session) return <Redirect href="/Home" />
    const {control, handleSubmit, formState} = useForm({
        resolver: zodResolver(authschema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    
    const signIn = async (data: zod.infer<typeof authschema>) => {
        const {error} = await supabase.auth.signInWithPassword(data);
        if (error){
            alert(error.message);
        } else{
            Toast.show("Signed in succesfully",{
                type: 'success',
                placement: 'top',
                duration: 2000,
            });            
        }
    }

    const signUp = async (data: zod.infer<typeof authschema>) => {
        const { email, password } = data;
    
        const {
            data: { session },
            error,
          } = await supabase.auth.signUp({
            email: email,
            password: password,
          })
          console.log(data)
        if (error){
            alert(error.message);
        } else{
            Toast.show("Signed up succesfully",{
                type: 'success',
                placement: 'top',
                duration: 2000,
            });            
        };
    }

  return (
    <ImageBackground
    source={
        require('../assets/icons/pic.jpg')
    }
    style={styles.backgroundImage}
    >
        <View style={styles.overlay}/>
        
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to bliss</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            
        <Controller 
        control={control} 
        name="email" 
        render={({ 
            field: {value, onChange, onBlur}, 
            fieldState:{error}
         })=>
         <>
            <TextInput 
                placeholder='Email' 
                style={styles.input} 
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="aaa"
                autoCapitalize='none'
                editable={!formState.isSubmitting}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
         </>
        }/>

<Controller 
        control={control} 
        name="password" 
        render={({ 
            field: {value, onChange, onBlur}, 
            fieldState:{error}
         })=>
         <>
            <TextInput 
                placeholder='Password' 
                style={styles.input} 
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholderTextColor="aaa"
                autoCapitalize='none'
                secureTextEntry
                editable={!formState.isSubmitting}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
         </>
        }/>

        <TouchableOpacity 
        style={styles.button} 
        onPress={handleSubmit(signIn)} 
        disabled={formState.isSubmitting}
        >
            <Text style={styles.buttonText}>Sign In</Text>    
        </TouchableOpacity>
                
        <TouchableOpacity 
        style={[styles.button, {backgroundColor: 'rgba(37, 244, 151, 0)', borderWidth: 1, borderColor: 'white'}]} 
        onPress={handleSubmit(signUp)} 
        disabled={formState.isSubmitting}
        
        >
            
            <Text style={styles.buttonText}>Sign Up</Text>    
        </TouchableOpacity>

        

        </View>
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
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'white',
        fontSize: 16,
        marginBottom: 50
    },
    input: {
        backgroundColor: 'rgba(255,255,255,1)',
        width: '80%',
        padding: 16,
        borderRadius: 8,
        margin: 5,
        color: 'black',
        fontSize: 16,
    },
    error: {
        color: 'red',
    },
    button: {
        backgroundColor: 'rgb(37, 171, 244)',
        width: '80%',
        padding: 16,
        borderRadius: 8,
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})