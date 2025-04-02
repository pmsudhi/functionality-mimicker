
export type BlockColor = 'blue' | 'green' | 'yellow' | 'purple' | 'orange';

export const getColorClasses = (color: BlockColor) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-200',
      bg: 'bg-blue-50/50',
      numberBg: 'bg-blue-100',
      numberText: 'text-blue-700',
    },
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50/50',
      numberBg: 'bg-green-100',
      numberText: 'text-green-700',
    },
    yellow: {
      border: 'border-yellow-200',
      bg: 'bg-yellow-50/50',
      numberBg: 'bg-yellow-100',
      numberText: 'text-yellow-700',
    },
    purple: {
      border: 'border-purple-200',
      bg: 'bg-purple-50/50',
      numberBg: 'bg-purple-100',
      numberText: 'text-purple-700',
    },
    orange: {
      border: 'border-orange-200',
      bg: 'bg-orange-50/50',
      numberBg: 'bg-orange-100',
      numberText: 'text-orange-700',
    }
  };

  return colorClasses[color];
};
