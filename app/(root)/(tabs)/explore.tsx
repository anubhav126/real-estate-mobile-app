// Index.tsx
import {SafeAreaView, Text, View, FlatList, Image, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import {Link, router, useLocalSearchParams} from 'expo-router'
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/components/search";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";
import {Models} from "react-native-appwrite"

// Card Component Types
interface CardProps {
    item: Models.Document;
    onPress?: () => void;
}

// FeaturedCard Component
export const FeaturedCard = ({item, onPress}: CardProps) => {
    const {image, rating, name, address, price} = item;

    return (
        <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
            <Image
                source={{uri: image}}
                className="size-full rounded-2xl"
            />
            <Image
                source={images.cardGradient}
                className="size-full rounded-2xl absolute bottom-0"
            />
            <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
                <Image
                    source={icons.star}
                    className="size-3.5"
                />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-1">{rating}</Text>
            </View>
            <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
                <Text className="text-xl font-rubik-extrabold text-white" numberOfLines={1}>
                    {name}
                </Text>
                <Text className="text-base font-rubik text-white">
                    {address}
                </Text>
                <View className="flex flex-row items-center justify-between w-full">
                    <Text className="text-xl font-rubik-extrabold text-white">
                        ${price}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="size-5"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Card Component
export const Card = ({item, onPress}: CardProps) => {
    const {image, rating, name, address, price} = item;

    return (
        <TouchableOpacity onPress={onPress} className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative">
            <View className="flex flex-row items-center absolute px-2 top-5 right-5 bg-white/90 p-1 rounded-full z-50">
                <Image
                    source={icons.star}
                    className="size-2.5"
                />
                <Text className="text-xs font-rubik-bold text-primary-300 ml-0.5">{rating}</Text>
            </View>
            <Image
                source={{uri: image}}
                className="w-full h-40 rounded-lg"
            />
            <View className="flex flex-col mt-2">
                <Text className="text-base font-rubik-bold text-black-300">
                    {name}
                </Text>
                <Text className="text-xs font-rubik text-black-300">
                    {address}
                </Text>
                <View className="flex flex-row items-center justify-between mt-2">
                    <Text className="text-base font-rubik-bold text-primary-300 ml-0.5">
                        ${price}
                    </Text>
                    <Image
                        source={icons.heart}
                        className="size-5"
                        tintColor="#191d31"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Main Index Component
export default function Explore() {
    const params = useLocalSearchParams<{query?: string; filter?: string}>();
    const {data: properties, loading, refetch} = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter || '',
            query: params.query || '',
            limit: 6
        }
    });

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    useEffect(() => {
        if (params.filter || params.query) {
            refetch({
                filter: params.filter || '',
                query: params.query || '',
                limit: 20,
            });
        }
    }, [params.filter, params.query]);

    return (
        <SafeAreaView className="bg-white h-full pb-2">
            <FlatList
                data={properties || []}
                renderItem={({item}) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName={"pb-32"}
                columnWrapperClassName={"flex gap-5 px-5"}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" className={"text-primary-300 mt-5"} />
                    ) : (
                        <NoResults />
                    )
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.back} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image
                                    source={icons.backArrow}
                                />
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                                Search for your favourite home!
                            </Text>
                            <Image
                                source={icons.bell}
                                className={"w-6 h-6"}
                            />
                        </View>
                        <Search />
                        <View className={"mt-5 "}>
                            <Filters />
                            <Text className={"text-xl font-rubik-bold text-black-300 mt-5"}>
                                Found {properties?.length} Properties!
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}