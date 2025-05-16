"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import FormInput from "@/interfaces/components/form-input";
import { Button } from "@/interfaces/components/ui/button";
import MainLayout from "@/interfaces/layouts/main_layout";
import { useRouter } from "next/navigation";
import { createCookies } from "@/modules/cookies";
import { ENV } from "@/configs/environment";
import { PATH } from "@/shared/path";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { REGEX } from "@/constant/regex";
import { post } from "@/services/api/main/call";
import { User, UserResponse } from "@/types/auth";
import { useUserStore } from "@/shared/toolkit/zustand/useUserStore";

type LoginProps = {
	email: string;
	password: string;
}

export default function Login() {
	const methods = useForm<LoginProps>({
		mode: "onBlur",
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { 
		handleSubmit, 
		control ,
		formState: { errors },
	} = methods;

	const { setUser } = useUserStore();

	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const { mutate } = useMutation<UserResponse, Error, LoginProps>({
		mutationFn: async (data) => {
			setLoading(true);
			const { Kind } = await post<UserResponse>(
				MAIN_ENDPOINT.Auth.Login,
				data,
			);

			const resp = Kind as UserResponse;
			return resp;
		},
		onSuccess: async (resp) => {
			await createCookies({
				name: ENV.TOKEN_KEY,
				data: resp.token,
			});

			setUser(resp.user);
			router.push(PATH.PRIVATE);
		},
		onError: (error) => {
			console.log({ error });
		},
		onSettled: () => {
			setLoading(false);
		},
	})

	const onSubmit = handleSubmit(async (data) => {
		mutate(data);
	});

	return (
		<MainLayout withNavbar={false} className="h-screen relative">
			<FormProvider {...methods}>
				<Image
					src={"/images/BG-ITS.png"}
					fill
					priority
					alt="Institut Teknologi Sepuluh Nopember"
					className="w-full object-cover"
				/>

				<div className="flex justify-center items-center h-full relative">
					<form onSubmit={onSubmit} className="bg-dark-main/75 w-full max-w-[715px] rounded-[20px] py-8 px-12">
						<figure>
							<Image
								src="/images/myITS-Praktikum.png"
								width={127}
								height={127}
								alt="Logo myITS Praktikum"
							/>
						</figure>

						<div>
							<FormInput
								name="email"
								control={control}
								type="text"
								placeholder="Email"
								labelClassName="!text-foreground"
								label="Email"
								rules={{ 
									required: "Email is required",
									pattern: {
										value: REGEX.EMAIL,
										message: "Email is not valid",
									},
								}}
								errors={errors}
							/>

							<FormInput
								name="password"
								control={control}
								type="password"
								placeholder="Password"
								label="Password"
								labelClassName="!text-foreground"
								rules={{ 
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password must be at least 8 characters",
									},
									maxLength: {
										value: 20,
										message: "Password must be at most 20 characters",
									}, 
								}}
								errors={errors}
							/>

							<Link 
								className="text-secondary-blue"
								href="/register">
								Register
							</Link>
						</div>

						<Button isLoading={loading} type="submit" variant="primaryBlue" className="mt-12">
							Login
						</Button>
					</form>
				</div>
			</FormProvider>
		</MainLayout>
	);
}
