import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'

type AuthData = {
    session: Session | null;
    user: any;
    mounting: boolean;
    isFirstLogin: boolean;
}

const AuthContext = createContext<AuthData>({
    session: null,
    user: null,
    mounting: true,
    isFirstLogin: false,
});

export default function Authprovider ({children}: PropsWithChildren){
    const[session, setSession] = useState<Session | null>(null)
    const[user, setUser] = useState(null)
    const[mounting, setMounting] = useState(true)
    const[isFirstLogin, setIsFirstLogin] = useState(false)
    
    useEffect(() => {
        const fetchSession = async() => {
            const {
                data:{session},
            } = await supabase.auth.getSession();
            
            setSession(session);
            
            if(session){
                // Query from users table
                const{data: userData, error} = await supabase
                .from('users')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
                if(error && error.code === 'PGRST116') {
                    // User doesn't exist in our users table yet
                    console.log("New user, creating profile");
                    // Create a new user entry
                    const { data: newUser, error: insertError } = await supabase
                        .from('users')
                        .insert([
                            { 
                                id: session.user.id, 
                                email: session.user.email,
                                profile_completed: false
                            }
                        ])
                        .select()
                        .single();
                        
                    if(insertError) {
                        console.log("Error creating user:", insertError);
                    } else {
                        setUser(newUser);
                        setIsFirstLogin(true);
                        // Redirect to profile completion page
                        router.replace('/More');
                    }
                } else if(error) {
                    console.log("Error fetching user:", error);
                } else {
                    setUser(userData);
                    // Check if profile is completed
                    if(userData && !userData.profile_completed) {
                        // Profile not completed, redirect to More page
                        setIsFirstLogin(true);
                        router.replace('/More');
                    } else {
                        // Profile completed, redirect to Home
                        router.replace('/Home');
                    }
                }
            }
            setMounting(false);
        };
        
        fetchSession();
        
        supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            
            if(session) {
                // Check if user exists in database
                const { data: userData, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                
                if(error && error.code === 'PGRST116') {
                    // User doesn't exist in our users table yet
                    setIsFirstLogin(true);
                    router.replace('/More');
                } else if(userData && !userData.profile_completed) {
                    setIsFirstLogin(true);
                    router.replace('/More');
                } else {
                    router.replace('/Home');
                }
            }
        });
    }, [])

  return (
    <AuthContext.Provider value={{session, user, mounting, isFirstLogin}}>
        {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);