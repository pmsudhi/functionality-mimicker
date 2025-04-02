
// Define the Parameter type
export interface Parameter {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  unit?: string;
}

// Define the Block type
export interface Block {
  id: string;
  type: string;
  title: string;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  parameters: Parameter[];
}
