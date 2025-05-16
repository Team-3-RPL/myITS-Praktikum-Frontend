import * as React from "react"
import { useState } from "react"
import {
	FieldValues,
	Path,
	UseControllerProps,
	get,
	useController,
	useFormContext,
} from "react-hook-form"

import Typography from "@/interfaces/components/Typography"
import { cn } from "@/lib/utils"

type FileUploadProps<T extends FieldValues> = {
	id: Path<T>
	label: string
	accept?: string
	className?: string
	hideError?: boolean
	maxSize?: number
	onSizeExceeded?: (fileSize: number, maxSize: number) => void
	customButton?: {
		uploadText?: string
		changeText?: string
		className?: string
	}
} & UseControllerProps<T>

export default function FileUpload<T extends FieldValues>({
	id,
	label,
	accept,
	rules,
	className,
	hideError = false,
	maxSize = 400,
	onSizeExceeded,
	customButton,
}: FileUploadProps<T>) {
	const {
		control,
		formState: { errors },
		setError,
		clearErrors,
		setValue,
		trigger,
	} = useFormContext<T>()

	const {
		field: { value, onChange: fieldOnChange, ...field },
	} = useController<T>({
		name: id,
		control,
		rules,
	})

	const error = get(errors, id)

	const [fileName, setFileName] = useState<string | null>(null)
	const [fileSize, setFileSize] = useState<number | null>(null)

	// useEffect(() => {
	// 	if ((value as File)?.name && (value as File)?.size) {
	// 		setFileName(value.name)
	// 		setFileSize(value.size / 1024)
	// 		trigger(id)
	// 	} else {
	// 		setFileName(null)
	// 		setFileSize(null)
	// 	}
	// }, [value])

	const validateFileSize = (file: File): boolean => {
		const fileSizeKB = file.size / 1024
		setFileSize(fileSizeKB)

		if (fileSizeKB > maxSize) {
			setError(id, {
				type: "manual",
				message: "Ukuran file melebihi batas maksimum (${maxSize} KB)",
			})

			if (onSizeExceeded) {
				onSizeExceeded(fileSizeKB, maxSize)
			}

			return false
		}

		clearErrors(id)
		return true
	}

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files ? event.target.files[0] : null

		if (file) {
			const isValidSize = validateFileSize(file)

			if (isValidSize) {
				setValue(id, file as never, { shouldValidate: true, shouldDirty: true })
				await trigger(id)
				setFileName(file.name)
			} else {
				event.target.value = ""
			}
		} else {
			setFileName(null)
			setFileSize(null)
			setValue(id, null as never, { shouldValidate: true })
		}
	}

	const formatFileSize = (sizeInKB: number | null): string => {
		if (sizeInKB === null) return ""
		return sizeInKB < 1000
			? `${Math.round(sizeInKB * 10) / 10} KB`
			: `${Math.round(sizeInKB / 100) / 10} MB`
	}

	const uploadText = customButton?.uploadText || "Unggah Berkas"
	const changeText = customButton?.changeText || "Ubah Berkas"
	const buttonClassName =
		customButton?.className ||
		cn(
			"w-max mt-2 px-4 py-2 cursor-pointer font-semibold block",
			"hover:opacity-90 disabled:opacity-50",
			"transition-all duration-fast",
			`${fileName ? "bg-white border-[2px] border-primary text-primary" : "bg-primary-blue text-white"}`,
			"disabled:shadow-none md:shadow-[4px_8px_8px_rgba(0,0,0,0.15)] md:hover:shadow-[4px_8px_8px_rgba(0,0,0,0.15)]",
			"px-[18px] py-2 md:px-6 rounded-xl",
			"text-sm md:text-base",
		)

	return (
		<div className={cn(className)}>
			<label htmlFor={id} className="text-black font-semibold block">
				{label}
			</label>
			<input
				id={id}
				type="file"
				accept={accept}
				className="hidden"
				onChange={handleFileChange}
				{...field}
			/>
			<label htmlFor={id} className={buttonClassName}>
				{fileName ? changeText : uploadText}
			</label>
			{fileName && (
				<div className="mt-2">
					<Typography as="p" variant="sm">
						{fileName} {fileSize && `(${formatFileSize(fileSize)})`}
					</Typography>
					<Typography as="p" variant="sm" className="text-gray-500 text-xs">
						Ukuran maksimum: {formatFileSize(maxSize)}
					</Typography>
				</div>
			)}

			{!hideError && error && (
				<div className="mt-2">
					<Typography color="red">{error.message}</Typography>
				</div>
			)}
		</div>
	)
}
