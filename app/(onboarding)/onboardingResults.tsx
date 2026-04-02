import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

export default function OnboardingResults({route} : {route: any}) {
    const { answers } = route.params;
    const router = useRouter();

    const totalScore = (Object.values(answers) as number[]).reduce((sum: number, score: number) => sum + score, 0);
    const maxScore = Object.keys(answers).length * 5; // Supposant que le score max par question est 5
    const scorePercentage = (totalScore as number / maxScore) * 100;

    // Déterminer le niveau de phobie administrative
    const getPhobiaLevel = () => {
        if (scorePercentage < 30) return { level: "Faible", color: "#06D6A0", emoji: "😊" };
        if (scorePercentage < 60) return { level: "Modéré", color: "#FFD60A", emoji: "😐" };
        return { level: "Élevé", color: "#EF476F", emoji: "😰" };
    };

    const phobiaInfo = getPhobiaLevel();

    // Personnalisation par note de réponse
    const getAnswerStyle = (score: number) => {
        switch (score) {
            case 1: return { color: '#06D6A0', bg: '#F0FDF9', emoji: '😊', label: 'Aucune difficulté', borderColor: '#06D6A0' };
            case 2: return { color: '#4ECDC4', bg: '#F0FAFA', emoji: '🙂', label: 'Légère anxiété', borderColor: '#4ECDC4' };
            case 3: return { color: '#FFD60A', bg: '#FFFDF0', emoji: '😐', label: 'Anxiété modérée', borderColor: '#FFD60A' };
            case 4: return { color: '#FF6B35', bg: '#FFF5F0', emoji: '😟', label: 'Forte anxiété', borderColor: '#FF6B35' };
            case 5: return { color: '#EF476F', bg: '#FFF0F4', emoji: '😰', label: 'Phobie sévère', borderColor: '#EF476F' };
            default: return { color: '#118AB2', bg: '#F0F8FF', emoji: '❓', label: 'Non évalué', borderColor: '#118AB2' };
        }
    };

    return (
        <LinearGradient
            colors={['#118AB2', '#06D6A0']}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* En-tête */}
                    <View style={styles.header}>
                        <Text style={styles.emoji}>{phobiaInfo.emoji}</Text>
                        <Text style={styles.title}>Vos Résultats</Text>
                        <Text style={styles.subtitle}>Analyse de votre profil administratif</Text>
                    </View>

                    {/* Carte du score principal */}
                    <View style={styles.scoreCard}>
                        <View style={styles.scoreCircle}>
                            <Text style={styles.scoreNumber}>{totalScore}</Text>
                            <Text style={styles.scoreMax}>/ {maxScore}</Text>
                        </View>
                        <View style={styles.scoreInfo}>
                            <Text style={styles.scoreLabel}>Niveau de phobie</Text>
                            <View style={[styles.levelBadge, { backgroundColor: phobiaInfo.color }]}>
                                <Text style={styles.levelText}>{phobiaInfo.level}</Text>
                            </View>
                        </View>
                        
                        {/* Barre de progression */}
                        <View style={styles.progressBarContainer}>
                            <View 
                                style={[
                                    styles.progressBar, 
                                    { 
                                        width: `${scorePercentage}%`,
                                        backgroundColor: phobiaInfo.color 
                                    }
                                ]} 
                            />
                        </View>
                    </View>

                    {/* Détails des réponses */}
                    <View style={styles.answersSection}>
                        <Text style={styles.sectionTitle}>📊 Détail de vos réponses</Text>
                        {(Object.entries(answers) as [string, number][]).map(([question, answer], index) => {
                            const answerStyle = getAnswerStyle(answer);
                            return (
                                <View
                                    key={question}
                                    style={[
                                        styles.answerCard,
                                        {
                                            backgroundColor: answerStyle.bg,
                                            borderLeftWidth: 5,
                                            borderLeftColor: answerStyle.borderColor,
                                        }
                                    ]}
                                >
                                    {/* En-tête de la carte */}
                                    <View style={styles.answerHeader}>
                                        <View style={[styles.questionNumber, { backgroundColor: answerStyle.color }]}>
                                            <Text style={styles.questionNumberText}>{index + 1}</Text>
                                        </View>
                                        <Text style={styles.questionText}>{question}</Text>
                                    </View>

                                    {/* Séparateur */}
                                    <View style={[styles.divider, { backgroundColor: answerStyle.color + '33' }]} />

                                    {/* Badge niveau + score */}
                                    <View style={styles.answerValueContainer}>
                                        <View style={[styles.labelBadge, { backgroundColor: answerStyle.color + '22' }]}>
                                            <Text style={styles.labelEmoji}>{answerStyle.emoji}</Text>
                                            <Text style={[styles.labelText, { color: answerStyle.color }]}>
                                                {answerStyle.label}
                                            </Text>
                                        </View>
                                        <View style={styles.scoreRight}>
                                            <Text style={[styles.answerValue, { color: answerStyle.color }]}>
                                                {answer}/5
                </Text>
                                        </View>
                                    </View>

                                    {/* Indicateur de dots */}
                                    <View style={styles.scoreIndicator}>
                                        {[...Array(5)].map((_, i) => (
                                            <View
                                                key={i}
                                                style={[
                                                    styles.scoreDot,
                                                    i < answer
                                                        ? { backgroundColor: answerStyle.color }
                                                        : styles.scoreDotEmpty
                                                ]}
                                            />
                                        ))}
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    {/* Bouton d'action */}
                    <TouchableOpacity 
                        style={styles.continueButton}
                        onPress={() => router.push('/(tabs)')}
                    >
                        <Text style={styles.continueButtonText}>Continuer vers l'application</Text>
                    </TouchableOpacity>

                    <View style={styles.bottomSpacer} />
                </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    emoji: {
        fontSize: 64,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    scoreCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
    },
    scoreCircle: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreNumber: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#118AB2',
    },
    scoreMax: {
        fontSize: 20,
        color: '#666',
        marginTop: -8,
    },
    scoreInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    scoreLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    levelBadge: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    levelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    answersSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 16,
    },
    answerCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    answerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    questionNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#118AB2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    questionNumberText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        marginBottom: 12,
    },
    answerValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    labelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    labelEmoji: {
        fontSize: 16,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '600',
    },
    scoreRight: {
        alignItems: 'flex-end',
    },
    scoreIndicator: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    scoreDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    scoreDotEmpty: {
        backgroundColor: '#E0E0E0',
    },
    answerValue: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: 'white',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#118AB2',
    },
    bottomSpacer: {
        height: 40,
    },
});