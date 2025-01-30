import * as React from 'react'
import { Platform, StyleSheet, Image } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import * as SelectPrimitive from '@rn-primitives/select'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { cn } from '@/utils'
import { useColorScheme } from '@/hooks'
import colors from 'tailwindcss/colors'
import { Asset } from 'expo-asset'

type Option = SelectPrimitive.Option

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

interface SelectValueProps extends SelectPrimitive.ValueProps {
  value: Option
}

const SelectValue = React.forwardRef<SelectPrimitive.ValueRef, SelectValueProps>(
  ({ className, placeholder, value, ...props }, ref) => (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        'text-sm font-lexend-regular line-clamp-1',
        value ? 'text-popover-foreground' : 'text-muted-foreground',
        className,
      )}
      placeholder={placeholder}
      {...props}
    />
  ),
)

SelectValue.displayName = SelectPrimitive.Value.displayName

const SelectTrigger = React.forwardRef<
  SelectPrimitive.TriggerRef,
  Omit<SelectPrimitive.TriggerProps, 'children'> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => {
  const { isDarkColorScheme } = useColorScheme()

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-row h-10 native:h-12 items-center text-sm justify-between rounded-md border border-border bg-input px-3 py-2 web:ring-offset-background text-muted-foreground web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2 [&>span]:line-clamp-1',
        props.disabled && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
    >
      {children}
      <FontAwesome6
        size={14}
        name="chevron-down"
        color={isDarkColorScheme ? colors.gray[400] : colors.gray[500]}
      />
    </SelectPrimitive.Trigger>
  )
})

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/**
 * Platform: WEB ONLY
 */
const SelectScrollUpButton = ({ className, ...props }: SelectPrimitive.ScrollUpButtonProps) => {
  if (Platform.OS !== 'web') {
    return null
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <FontAwesome6 size={14} name="chevron-up" className="text-muted-foreground" />
    </SelectPrimitive.ScrollUpButton>
  )
}

/**
 * Platform: WEB ONLY
 */
const SelectScrollDownButton = ({ className, ...props }: SelectPrimitive.ScrollDownButtonProps) => {
  const { isDarkColorScheme } = useColorScheme()

  if (Platform.OS !== 'web') return null

  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex web:cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <FontAwesome6
        size={14}
        name="chevron-down"
        color={isDarkColorScheme ? colors.gray[400] : colors.gray[500]}
      />
    </SelectPrimitive.ScrollDownButton>
  )
}

const SelectContent = React.forwardRef<
  SelectPrimitive.ContentRef,
  SelectPrimitive.ContentProps & { portalHost?: string }
>(({ className, children, position = 'popper', portalHost, ...props }, ref) => {
  const { open } = SelectPrimitive.useRootContext()

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <SelectPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View className="z-50" entering={FadeIn} exiting={FadeOut}>
          <SelectPrimitive.Content
            ref={ref}
            className={cn(
              'relative z-50 max-h-96 min-w-[8rem] rounded-md border border-border bg-popover shadow-md shadow-foreground/10 py-2 px-1 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
              position === 'popper' &&
                'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
              open
                ? 'web:zoom-in-95 web:animate-in web:fade-in-0'
                : 'web:zoom-out-95 web:animate-out web:fade-out-0',
              className,
            )}
            position={position}
            {...props}
          >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
              className={cn(
                'p-1',
                position === 'popper' &&
                  'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
              )}
            >
              {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
          </SelectPrimitive.Content>
        </Animated.View>
      </SelectPrimitive.Overlay>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<SelectPrimitive.LabelRef, SelectPrimitive.LabelProps>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'py-1.5 pl-2 pr-2 text-popover-foreground text-sm native:text-base font-semibold',
        className,
      )}
      {...props}
    />
  ),
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

type SelectItemProps = SelectPrimitive.ItemProps & { image?: string }

const SelectItem = React.forwardRef<SelectPrimitive.ItemRef, SelectItemProps>(
  ({ className, children, image, ...props }, ref) => {
    let imageUri: string | undefined

    if (image) {
      const asset = Asset.fromModule(image)
      imageUri = asset.uri
    }

    return (
      <SelectPrimitive.Item
        ref={ref}
        className={cn(
          'relative mx-1 p-4 bg-zinc-50 rounded-md active:bg-zinc-100 transition flex-row gap-2 items-center',
          props.disabled && 'web:pointer-events-none opacity-50',
          className,
        )}
        {...props}
      >
        {imageUri && <Image source={{ uri: imageUri }} className="w-28 h-28" resizeMode="cover" />}
        <SelectPrimitive.ItemText
          className={cn(
            'text-sm text-popover-foreground native:text-base web:group-focus:text-accent-foreground',
          )}
        />
      </SelectPrimitive.Item>
    )
  },
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  SelectPrimitive.SeparatorRef,
  SelectPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
}
