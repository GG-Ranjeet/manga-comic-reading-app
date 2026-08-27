import { Text } from "react-native";

export default function ThemedText({ children, style }: { children: React.ReactNode; style?: any }) {
    return (
        <Text style={[{ color: '#ff0000' }, style]}>{children}</Text>
    );
}