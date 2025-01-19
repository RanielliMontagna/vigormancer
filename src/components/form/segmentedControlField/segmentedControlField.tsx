import { Control } from 'react-hook-form'
import SegmentedControl, {
  SegmentedControlProps,
} from '@react-native-segmented-control/segmented-control'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form/form'

interface SegmentedControlFieldProps extends Omit<SegmentedControlProps, 'selectedIndex'> {
  control: Control<any>
  name: string
  label?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  required?: boolean
  helperText?: string

  options: string[]
}

export function SegmentedControlField({
  control,
  name,
  label,
  required,
  helperText,
  options,
  ...rest
}: SegmentedControlFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem>
          {label && (
            <FormLabel required={required} htmlFor={name}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <SegmentedControl
              values={options}
              onChange={(event) => onChange(event.nativeEvent.selectedSegmentIndex)}
              selectedIndex={value}
              style={{ height: 40 }}
              {...rest}
            />
          </FormControl>
          <FormMessage>{helperText}</FormMessage>
        </FormItem>
      )}
    />
  )
}
