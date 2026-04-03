import React, { createContext, useCallback, useContext, useState } from 'react';
import { domains } from '@/data/tutorials';

interface ProgressContextType {
  completedSteps: Set<string>;
  toggleStep: (stepId: string) => void;
  isStepCompleted: (stepId: string) => boolean;
  getDomainProgress: (domainId: string) => { completed: number; total: number };
  getTotalProgress: () => { completed: number; total: number };
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = useCallback((stepId: string) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  }, []);

  const isStepCompleted = useCallback(
    (stepId: string) => completedSteps.has(stepId),
    [completedSteps]
  );

  const getDomainProgress = useCallback(
    (domainId: string) => {
      const domain = domains.find(d => d.id === domainId);
      if (!domain) return { completed: 0, total: 0 };
      const total = domain.steps.length;
      const completed = domain.steps.filter(s => completedSteps.has(s.id)).length;
      return { completed, total };
    },
    [completedSteps]
  );

  const getTotalProgress = useCallback(() => {
    const total = domains.reduce((sum, d) => sum + d.steps.length, 0);
    const completed = domains.reduce(
      (sum, d) => sum + d.steps.filter(s => completedSteps.has(s.id)).length,
      0
    );
    return { completed, total };
  }, [completedSteps]);

  return (
    <ProgressContext.Provider
      value={{ completedSteps, toggleStep, isStepCompleted, getDomainProgress, getTotalProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
