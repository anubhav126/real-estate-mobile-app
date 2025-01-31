import React, { useEffect } from 'react';
import {ImageSourcePropType, SafeAreaView, Text, TouchableOpacity, View, Animated, Alert} from 'react-native';
import icons from "@/constants/icons";
import { Image } from "react-native";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import {useGlobalContext} from "@/lib/global-provider";
import {logout} from "@/lib/appwrite";

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress?: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true} : SettingsItemProps) => {
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className="flex flex-row items-center justify-between py-2"
        >
            <Animated.View
                style={[{ transform: [{ scale: scaleAnim }] }]}
                className="flex flex-row items-center gap-3"
            >
                <View className="bg-gray-50 p-2 rounded-full">
                    <Image
                        source={icon}
                        className="size-5"
                        style={{ tintColor: textStyle === "text-danger" ? "#FF4444" : "#0061ff" }}
                    />
                </View>
                <Text className={`font-rubik-medium text-black-300 text-base ${textStyle}`}>
                    {title}
                </Text>
            </Animated.View>
            {showArrow && (
                <Image
                    source={icons.rightArrow}
                    className="size-4"
                    style={{ tintColor: "#0061ff" }}
                    resizeMode="cover"
                />
            )}
        </TouchableOpacity>
    );
};

const Profile = () => {
    const {user, refetch} = useGlobalContext()
    const handleLogout = async()=> {
        const result = await logout();
        if(result){
            Alert.alert("Success", "You have been logged out");
            refetch();
        }
        else {
            Alert.alert("Error", "Could not log you out");
        }
    }
    const fadeAnim = new Animated.Value(0);
    const slideAnim = new Animated.Value(50);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);



    return (
        <SafeAreaView className="h-full bg-white px-7">
            <View className="flex flex-row items-center justify-between pt-2 pr-2">
                <Text className="text-lg font-rubik-bold text-primary-300 pl-3">
                    Profile
                </Text>
                <TouchableOpacity className="bg-gray-50 p-2 rounded-full">
                    <Image
                        source={icons.bell}
                        className="size-4"
                        style={{ tintColor: "#0061ff" }}
                    />
                </TouchableOpacity>
            </View>

            <Animated.View
                className="flex-row justify-center flex mt-3"
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
            >
                <View className="flex flex-col items-center relative">
                    <View className="shadow-lg">
                        <Image
                            source={{uri: user?.avatar}}
                            className="size-32 relative rounded-full"
                            style={{ borderWidth: 4, borderColor: '#0061ff20' }}
                        />
                    </View>
                    <TouchableOpacity className="absolute bottom-8 right-1 bg-primary-300 p-1.5 rounded-full">
                        <Image
                            source={icons.edit}
                            className="size-6"
                            style={{ tintColor: 'white' }}
                        />
                    </TouchableOpacity>
                    <Text className="text-xl font-rubik-bold mt-2 text-primary-300">{user?.name}</Text>
                </View>
            </Animated.View>

            <Animated.View
                className="mt-6 px-2"
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }}
            >
                <View className="flex flex-col">
                    <SettingsItem icon={icons.calendar} title="My Bookings" />
                    <SettingsItem icon={icons.wallet} title="Payment" />
                </View>

                <View className="flex flex-col mt-2 border-primary-200">
                    {settings.slice(2).map((item, index) => (
                        <SettingsItem key={index} {...item} />
                    ))}
                </View>

                <View className="flex flex-col mt-2">
                    <SettingsItem
                        icon={icons.logout}
                        title="Logout"
                        textStyle="text-danger"
                        showArrow={false}
                        onPress={handleLogout}
                    />
                </View>
            </Animated.View>
        </SafeAreaView>
    );
};

export default Profile;