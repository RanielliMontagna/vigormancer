import * as React from 'react'
import { View, type ViewProps } from 'react-native'

import { ViewRef } from '@rn-primitives/types'

import { TextClassContext } from '../ui/text'
import { cn } from '@/utils'

const Card = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('rounded-2xl bg-card  elevation-sm', className)} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardContent = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value="text-card-foreground">
    <View ref={ref} className={cn('p-4', className)} {...props} />
  </TextClassContext.Provider>
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardFooter, CardHeader }
