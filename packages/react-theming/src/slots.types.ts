/**
 * Defines the 'classes' object based on TSlots props passed.
 */
export declare type IClasses<TSlots> = {
  [key in keyof TSlots]: string;
};

/**
 * Defines the 'slotProps' object based on TSlots props passed.
 */
export declare type ISlotProps<TSlots> = {
  [key in keyof TSlots]: { [key: string]: any };
};

/**
 * Defines the set of slot related props a component should inherit.
 */
export interface IWithSlots<TSlots> {
  /** Defines a partial TSlotProps object that specifies user provided props that are propagated to the corresponding slots. */
  slotProps?: Partial<ISlotProps<TSlots>>;

  /** Defines a TSlotProps object that  */
  slots?: Partial<TSlots>;
}

export interface IWithClasses<TClasses> {
  /** Defines a partial TSlotProps object that specifies user provided props that are propagated to the corresponding slots. */
  classes?: Partial<TClasses>;
}

/**
 * Defines an interface that takes in TComponentProps and adds a ref to it.
 */
export type IStateProps<TComponentProps> = TComponentProps & {
  componentRef?: React.Ref<Partial<HTMLElement>>;
};

export type IComponentWithExtras<TSlots> = {
  slots: TSlots;
  variants?: string[];
};

/**
 * Defines a component that contains static `slots` prop for accessing default slots.
 */
export type IComponentWithSlots<TProps extends { slots?: Partial<TSlots> }, TSlots> = ((
  props: TProps,
) => JSX.Element) &
  IComponentWithExtras<TSlots>;

/**
 * Defines a component that contains static `slots` prop for accessing default slots.
 */
export type IComponentWithSlotsAndRef<
  TProps extends { slots?: Partial<TSlots> },
  TSlots
> = React.ForwardRefExoticComponent<TProps> & IComponentWithExtras<TSlots>;
