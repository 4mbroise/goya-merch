import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"
import X from "@modules/common/icons/x"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
  outOfStockValues?: string[]
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  outOfStockValues = [],
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-label text-editorial-fg-subtle">Select {title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isOutOfStock = outOfStockValues.includes(v)
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              aria-pressed={v === current}
              className={clx(
                "border border-editorial-border rounded-soft h-10 text-label flex-1 relative",
                {
                  "bg-editorial-black text-white border-editorial-black": v === current && !isOutOfStock,
                  "bg-transparent text-editorial-ink hover:bg-editorial-cream": v !== current,
                  "opacity-50": isOutOfStock,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              <span className={clx({ "line-through": isOutOfStock })}>{v}</span>
              {isOutOfStock && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <X className="w-3 h-3 text-ui-fg-base" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
