import { getMangaById, Manga } from "@/db/database";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Pressable, Text, View } from "react-native";

export default function ReadLayout() {
    const { mangaId } = useLocalSearchParams<{ mangaId: string }>();

    const [manga, setManga] = useState<Manga | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [currentPageImage, setCurrentPageImage] = useState<string>("");
    const [fullScreen, setFullScreen] = useState<boolean>(false);

    useEffect(() => {
        if (!mangaId) return;

        try {
            setLoading(true);
            const fetchedManga = getMangaById(Number(mangaId));
            setManga(fetchedManga);
        } catch (error) {
            console.error("Error fetching manga:", error);
        } finally {
            setLoading(false);
        }
    }, [mangaId]);

    const totalPages = manga?.totalPages || 100;

    const goToNextPage = () => {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
            setCurrentPageImage(`file://${manga?.path}/${pageNumber + 1}.${manga?.format}`);
        }
    };

    const goToPreviousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
            setCurrentPageImage(`file://${manga?.path}/${pageNumber - 1}.${manga?.format}`);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    if (!manga) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <Text className="text-white text-xl font-bold">Manga not found.</Text>
            </View>
        );
    }

    const currentPageUri = encodeURI(`file://${manga.path}/${pageNumber}.${manga.format}`);
    // encodeURI(`file://${manga.path}/${pageNumber}.webp`),

    if (manga) {
        if (fullScreen) {
            return (
                <View className="flex-1 bg-black justify-center items-center">
                    {/* Scaled image container */}
                    <Image source={{ uri: currentPageUri }} className="flex-1 w-full" resizeMode="contain" />

                    <View className="absolute justify-between inset-0 flex-row">
                        {/* Left 50% - Previous Page */}
                        <Pressable className="flex-1 bg-black/5" onPress={goToPreviousPage} />

                        {/* Right 50% - Next Page */}
                        <Pressable className="flex-1" onPress={goToNextPage} />
                        <Pressable className="flex-1" onPress={goToNextPage} />
                    </View>

                    <View className="absolute top-16 left-8">
                        <Button title="<back " onPress={() => setFullScreen(false)}></Button>
                    </View>
                </View>
            );
        } else {
            return (
                <View className="flex-1 bg-black justify-center items-center">
                    <View className="w-4/5 h-1/2 bg-white rounded-lg shadow-lg justify-center items-center">
                        <Image
                            source={{
                                uri: currentPageUri,
                            }}
                            className="w-full h-full"
                        ></Image>
                    </View>
                    <Text className="text-2xl font-bold text-center color-slate-300 mt-10">Read Manga of id {mangaId}</Text>
                    <View className="flex-row justify-around items-center w-4/5 mt-4">
                        <Button title="<back " onPress={goToPreviousPage}></Button>
                        <Text className="text-white text-lg font-bold">
                            Page {pageNumber} of {totalPages}
                        </Text>
                        <Button title="Go >" onPress={goToNextPage}></Button>
                    </View>
                    <Button title="Go Fullscreen" onPress={() => setFullScreen(true)} />
                </View>
            );
        }
    }

    return (
        <View className="flex-1 bg-black justify-center items-center">
            <View className="w-4/5 h-1/2 bg-white rounded-lg shadow-lg justify-center items-center">
                <Text className="text-2xl font-bold text-center">Manga here</Text>
            </View>
            <Text className="text-2xl font-bold text-center color-slate-300 mt-10">Read Manga of id {mangaId}</Text>
        </View>
    );
}
