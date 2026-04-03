import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { domains } from '@/data/tutorials';
import { useProgress } from '@/context/ProgressContext';

export default function DomainDetail({ route }: { route: any }) {
  const { domainId } = route.params;
  const navigation = useNavigation();
  const domain = domains.find(d => d.id === domainId);
  const { isStepCompleted, getDomainProgress } = useProgress();

  if (!domain) return null;

  const progress = getDomainProgress(domain.id);
  const percent = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;

  const openTutorial = (stepId: string) => {
    // @ts-ignore
    navigation.navigate('tutorialStep', { domainId, stepId });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: domain.colorLight }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.emoji}>{domain.emoji}</Text>
          <Text style={styles.title}>{domain.name}</Text>
          <Text style={styles.description}>{domain.description}</Text>
        </View>

        {/* Progress summary */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Ta progression</Text>
            <Text style={[styles.progressPercent, { color: domain.color === '#B2FA84' ? '#2D8A4E' : domain.color }]}>
              {Math.round(percent)}%
            </Text>
          </View>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${percent}%`, backgroundColor: domain.color }]}
            />
          </View>
          <Text style={styles.progressStat}>
            {progress.completed}/{progress.total} étapes terminées
            {progress.completed === progress.total && progress.total > 0 ? ' — Bravo ! 🎉' : ''}
          </Text>
        </View>

        {/* Learning path */}
        <Text style={styles.sectionTitle}>🗺️ Ton parcours</Text>

        <View style={styles.pathContainer}>
          {domain.steps.map((step, index) => {
            const completed = isStepCompleted(step.id);
            const isLast = index === domain.steps.length - 1;

            return (
              <View key={step.id} style={styles.stepRow}>
                {/* Timeline */}
                <View style={styles.timeline}>
                  <View
                    style={[
                      styles.timelineDot,
                      completed
                        ? { backgroundColor: domain.color, borderColor: domain.color }
                        : { backgroundColor: '#FFF', borderColor: '#CCC' },
                    ]}>
                    {completed && <Text style={styles.dotCheck}>✓</Text>}
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.timelineLine,
                        { backgroundColor: completed ? domain.color : '#DDD' },
                      ]}
                    />
                  )}
                </View>

                {/* Step card */}
                <TouchableOpacity
                  style={[
                    styles.stepCard,
                    completed && { borderColor: domain.color, borderWidth: 1.5 },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => openTutorial(step.id)}>
                  <View style={styles.stepCardHeader}>
                    <Text style={styles.stepEmoji}>{step.emoji}</Text>
                    <View style={styles.stepInfo}>
                      <Text style={styles.stepNumber}>Étape {index + 1}</Text>
                      <Text style={styles.stepTitle}>{step.title}</Text>
                    </View>
                    <Text style={styles.stepArrow}>›</Text>
                  </View>
                  <Text style={styles.stepDesc}>{step.description}</Text>
                  {completed && (
                    <View style={[styles.stepBadge, { backgroundColor: domain.color + '22' }]}>
                      <Text style={[styles.stepBadgeText, { color: domain.color === '#B2FA84' ? '#2D8A4E' : domain.color }]}>
                        Terminé ✓
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
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
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#666',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  // Progress
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStat: {
    fontSize: 13,
    color: '#888',
  },
  // Path
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 18,
  },
  pathContainer: {
    paddingLeft: 4,
  },
  stepRow: {
    flexDirection: 'row',
  },
  timeline: {
    width: 36,
    alignItems: 'center',
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dotCheck: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timelineLine: {
    width: 3,
    flex: 1,
    marginVertical: -2,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginLeft: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  stepCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepNumber: {
    fontSize: 11,
    fontWeight: '600',
    color: '#AAA',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginTop: 2,
  },
  stepArrow: {
    fontSize: 24,
    color: '#CCC',
    fontWeight: '300',
  },
  stepDesc: {
    fontSize: 13,
    color: '#888',
    lineHeight: 18,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 10,
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 40,
  },
});
