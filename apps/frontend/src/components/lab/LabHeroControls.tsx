"use client";

import * as React from "react";
import { Settings2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VerticalSlider, type VerticalSliderProps } from "@/components/ui/vertical-slider";
import { cn } from "@/lib/utils";

interface LabHeroControlsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    heading: string;
    closeLabel: string;
    className?: string;
    children: React.ReactNode;
}

/**
 * Floating controls panel used by lab-item heroes. Renders a collapse trigger
 * when closed, or a panel with a heading/close row wrapping `children` when open.
 */
function LabHeroControls({
    open,
    onOpenChange,
    heading,
    closeLabel,
    className,
    children,
}: LabHeroControlsProps) {
    if (!open) {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenChange(true)}
                className="backdrop-blur-md bg-background/60"
            >
                <Settings2 className="h-4 w-4" />
                {heading}
            </Button>
        );
    }

    return (
        <div
            className={cn(
                "w-[280px] md:w-[320px] border border-border bg-background/70 p-4 shadow-lg backdrop-blur-md",
                className,
            )}
        >
            <div className="mb-3 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {heading}
                </span>
                <Button
                    type="button"
                    aria-label={closeLabel}
                    onClick={() => onOpenChange(false)}
                    variant="ghost"
                    size="icon-xs"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
            {children}
        </div>
    );
}

function LabControlsGroup({
    label,
    className,
    children,
}: {
    label?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("space-y-1.5", className)}>
            {label && (
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {label}
                </span>
            )}
            {children}
        </div>
    );
}

interface SliderConfig extends VerticalSliderProps {
    key: string;
}

function LabControlSliders({
    sliders,
    className,
}: {
    sliders: SliderConfig[];
    className?: string;
}) {
    return (
        <div className={cn("flex justify-between gap-2", className)}>
            {sliders.map(({ key, ...slider }) => (
                <VerticalSlider key={key} {...slider} />
            ))}
        </div>
    );
}

interface PillOption {
    value: string;
    label: string;
}

function LabControlPillGroup({
    value,
    onChange,
    options,
    label,
    className,
}: {
    value: string;
    onChange: (value: string) => void;
    options: PillOption[];
    label?: string;
    className?: string;
}) {
    return (
        <LabControlsGroup label={label}>
            <ToggleGroup
                type="single"
                size="xs"
                value={value}
                onValueChange={(v) => {
                    if (v) onChange(v);
                }}
                className={cn("w-full flex-wrap", className)}
            >
                {options.map((opt) => (
                    <ToggleGroupItem
                        key={opt.value}
                        value={opt.value}
                        className="min-w-fit flex-1 capitalize"
                    >
                        {opt.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </LabControlsGroup>
    );
}

interface SelectOption {
    value: string;
    label: string;
}

function LabControlSelect({
    label,
    value,
    onValueChange,
    options,
    className,
}: {
    label?: string;
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    className?: string;
}) {
    return (
        <LabControlsGroup label={label} className={className}>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="w-full" size="sm">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </LabControlsGroup>
    );
}

function LabControlToggle({
    id,
    label,
    checked,
    onCheckedChange,
    className,
}: {
    id: string;
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Checkbox
                id={id}
                checked={checked}
                onCheckedChange={(c) => onCheckedChange(c === true)}
            />
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
        </div>
    );
}

export {
    LabHeroControls,
    LabControlsGroup,
    LabControlSliders,
    LabControlPillGroup,
    LabControlSelect,
    LabControlToggle,
};
export type { SliderConfig, PillOption, SelectOption };
