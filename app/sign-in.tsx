import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View, Alert} from 'react-native';
import images from "@/constants/images";
import {Image, TouchableOpacity} from 'react-native'
import icons from "@/constants/icons";
import {login} from "@/lib/appwrite";
import {tls} from "node-forge";
import {useAppwrite} from "@/lib/useAppwrite";
import {useGlobalContext} from "@/lib/global-provider";
import {Redirect} from "expo-router";

const SignIn = ()=>{
    const {refetch, loading, isLoggedIn} = useGlobalContext();
    if(!loading && isLoggedIn) return <Redirect href="/" />;
    const handleLogin = async ()=>{
        const result = await login()
        if(result){
            refetch()
        }
        else Alert.alert("Login failed");
    }
        return (
            <SafeAreaView className="bg-white h-full">
                <ScrollView contentContainerClassName="h-full">
                    <Image
                        source={images.onboarding} className={"w-full h-4/6"} resizeMode="contain"
                    />
                    <View className="px-10">
                        <Text className="text-base text-center font-rubik text-black-200">
                            Welcome to the last real estate app you will ever need!
                        </Text>
                        <Text className="text-3xl font-rubik-bold text-black-200 text-center mt-2">
                            Lets get you closer to {"\n"}
                            <Text className="3xl text-center font-rubik-bold text-primary-300 text-center mt-2">
                                Your next home!
                            </Text>
                        </Text>
                        <Text className="text-lg font-rubik text-black-200 text-center mt-5">
                            Login to ReState with google
                        </Text>
                        <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
                            <View className="flex flex-row justify-center items-center">
                                <Image
                                    source={icons.google}
                                    className="h-5 w-5"
                                    resizeMode="contain"
                                />
                                <Text className="text-lg font-rubik-medium text-black-300 text-center ml-2">
                                    Continue with Google
                                </Text>
                            </View>
                        </TouchableOpacity>


                    </View>
                    </ScrollView>
            </SafeAreaView>
        );
}

export default SignIn;
