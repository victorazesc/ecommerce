"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"
import { Label } from "../ui/label"
import { Slider } from "../ui/slider"


interface MinMaxValueSelectorProps {
    defaultValue: SliderProps["defaultValue"]
    label: string
    min: number
    max: number
    onChange: any
}

export function MinMaxValueSelector({ defaultValue, label, min, max, onChange }: MinMaxValueSelectorProps) {
    const [value, setValue] = React.useState(defaultValue)
    const handleChangeValue = (value: React.SetStateAction<number[] | undefined>) => {
        setValue(value)
        onChange(value)
    }

    return (
        <div className="grid gap-2 pt-2">

            <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="maxlength">{label}</Label>
                    <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {value}
                    </span>
                </div>
                <Slider
                    id="maxlength"
                    min={min}
                    max={max}
                    defaultValue={value}
                    step={10}
                    onValueChange={handleChangeValue}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    aria-label={label}
                />
            </div>
        </div>
    )
}