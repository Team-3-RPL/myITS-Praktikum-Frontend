"use client";
import { useForm } from "react-hook-form";

import Typography from "@/interfaces/components/Typography";
import FormInput from "@/interfaces/components/form-input";
import { Button } from "@/interfaces/components/ui/button";
import MainLayout from "@/interfaces/layouts/main_layout";
import { Calendar } from "lucide-react";

export default function Sandbox() {
	const { control } = useForm({
		defaultValues: {
			expiresInMins: 100,
			username: "emilys",
			password: "",
			date: "2023-10-01",
		},
	});

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
				</div>
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
