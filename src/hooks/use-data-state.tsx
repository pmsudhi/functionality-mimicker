
import React from 'react';
import { LoadingState } from '@/components/ui/loading-state';
import { EmptyState } from '@/components/ui/empty-state';

interface WithDataStateProps<T> {
  data: T[] | undefined;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  emptyTitle?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
}

export function withDataState<T, P extends object>(
  Component: React.ComponentType<P & { data: T[] }>
) {
  return function WithDataState({
    data,
    isLoading,
    isError = false,
    errorMessage = "Something went wrong. Please try again.",
    emptyMessage = "There's no data to display right now.",
    emptyTitle = "No data found",
    emptyAction,
    ...props
  }: WithDataStateProps<T> & Omit<P, 'data'>) {
    if (isLoading) {
      return <LoadingState />;
    }

    if (isError) {
      return (
        <EmptyState
          title="Error"
          description={errorMessage}
          icon={<span className="text-destructive">!</span>}
        />
      );
    }

    if (!data || data.length === 0) {
      return (
        <EmptyState
          title={emptyTitle}
          description={emptyMessage}
          action={emptyAction}
        />
      );
    }

    return <Component data={data} {...(props as P)} />;
  };
}

// Helper hook to use with components that don't need the HOC pattern
export function useDataState<T>({
  data,
  isLoading,
  isError = false,
  errorMessage = "Something went wrong. Please try again.",
  emptyMessage = "There's no data to display right now.",
  emptyTitle = "No data found",
  emptyAction
}: WithDataStateProps<T>) {
  if (isLoading) {
    return {
      shouldRender: false,
      element: <LoadingState />
    };
  }

  if (isError) {
    return {
      shouldRender: false,
      element: (
        <EmptyState
          title="Error"
          description={errorMessage}
          icon={<span className="text-destructive">!</span>}
        />
      )
    };
  }

  if (!data || data.length === 0) {
    return {
      shouldRender: false,
      element: (
        <EmptyState
          title={emptyTitle}
          description={emptyMessage}
          action={emptyAction}
        />
      )
    };
  }

  return {
    shouldRender: true,
    element: null
  };
}
