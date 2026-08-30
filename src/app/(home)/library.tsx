import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";

const MANGA_COLLECTION = [
    {
        id: "1",
        title: "Way of the Blade",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&q=80",
        progress: 0.6,
    },
    {
        id: "2",
        title: "Concrete Labyrinth",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
        progress: 0.9,
    },
    {
        id: "3",
        title: "Neon Ghost",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
        progress: 0.3,
    },
    {
        id: "4",
        title: "Silent Peak",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
        progress: 0.45,
    },
    {
        id: "5",
        title: "Concrete Labyrinth",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80",
        progress: 0.9,
    },
    {
        id: "6",
        title: "Neon Ghost",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80",
        progress: 0.3,
    },
    {
        id: "7",
        title: "Silent Peak",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
        progress: 0.45,
    },
];

export default function LibraryScreen() {
    const [activeTab, setActiveTab] = useState("Manga");
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <View className="px-5 pt-6 pb-4">
                <Text className="text-3xl font-black text-black tracking-tight">MY COLLECTION</Text>
            </View>
            <View className="flex-row px-5 gap-2 mb-6">
                {["RECENT", "ALPHABETICAL", "GENRE"].map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`px-4 py-2 border border-black ${isActive ? "bg-black" : "bg-transparent"}`}
                        >
                            <Text className={`text-xs font-bold tracking-wider ${isActive ? "text-white" : "text-black"}`}>{tab}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="flex-row flex-wrap px-4 justify-between">
                {MANGA_COLLECTION.map((item) => (
                    <View key={item.id} className="w-[48%] mb-6">
                            <Pressable onPress={() => {alert(`Pressed ${item.title}`)}}>
                            <View className="relative bg-white border border-gray-300 rounded-sm overflow-hidden shadow-sm">
                                <View style={{ filter: "grayscale(96%)" }} className="relative bg-black">
                                    <Image source={{ uri: item.image }} className="w-full h-56 resize-cover opacity-80" />
                                </View>
                                <View className="absolute right-2 top-2 w-7 h-6 bg-white/90 border border-gray-400 p-1 rounded-sm">
                                    <Feather name="check" size={12} color="black" />
                                </View>
                                <View className="w-full h-1 bg-gray-200">
                                    <View className="h-full bg-red-600" style={{ width: `${item.progress * 100}%` }} />
                                </View>
                            </View>
                            <Text className="text-base font-bold text-black mt-2 leading-tight">{item.title}</Text>
                    </Pressable>
                        </View>
                ))}
            </View>
        </ScrollView>
    );
}
