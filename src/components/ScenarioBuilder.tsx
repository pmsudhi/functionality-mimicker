
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import SliderControl from "@/components/scenarios/controls/SliderControl";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus,
  Save,
  Trash,
  Copy,
  ChevronsUp,
  ChevronsDown,
  XCircle
} from "lucide-react";

// Define the parameter block types
type BlockType = 'space' | 'service' | 'operational' | 'efficiency' | 'custom';

interface ParameterBlock {
  id: string;
  type: BlockType;
  title: string;
  colorClass: string;
  parameters: Parameter[];
}

interface Parameter {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  isCalculated?: boolean;
  calculation?: (params: Record<string, number>) => number;
}

const ScenarioBuilder = () => {
  const { toast } = useToast();
  const [scenarioName, setScenarioName] = useState("New Scenario");
  const [selectedBrand, setSelectedBrand] = useState("white-robata");
  const [selectedOutlet, setSelectedOutlet] = useState("mall-of-dhahran");
  const [ramadanAdjustment, setRamadanAdjustment] = useState(false);
  
  // State for managing parameter blocks
  const [blocks, setBlocks] = useState<ParameterBlock[]>([]);
  const [nextBlockId, setNextBlockId] = useState(1);
  
  // Parameter values state
  const [paramValues, setParamValues] = useState<Record<string, number>>({});
  
  // Debug logging for state changes
  useEffect(() => {
    console.log("Blocks state updated:", blocks);
  }, [blocks]);
  
  useEffect(() => {
    console.log("Parameter values updated:", paramValues);
  }, [paramValues]);
  
  // Add a new parameter block
  const addBlock = useCallback((type: BlockType) => {
    console.log("Adding block of type:", type);
    const id = `block-${nextBlockId}`;
    let newBlock: ParameterBlock;
    
    switch(type) {
      case 'space':
        newBlock = {
          id,
          type,
          title: 'Space Configuration',
          colorClass: 'border-blue-100 bg-blue-50/30',
          parameters: [
            {
              id: `${id}-total-area`,
              label: 'Total Area (sqm)',
              value: 300,
              min: 100,
              max: 1000,
              step: 10
            },
            {
              id: `${id}-foh-percentage`,
              label: 'FOH Percentage',
              value: 65,
              min: 40,
              max: 80,
              step: 5,
              unit: '%'
            },
            {
              id: `${id}-seating-capacity`,
              label: 'Seating Capacity',
              value: 0,
              isCalculated: true,
              calculation: (params) => {
                // Calculate total capacity based on FOH area and area per cover
                const totalArea = params[`${id}-total-area`] || 300;
                const fohPercentage = params[`${id}-foh-percentage`] || 65;
                const areaPerCover = 1.67; // Default value
                const fohArea = totalArea * (fohPercentage / 100);
                return Math.round(fohArea / areaPerCover);
              }
            }
          ]
        };
        break;
      case 'service':
        newBlock = {
          id,
          type,
          title: 'Service Parameters',
          colorClass: 'border-green-100 bg-green-50/30',
          parameters: [
            {
              id: `${id}-covers-per-waiter`,
              label: 'Covers per Waiter',
              value: 16,
              min: 12,
              max: 24,
              step: 4
            },
            {
              id: `${id}-runner-ratio`,
              label: 'Runner Ratio',
              value: 2,
              min: 1,
              max: 4,
              step: 1
            },
            {
              id: `${id}-service-style`,
              label: 'Service Style',
              value: 2,
              min: 1,
              max: 3,
              step: 1
            }
          ]
        };
        break;
      case 'operational':
        newBlock = {
          id,
          type,
          title: 'Operational Hours',
          colorClass: 'border-yellow-100 bg-yellow-50/30',
          parameters: [
            {
              id: `${id}-operating-days`,
              label: 'Operating Days per Week',
              value: 7,
              min: 5,
              max: 7,
              step: 1
            },
            {
              id: `${id}-daily-hours`,
              label: 'Daily Operating Hours',
              value: 12,
              min: 6,
              max: 24,
              step: 1
            },
            {
              id: `${id}-peak-factor`,
              label: 'Peak Hour Factor',
              value: 1.5,
              min: 1.0,
              max: 2.0,
              step: 0.1
            }
          ]
        };
        break;
      case 'efficiency':
        newBlock = {
          id,
          type,
          title: 'Efficiency Drivers',
          colorClass: 'border-purple-100 bg-purple-50/30',
          parameters: [
            {
              id: `${id}-staff-utilization`,
              label: 'Staff Utilization Rate (%)',
              value: 80,
              min: 50,
              max: 100,
              step: 5
            },
            {
              id: `${id}-technology-impact`,
              label: 'Technology Impact (%)',
              value: 8,
              min: 0,
              max: 30,
              step: 1
            },
            {
              id: `${id}-cross-training`,
              label: 'Cross-Training Capability (%)',
              value: 12,
              min: 0,
              max: 30,
              step: 1
            }
          ]
        };
        break;
      case 'custom':
      default:
        newBlock = {
          id,
          type,
          title: 'Custom Parameters',
          colorClass: 'border-orange-100 bg-orange-50/30',
          parameters: [
            {
              id: `${id}-custom-1`,
              label: 'Custom Parameter 1',
              value: 50,
              min: 0,
              max: 100,
              step: 5
            }
          ]
        };
    }
    
    // Initialize parameter values for the new block
    const newParamValues = { ...paramValues };
    newBlock.parameters.forEach(param => {
      newParamValues[param.id] = param.value;
    });
    
    // Add the new block and update parameter values
    setParamValues(newParamValues);
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setNextBlockId(prevId => prevId + 1);
    
    toast({
      title: "Section Added",
      description: `${newBlock.title} has been added to your scenario.`,
    });
    
    console.log("Block added:", newBlock);
  }, [nextBlockId, paramValues, toast]);
  
  // Remove a parameter block
  const removeBlock = useCallback((blockId: string) => {
    console.log("Removing block with ID:", blockId);
    
    // Filter out the block to remove
    setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
    
    // Also remove its parameter values
    setParamValues(prev => {
      const updatedValues = { ...prev };
      Object.keys(updatedValues).forEach(key => {
        if (key.startsWith(blockId)) {
          delete updatedValues[key];
        }
      });
      return updatedValues;
    });
    
    toast({
      title: "Section Removed",
      description: "The section has been removed from your scenario.",
    });
  }, [toast]);
  
  // Add a new parameter to a block
  const addParameter = useCallback((blockId: string) => {
    console.log("Adding parameter to block:", blockId);
    
    setBlocks(prevBlocks => {
      return prevBlocks.map(block => {
        if (block.id === blockId) {
          const newParamId = `${blockId}-custom-${block.parameters.length + 1}`;
          const newParam = {
            id: newParamId,
            label: `Custom Parameter ${block.parameters.length + 1}`,
            value: 50,
            min: 0,
            max: 100,
            step: 5
          };
          
          // Update param values
          setParamValues(prev => ({
            ...prev,
            [newParamId]: newParam.value
          }));
          
          return {
            ...block,
            parameters: [...block.parameters, newParam]
          };
        }
        return block;
      });
    });
    
    toast({
      title: "Parameter Added",
      description: "A new parameter has been added to the section.",
    });
  }, [toast]);
  
  // Update parameter value - this is the key function that needs to work correctly
  const updateParameterValue = useCallback((paramId: string, values: number[]) => {
    console.log("Updating parameter:", paramId, "with values:", values);
    const newValue = values[0];
    
    // First update the specific parameter that changed
    setParamValues(prev => {
      // Create a copy with the updated value
      const newValues = { ...prev, [paramId]: newValue };
      
      // Recalculate any dependent parameters after the one that changed directly
      blocks.forEach(block => {
        block.parameters.forEach(param => {
          if (param.isCalculated && param.calculation) {
            newValues[param.id] = param.calculation(newValues);
          }
        });
      });
      
      return newValues;
    });
  }, [blocks]);
  
  // Recalculate dependent values whenever blocks or params change
  useEffect(() => {
    if (blocks.length === 0) return;
    
    let hasUpdates = false;
    const updatedValues = { ...paramValues };
    
    blocks.forEach(block => {
      block.parameters.forEach(param => {
        if (param.isCalculated && param.calculation) {
          const calculatedValue = param.calculation(paramValues);
          if (updatedValues[param.id] !== calculatedValue) {
            updatedValues[param.id] = calculatedValue;
            hasUpdates = true;
          }
        }
      });
    });
    
    if (hasUpdates) {
      console.log("Updating calculated values:", updatedValues);
      setParamValues(updatedValues);
    }
  }, [blocks, paramValues]);
  
  const handleSaveScenario = useCallback(() => {
    console.log("Saving scenario:", scenarioName);
    toast({
      title: "Scenario Saved",
      description: `"${scenarioName}" has been saved successfully.`
    });
  }, [scenarioName, toast]);
  
  const handleReset = useCallback(() => {
    console.log("Resetting parameters");
    // Reset to default parameter values for each block
    const resetValues = { ...paramValues };
    
    blocks.forEach(block => {
      block.parameters.forEach(param => {
        if (!param.isCalculated) {
          resetValues[param.id] = param.value; // Reset to original default
        }
      });
    });
    
    // Recalculate any calculated parameters
    blocks.forEach(block => {
      block.parameters.forEach(param => {
        if (param.isCalculated && param.calculation) {
          resetValues[param.id] = param.calculation(resetValues);
        }
      });
    });
    
    setParamValues(resetValues);
    
    toast({
      title: "Parameters Reset",
      description: "All parameters have been reset to default values."
    });
  }, [blocks, paramValues, toast]);
  
  // React to input events
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changing:", e.target.id, e.target.value);
    setScenarioName(e.target.value);
  };
  
  console.log("Rendering ScenarioBuilder with state:", { 
    blocks, 
    paramValues, 
    scenarioName, 
    selectedBrand, 
    selectedOutlet 
  });
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Scenario Configuration</CardTitle>
            <CardDescription>Define your scenario parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input 
                id="scenario-name" 
                value={scenarioName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="white-robata">White Robata</SelectItem>
                  <SelectItem value="lazy-cat">Lazy Cat</SelectItem>
                  <SelectItem value="burger-boutique">Burger Boutique</SelectItem>
                  <SelectItem value="nomad">Nomad</SelectItem>
                  <SelectItem value="swaikhat">Swaikhat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="outlet">Outlet</Label>
              <Select value={selectedOutlet} onValueChange={setSelectedOutlet}>
                <SelectTrigger id="outlet">
                  <SelectValue placeholder="Select Outlet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mall-of-dhahran">Mall of Dhahran</SelectItem>
                  <SelectItem value="riyadh-park">Riyadh Park</SelectItem>
                  <SelectItem value="red-sea-mall">Red Sea Mall</SelectItem>
                  <SelectItem value="al-nakheel-mall">Al Nakheel Mall</SelectItem>
                  <SelectItem value="jeddah-corniche">Jeddah Corniche</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="sar">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sar">SAR (Saudi Riyal)</SelectItem>
                  <SelectItem value="usd">USD (US Dollar)</SelectItem>
                  <SelectItem value="aed">AED (Emirati Dirham)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-4">
              <Switch 
                id="ramadan-adjustment" 
                checked={ramadanAdjustment}
                onCheckedChange={setRamadanAdjustment}
              />
              <Label htmlFor="ramadan-adjustment">Apply Ramadan Adjustment (50% capacity)</Label>
            </div>
            
            <div className="pt-4">
              <Button className="w-full" onClick={handleSaveScenario}>
                <Save className="mr-2 h-4 w-4" />
                Save Scenario
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Drag & Drop Scenario Builder</CardTitle>
            <CardDescription>Build your scenario by adding parameter blocks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Button 
                variant="outline" 
                className="flex items-center justify-start hover:bg-blue-50/50 border-blue-100"
                onClick={() => addBlock('space')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Space Configuration
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start hover:bg-green-50/50 border-green-100"
                onClick={() => addBlock('service')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Service Parameters
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start hover:bg-yellow-50/50 border-yellow-100"
                onClick={() => addBlock('operational')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Operational Hours
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start hover:bg-purple-50/50 border-purple-100"
                onClick={() => addBlock('efficiency')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Efficiency Drivers
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center justify-start hover:bg-orange-50/50 border-orange-100"
                onClick={() => addBlock('custom')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Custom Parameters
              </Button>
            </div>
            
            <div className="mt-6 space-y-6">
              {blocks.map((block, index) => (
                <Card key={block.id} className={`border-2 ${block.colorClass}`}>
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-medium flex items-center">
                        <span className={`bg-${block.colorClass.split('-')[1]}-100 text-${block.colorClass.split('-')[1]}-700 rounded-full w-5 h-5 inline-flex items-center justify-center mr-2`}>
                          {index + 1}
                        </span>
                        {block.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Adjust parameters for this block
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">{block.parameters.length} parameters</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {block.parameters.map((param) => (
                      <div key={param.id}>
                        <SliderControl
                          label={param.label}
                          value={paramValues[param.id] || param.value}
                          min={param.min}
                          max={param.max}
                          step={param.step}
                          onChange={(values) => updateParameterValue(param.id, values)}
                          disabled={param.isCalculated}
                          description={param.isCalculated ? "Calculated value" : undefined}
                        />
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => addParameter(block.id)}
                    >
                      <Plus className="mr-2 h-3 w-3" />
                      Add Parameter
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {blocks.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed rounded-lg border-muted">
                  <p className="text-muted-foreground">
                    No parameter blocks added yet. Use the buttons above to add sections to your scenario.
                  </p>
                </div>
              )}
            </div>
            
            {blocks.length > 0 && (
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  Reset Parameters
                </Button>
                <Button onClick={handleSaveScenario}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Scenario
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScenarioBuilder;
