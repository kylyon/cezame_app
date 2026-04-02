import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingResults({route} : {route: any}) {
    const { answers } = route.params; // Récupère les réponses passées depuis l'onboarding

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#118AB2' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Résultats de l'onboarding</Text>
                <Text style={{ fontSize: 18, color: 'white', marginTop: 20 }}>Voici les réponses que vous avez fournies :</Text>
                {Object.entries(answers).map(([question, answer]) => (
                    <Text key={question} style={{ fontSize: 16, color: 'white', marginTop: 10 }}>
                        {question}: {answer}
                    </Text>
                ))}
        </SafeAreaView>
    )
}