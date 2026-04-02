import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// On récupère la largeur de l'écran pour que chaque slide prenne tout l'espace
const { width } = Dimensions.get('window');

// 1. Définition des données de l'onboarding
const slides = [
  {
    id: '1',
    title: 'Bienvenue',
    description: 'Découvrez notre nouvelle application incroyable et simplifiez votre vie au quotidien.',
    backgroundColor: '#4facfe', // Bleu
  },
  {
    id: '2',
    title: 'Rapide et Sécurisé',
    description: 'Vos données sont protégées avec les meilleurs standards de sécurité du marché.',
    backgroundColor: '#00f2fe', // Bleu clair
  },
  {
    id: '3',
    title: 'Commençons !',
    description: 'Inscrivez-vous dès maintenant pour profiter de toutes nos fonctionnalités exclusives.',
    backgroundColor: '#43e97b', // Vert
  },
];

export default function OnboardingLayout() {
    const colorScheme = useColorScheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // 2. Met à jour l'index quand l'utilisateur fait défiler les écrans
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // 3. Fonction pour le bouton "Suivant" / "Commencer"
  const goNext = () => {
    if (!flatListRef.current) return

    if (currentIndex < slides.length - 1) {
      // Passer au slide suivant
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Action à la fin de l'onboarding (ex: Navigation vers Login ou Accueil)
      console.log("Onboarding terminé ! Remplacer par la navigation.");
      // navigation.replace('Home');
    }
  };

  const goPrevious = () => {
    if (!flatListRef.current) return

    if (currentIndex > 0) {
      // Passer au slide précédent
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  // 4. Rendu de chaque page (Slide)
  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Liste défilante horizontale */}
      <FlatList
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // C'est cette propriété qui crée l'effet d'écran par écran
        bounces={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />

      {/* Footer avec les petits points et le bouton */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.activeDot : null, // Change la couleur si actif
              ]}
            />
          ))}
        </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            width: width,
            paddingHorizontal: 20,
          }}>
            {currentIndex > 0 &&
            <TouchableOpacity style={styles.button} onPress={goPrevious} activeOpacity={0.8}>
              <Text style={styles.buttonText}>
                Precédent
              </Text>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.button} onPress={goNext} activeOpacity={0.8}>
              <Text style={styles.buttonText}>
                {currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
}






// 5. Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width, // Prend toute la largeur de l'écran
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20, // Plus large pour le point actif
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    maxWidth: "100%",
    flexGrow: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});