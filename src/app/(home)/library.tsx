import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, Image, Text, ScrollView, TouchableOpacity, Pressable } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Directory, Paths } from "expo-file-system";
import { unzip } from "../../utils/zipper";

const MANGA_COLLECTION = [
    {
        id: "1",
        title: "Way of the Blade",
        image: "file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540anonymous%252Ffirst-project-e5923fdc-2c06-4f9d-9390-391d073865f7/manga_collection/Otaku Tomodachi to Mindblowing/1.jpg",
        progress: 0.9,
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
    const [activeTab, setActiveTab] = useState("RECENT");
    const [importing, setImporting] = useState(false);

    const handleUpload = async () => {
        setImporting(true);

        // 1. Prompt user to pick a file (e.g., .zip, .cbz, or image folder)
        const result = await DocumentPicker.getDocumentAsync({
            type: ["application/zip", "application/x-cbz", "image/*"],
            copyToCacheDirectory: false,
        });
        if (result.canceled || !result.assets[0]) {
            setImporting(false);
            return;
        }
        const pickedFile = result.assets[0];

        // 2. Define target directory in the app's internal data folder
        const appDataFolder = new Directory(Paths.document, "manga-collection");
        if (!appDataFolder.exists) {
            appDataFolder.create();
        }

        const filename = pickedFile.name.replace(/\.[^/.]+$/, "");

        try {
            const path = await unzip(pickedFile.uri, filename);
            
        } catch (error) {
            console.error("Failed to unzip file:", error);
        }
        // alert(
        //     `Picked file: ${pickedFile.name}\nURI: ${pickedFile.uri}\nSize: ${pickedFile.size} bytes\nType: ${pickedFile.mimeType}\n\n Target directory: ${appDataFolder}`,
        // );
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            <View className="flex-row justify-between px-5 pt-6 pb-4">
                <Text className="text-3xl font-black text-black tracking-tight">MY COLLECTION</Text>
                <View className="flex-row w-1/4 gap-2">
                    <Pressable className="flex-row w-full justify-center items-center border border-black" onPress={handleUpload}>
                        <Feather name="download" size={16} color="black" />
                        <Text className=" text-md font-black text-black tracking-tight"> IMPORT </Text>
                    </Pressable>
                </View>
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
                        <Pressable
                            onPress={() => {
                                alert(`Pressed ${item.title}`);
                            }}
                        >
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
