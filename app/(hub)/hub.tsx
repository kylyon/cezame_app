import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { domains } from '@/data/tutorials';
import { useProgress } from '@/context/ProgressContext';

const { width } = Dimensions.get('window');
const CARD_GAP = 14;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

export default function Hub() {
  const navigation = useNavigation();
  const { getDomainProgress, getTotalProgress } = useProgress();
  const total = getTotalProgress();
  const totalPercent = total.total > 0 ? (total.completed / total.total) * 100 : 0;

  const openDomain = (domainId: string) => {
    // @ts-ignore
    navigation.navigate('domainDetail', { domainId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Salut champion ! 👋</Text>
          <Text style={styles.title}>Ton parcours admin</Text>
          <Text style={styles.subtitle}>
            Apprends les bases de chaque domaine à ton rythme
          </Text>
        </View>

        {/* Global progress */}
        <View style={styles.globalProgressCard}>
          <View style={styles.globalProgressHeader}>
            <Text style={styles.globalProgressEmoji}>🏆</Text>
            <View style={styles.globalProgressInfo}>
              <Text style={styles.globalProgressTitle}>Progression globale</Text>
              <Text style={styles.globalProgressStat}>
                {total.completed}/{total.total} étapes complétées
              </Text>
            </View>
            <Text style={styles.globalProgressPercent}>{Math.round(totalPercent)}%</Text>
          </View>
          <View style={styles.globalProgressBarBg}>
            <View style={[styles.globalProgressBarFill, { width: `${totalPercent}%` }]} />
          </View>
          {total.completed === total.total && total.total > 0 && (
            <Text style={styles.completedMessage}>
              Tu as tout terminé, bravo ! Tu es un as de l'administratif ! 🎉
            </Text>
          )}
        </View>

        {/* Domain cards */}
        <View style={styles.cardsGrid}>
          {domains.map(domain => {
            const progress = getDomainProgress(domain.id);
            const percent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
            const isComplete = progress.completed === progress.total;

            return (
              <TouchableOpacity
                key={domain.id}
                style={[styles.card, { borderColor: domain.color }]}
                activeOpacity={0.7}
                onPress={() => openDomain(domain.id)}>
                {/* Badge si terminé */}
                {isComplete && (
                  <View style={[styles.completeBadge, { backgroundColor: domain.color }]}>
                    <Text style={styles.completeBadgeText}>✓</Text>
                  </View>
                )}

                <Text style={styles.cardEmoji}>{domain.emoji}</Text>
                <Text style={styles.cardName}>{domain.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>
                  {domain.description}
                </Text>

                {/* Steps count */}
                <Text style={styles.cardSteps}>
                  {progress.completed}/{progress.total} étapes
                </Text>

                {/* Progress bar */}
                <View style={styles.cardProgressBg}>
                  <View
                    style={[
                      styles.cardProgressFill,
                      { width: `${percent}%`, backgroundColor: domain.color },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    lineHeight: 20,
  },
  // Global progress
  globalProgressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  globalProgressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  globalProgressEmoji: {
    fontSize: 36,
    marginRight: 14,
  },
  globalProgressInfo: {
    flex: 1,
  },
  globalProgressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  globalProgressStat: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  globalProgressPercent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#118AB2',
  },
  globalProgressBarBg: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
  },
  globalProgressBarFill: {
    height: '100%',
    backgroundColor: '#118AB2',
    borderRadius: 4,
  },
  completedMessage: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#06D6A0',
    textAlign: 'center',
  },
  // Cards grid
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  completeBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
    marginBottom: 12,
  },
  cardSteps: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  cardProgressBg: {
    height: 6,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    overflow: 'hidden',
  },
  cardProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  bottomSpacer: {
    height: 40,
  },
});
