import { ArrayStringProps, BreakpointsProps, ClassnameProps } from '@/libs/@types';
import { joinArrayString } from '../utils/joinArrayString';

export const BREAKPOINT_HANDLE: Partial<Record<BreakpointsProps, string>> = {
    xxl: '2xl',
    xxxl: '3xl',
} as const;

export type CreateBreakpointClassProps = {
    breakpoint?: BreakpointsProps;
    value: string | number;
} & Required<ClassnameProps>;

export const createBreakpointClass = ({ breakpoint, className, value }: CreateBreakpointClassProps) => {
    let breakpointHandle: string | undefined = undefined;
    if (breakpoint && breakpoint !== 'xs') {
        breakpointHandle = breakpoint;

        if (BREAKPOINT_HANDLE?.[breakpoint]) breakpointHandle = BREAKPOINT_HANDLE[breakpoint];
    }

    const breakpointClass: ArrayStringProps = [];
    if (breakpointHandle) breakpointClass.push(`${breakpointHandle}:`);
    breakpointClass.push(className);
    breakpointClass.push(`-${typeof value === 'string' ? value : Math.abs(value)}`);

    return joinArrayString(breakpointClass, '');
};
