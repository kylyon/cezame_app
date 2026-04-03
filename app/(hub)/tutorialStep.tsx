import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
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

export default function TutorialStep({ route }: { route: any }) {
  const { domainId, stepId } = route.params;
  const navigation = useNavigation();
  const { isStepCompleted, toggleStep } = useProgress();

  const domain = domains.find(d => d.id === domainId);
  const step = domain?.steps.find(s => s.id === stepId);

  const [showTip, setShowTip] = useState(false);

  if (!domain || !step) return null;

  const completed = isStepCompleted(step.id);
  const stepIndex = domain.steps.findIndex(s => s.id === stepId);
  const nextStep = domain.steps[stepIndex + 1];

  const handleComplete = () => {
    if (!completed) {
      toggleStep(step.id);
    }
    if (nextStep) {
      // @ts-ignore
      navigation.replace('tutorialStep', { domainId, stepId: nextStep.id });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: domain.colorLight }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>

        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          {domain.steps.map((s, i) => (
            <View
              key={s.id}
              style={[
                styles.stepDot,
                i === stepIndex
                  ? { backgroundColor: domain.color, transform: [{ scale: 1.3 }] }
                  : isStepCompleted(s.id)
                  ? { backgroundColor: domain.color, opacity: 0.5 }
                  : { backgroundColor: '#DDD' },
              ]}
            />
          ))}
        </View>

        {/* Title area */}
        <View style={styles.titleArea}>
          <Text style={styles.emoji}>{step.emoji}</Text>
          <Text style={styles.stepLabel}>
            Étape {stepIndex + 1}/{domain.steps.length}
          </Text>
          <Text style={styles.title}>{step.title}</Text>
        </View>

        {/* Content cards */}
        <View style={styles.contentSection}>
          {step.content.map((paragraph, index) => (
            <View key={index} style={styles.contentCard}>
              <View style={[styles.contentNumber, { backgroundColor: domain.color }]}>
                <Text style={styles.contentNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.contentText}>{paragraph}</Text>
            </View>
          ))}
        </View>

        {/* Tip section */}
        <TouchableOpacity
          style={[styles.tipCard, { borderColor: domain.color }]}
          activeOpacity={0.8}
          onPress={() => setShowTip(!showTip)}>
          <View style={styles.tipHeader}>
            <Text style={styles.tipEmoji}>💡</Text>
            <Text style={styles.tipTitle}>Astuce de pro</Text>
            <Text style={styles.tipToggle}>{showTip ? '▲' : '▼'}</Text>
          </View>
          {showTip && <Text style={styles.tipText}>{step.tip}</Text>}
        </TouchableOpacity>

        {/* Action button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: domain.color }]}
          activeOpacity={0.8}
          onPress={handleComplete}>
          <Text style={styles.actionButtonText}>
            {completed
              ? nextStep
                ? 'Étape suivante →'
                : 'Retour au parcours'
              : nextStep
              ? "J'ai compris ! Étape suivante →"
              : "J'ai compris ! Terminer 🎉"}
          </Text>
        </TouchableOpacity>

        {/* Already completed indicator */}
        {completed && (
          <View style={styles.alreadyDone}>
            <Text style={styles.alreadyDoneText}>✓ Tu as déjà validé cette étape</Text>
          </View>
        )}

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
  // Step indicator dots
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  // Title
  titleArea: {
    alignItems: 'center',
    marginBottom: 28,
  },
  emoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  stepLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
    textAlign: 'center',
    lineHeight: 32,
  },
  // Content
  contentSection: {
    gap: 14,
    marginBottom: 24,
  },
  contentCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  contentNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginTop: 2,
  },
  contentNumberText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  contentText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  // Tip
  tipCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    marginBottom: 28,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  tipTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  tipToggle: {
    fontSize: 12,
    color: '#AAA',
  },
  tipText: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
    lineHeight: 21,
  },
  // Action
  actionButton: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFF',
  },
  alreadyDone: {
    alignItems: 'center',
    marginTop: 14,
  },
  alreadyDoneText: {
    fontSize: 13,
    color: '#999',
  },
  bottomSpacer: {
    height: 40,
  },
});
