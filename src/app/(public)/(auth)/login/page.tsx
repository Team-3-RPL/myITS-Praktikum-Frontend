"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import FormInput from "@/interfaces/components/form-input";
import { Button } from "@/interfaces/components/ui/button";
import MainLayout from "@/interfaces/layouts/main_layout";

export default function Login() {
	const methods = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const { handleSubmit, control } = methods;

	return (
		<MainLayout className="h-screen relative">
			<Image
				src={"/images/BG-ITS.png"}
				fill
				priority
				alt="Institut Teknologi Sepuluh Nopember"
				className="w-full object-cover"
			/>

			<div className="flex justify-center items-center h-full relative">
				<div className="bg-dark-main/75 w-full max-w-[715px] rounded-[20px] py-8 px-12">
					<figure>
						<Image
							src="/images/myITS-Praktikum.png"
							width={127}
							height={127}
							alt="Logo myITS Praktikum"
						/>
					</figure>

					<FormInput
						name="username"
						control={control}
						type="text"
						placeholder="Username"
						labelClassName="!text-foreground"
						label="Username"
						rules={{ required: true }}
					/>

					<FormInput
						name="password"
						control={control}
						type="password"
						placeholder="Password"
						label="Password"
						labelClassName="!text-foreground"
						rules={{ required: true }}
					/>

					<Link href="/login" className="w-full">
						<Button variant="primaryBlue" className="mt-12">
							Login
						</Button>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
}
