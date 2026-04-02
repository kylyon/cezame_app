import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// On récupère la largeur de l'écran pour que chaque slide prenne tout l'espace
const { width } = Dimensions.get('window');

// 1. Définition des données de l'onboarding
const questions = [
  {
    id: '1',
    category: '🏥 Santé',
    question: "Sur une échelle de stress, prendre un RDV médical ou gérer tes papiers de la Sécu, c'est...",
    options: [
      { id: 'a', label: "Tranquille, je gère sans problème", score: 1, icon: "😎" },
      { id: 'b', label: "Je repousse souvent au lendemain", score: 3, icon: "⏳" },
      { id: 'c', label: "Une véritable source d'angoisse", score: 5, icon: "😨" }
    ],
    backgroundColor: '#FF6B6B', // Rouge corail
  },
  {
    id: '2',
    category: '💰 Finance',
    question: "Face à une dépense imprévue ou un découvert, quelle est ta réaction ?",
    options: [
      { id: 'a', label: "Je règle le problème de suite", score: 1, icon: "💪" },
      { id: 'b', label: "Je stresse mais je regarde l'appli", score: 3, icon: "👀" },
      { id: 'c', label: "Je fais l'autruche totale", score: 5, icon: "🙈" }
    ],
    backgroundColor: '#4ECDC4', // Turquoise
  },
  {
    id: '3',
    category: '🚗 Voiture',
    question: "L'assurance, le contrôle technique, le garage... tu en es où ?",
    options: [
      { id: 'a', label: "J'ai toutes les dates en tête", score: 1, icon: "📅" },
      { id: 'b', label: "C'est un peu flou mais je m'en sors", score: 3, icon: "🤷‍♂️" },
      { id: 'c', label: "L'idée même me paralyse", score: 5, icon: "🥶" }
    ],
    backgroundColor: '#FFD166', // Jaune moutarde (texte sombre nécessaire ici)
  },
  {
    id: '4',
    category: '📄 Administration',
    question: "Quand tu reçois un courrier avec le logo 'République Française', tu l'ouvres :",
    options: [
      { id: 'a', label: "Le jour même, et je le classe", score: 1, icon: "📁" },
      { id: 'b', label: "Dans la semaine", score: 3, icon: "🗓️" },
      { id: 'c', label: "Quand la pile devient trop haute", score: 5, icon: "📚" }
    ],
    backgroundColor: '#118AB2', // Bleu profond
  },
  {
    id: '5',
    category: '🏠 Logement',
    question: "Sais-tu comment souscrire ou résilier tes contrats d'électricité et internet ?",
    options: [
      { id: 'a', label: "Oui, c'est facile", score: 1, icon: "✅" },
      { id: 'b', label: "Avec l'aide d'un proche, oui", score: 3, icon: "🤝" },
      { id: 'c', label: "Rien que d'y penser, j'abandonne", score: 5, icon: "🏳️" }
    ],
    backgroundColor: '#073B4C', // Bleu marine
  }
];

export default function Onboarding() {
    const colorScheme = useColorScheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // Stocke les réponses : { '1': 'a', '2': 'c', ... }
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation()

  const onViewableItemsChanged = useRef(({ viewableItems } : { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Sélectionner une réponse
  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });

    // Auto-scroll vers la prochaine question après un petit délai
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        if (!flatListRef.current) return
        flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      }, 400); // 400ms pour laisser à l'utilisateur le temps de voir sa sélection
    }
  };

  const goBack = () => {
    if (!flatListRef.current) return

    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  }
 
  const finishOnboarding = () => {
    // Calcul du score de phobie administrative par exemple
    console.log("Réponses de l'utilisateur :", answers);
    navigation.navigate('onboardingResults', { answers }); // On peut passer les réponses à l'écran de résultats
  };

  const renderItem = ({ item } : { item: any }) => {
    const isDarkBackground = item.backgroundColor !== '#FFD166'; // Le jaune nécessite un texte foncé
    const textColor = isDarkBackground ? '#FFFFFF' : '#333333';

    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.goBackButton}>← Retour</Text>
        </TouchableOpacity>
        <Text style={[styles.category, { color: textColor }]}>{item.category}</Text>
        <Text style={[styles.question, { color: textColor }]}>{item.question}</Text>
        
        <View style={styles.optionsContainer}>
          {item.options.map((option: any) => {
            const isSelected = answers[item.id] === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected
                ]}
                activeOpacity={0.7}
                onPress={() => handleSelectOption(item.id, option.id)}
              >
                <Text style={styles.optionIcon}>{option.icon}</Text>
                <Text style={[
                  styles.optionText, 
                  isSelected && styles.optionTextSelected
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const currentBgColor = questions[currentIndex].backgroundColor;
  // Calcul de la progression
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentBgColor }]}>
      <StatusBar barStyle={currentBgColor === '#FFD166' ? 'dark-content' : 'light-content'} backgroundColor={currentBgColor} />
      
      {/* Barre de progression */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
      </View>

      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEnabled={false} // On désactive le scroll manuel pour forcer la réponse
      />

      {/* Footer avec bouton Terminer si on est à la fin */}
      <View style={styles.footer}>
        {currentIndex === questions.length - 1 && answers[questions[currentIndex].id] && (
          <TouchableOpacity style={styles.finishButton} onPress={finishOnboarding} activeOpacity={0.8}>
            <Text style={styles.finishButtonText}>Découvrir mon profil 🚀</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    height: 6,
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'center',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  slide: {
    width: width,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  question: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    lineHeight: 34,
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionButtonSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#333',
    borderWidth: 2,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
    flex: 1, // Permet au texte de passer à la ligne sans écraser l'icône
  },
  optionTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  finishButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  finishButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  goBackButton: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
});