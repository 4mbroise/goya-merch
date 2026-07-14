import { ChevronUpDown } from "@medusajs/icons"
import { Label, clx } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  label?: string
  ariaLabel?: string
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, label, ariaLabel, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)
    const id = useId()

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div>
        {label && (
          <Label htmlFor={id} className="mb-2 txt-compact-medium-plus">
            {label}
          </Label>
        )}
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex items-center text-base-regular border border-ui-border-base bg-ui-bg-subtle rounded-md hover:bg-ui-bg-field-hover",
            className,
            {
              "text-ui-fg-muted": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            id={label ? id : undefined}
            defaultValue={defaultValue}
            aria-label={!label ? ariaLabel : undefined}
            {...props}
            className="appearance-none flex-1 bg-transparent border-none px-4 py-2.5 transition-colors duration-150 outline-none "
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none ">
            <ChevronUpDown />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
