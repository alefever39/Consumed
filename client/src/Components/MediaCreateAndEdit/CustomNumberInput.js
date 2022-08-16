import { useNumberInput, Button, Input, HStack } from "@chakra-ui/react";

function CustomNumberInput({
  onChange,
  onType,
  value,
  name,
  defaultValue,
  min,
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: defaultValue,
      // max: 6,
      // precision: 2,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...inc} onClick={() => onChange(1, name, min)}>
        +
      </Button>
      <Input
        {...input}
        value={parseInt(value)}
        onChange={(e) => onType(e.target.value, name, min)}
      />
      <Button {...dec} onClick={() => onChange(-1, name, min)}>
        -
      </Button>
    </HStack>
  );
}

export default CustomNumberInput;
