
// Export all hooks for consistency
export { useMemoizedData } from './use-memoized-data';
export { useIsMobile } from './use-mobile';
export { useToast } from './use-toast';

// Re-export external hooks that we're using
export { useToast as useToastNotification } from '@/hooks/use-toast';
