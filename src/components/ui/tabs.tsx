"use client"

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import type React from 'react'
import { cn } from '../../lib/utils'

export type TabsVariant = 'default' | 'underline'

export function Tabs({ className, ...props }: TabsPrimitive.Root.Props): React.ReactElement {
  return <TabsPrimitive.Root className={cn('region-tabs-root', typeof className === 'string' ? className : undefined)} data-slot="tabs" {...props} />
}

export function TabsList({ variant = 'default', className, children, ...props }: TabsPrimitive.List.Props & { variant?: TabsVariant }): React.ReactElement {
  return <TabsPrimitive.List className={cn('region-tabs-list', `is-${variant}`, typeof className === 'string' ? className : undefined)} data-slot="tabs-list" {...props}>
    {children}
    <TabsPrimitive.Indicator className="region-tabs-indicator" data-slot="tab-indicator" />
  </TabsPrimitive.List>
}

export function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props): React.ReactElement {
  return <TabsPrimitive.Tab className={cn('region-tabs-tab', typeof className === 'string' ? className : undefined)} data-slot="tabs-tab" {...props} />
}

export function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props): React.ReactElement {
  return <TabsPrimitive.Panel className={cn('region-tabs-panel', typeof className === 'string' ? className : undefined)} data-slot="tabs-content" {...props} />
}
