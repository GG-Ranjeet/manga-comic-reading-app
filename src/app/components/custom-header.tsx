// components/CustomHeader.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface CustomHeaderProps {
  title: string;
  onProfilePress?: () => void;
}

export default function CustomHeader({ title, onProfilePress }: CustomHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-white border-b border-gray-200 px-4 pb-3 pt-2 flex-row items-center justify-between shadow-sm"
    >
      <Text className="text-xl font-bold text-gray-800">{title}</Text>
      <TouchableOpacity onPress={onProfilePress} className="p-1">
        <Ionicons name="person-circle-outline" size={28} color="#2563eb" />
      </TouchableOpacity>
    </View>
  );
}