"use client";
import { Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import Typography from "@/interfaces/components/Typography";
import FormInput from "@/interfaces/components/form-input";
import { Button } from "@/interfaces/components/ui/button";
import MainLayout from "@/interfaces/layouts/main_layout";

export default function Sandbox() {
	const methods = useForm({
		defaultValues: {
			expiresInMins: 100,
			username: "emilys",
			password: "",
			date: "2023-10-01",
			check: true,
			select: true,
		},
	});
	const { control } = methods;

	return (
		<MainLayout>
			<div className="p-12">
				<h1 className="font-semibold">Buttons</h1>

				<div className="flex flex-wrap gap-8 mt-8">
					<Button variant="primaryBlue">Button</Button>
					<Button isLoading>Button</Button>
					<Button variant={"outline"}>Button</Button>
					<Button rightIcon={Calendar}>With Icon</Button>
				</div>
			</div>
			<div className="p-12">
				<h1 className="font-semibold">Form Input</h1>

				<FormProvider {...methods}>
					<div className="flex flex-wrap gap-8 mt-8">
						<FormInput
							name="username"
							control={control}
							type="text"
							label="Username"
							rules={{ required: true }}
							errors={undefined}
						/>
						<FormInput
							name="date"
							control={control}
							type="date"
							label="date"
							rules={{ required: true }}
							errors={undefined}
						/>
						<FormInput
							name="password"
							control={control}
							type="password"
							label="password"
							rules={{ required: true }}
							errors={undefined}
						/>
						<FormInput
							name="check"
							control={control}
							type="checkbox"
							label="checkbox"
							rules={{ required: true }}
							errors={undefined}
						/>
						<FormInput
							name="select"
							control={control}
							type="radio"
							options={[
								{ label: "Option 1", value: "option1" },
								{ label: "Option 2", value: "option2" },
							]}
							label="SELECT AMONG THESE OPTIONS"
							rules={{ required: true }}
						/>
					</div>
				</FormProvider>
			</div>

			<div className="p-12">
				<h1 className="font-semibold">Typography</h1>

				<div className="space-y-8 mt-8">
					<Typography variant="2xl" color="red" weight="bold">
						Typography
					</Typography>
					<Typography variant="xl" color="blue">
						Typography
					</Typography>
					<Typography variant="lg" color="foreground">
						Typography
					</Typography>
					<Typography variant="base" color="red">
						Typography
					</Typography>
					<Typography variant="sm" color="red">
						Typography
					</Typography>
				</div>
			</div>
		</MainLayout>
	);
}
