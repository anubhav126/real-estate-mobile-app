import React, {useState} from 'react';

import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import {categories} from "@/constants/data";

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>()
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All')
    const handleCategoryPress = (category: string) => {}
    return (
        <ScrollView horizontal showsVerticalScrollIndicator={false} className="mt-3 mb-2">
            {categories.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleCategoryPress(item.category)} className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category} ? 'bg-primary-300' : 'bg-primary-100 border-primary-200 border'}' `}>
                    <Text>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default Filters;
