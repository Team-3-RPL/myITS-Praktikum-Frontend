import Typography from "@/interfaces/components/Typography";
import { Button } from "@/interfaces/components/ui/button";
import MainLayout from "@/interfaces/layouts/main_layout";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
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

					<Typography as="h1" variant="4xl" weight="bold">
						Selamat datang di myITS Praktikum
					</Typography>

					<Link href="/login" className="w-full">
						<Button variant="primaryBlue" className="mt-12">
							Masuk
						</Button>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
}

// "use client";
// import { ENV } from "@/configs/environment";
// import FormInput from "@/interfaces/components/form-input";
// import { Button } from "@/interfaces/components/ui/button";
// import { createCookies } from "@/modules/cookies";
// import { post } from "@/services/api/main/call";
// import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
// import { PATH } from "@/shared/path";
// import type { Inputs } from "@/types/screen_public.types";
// import UseTheme from "@/utils/use_theme";
// import { useRouter } from "next/navigation";
// import React, { Fragment } from "react";
// import { useForm } from "react-hook-form";

// const ScreenPublic = () => {
// 	const router = useRouter();
// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<Inputs>({
// 		defaultValues: {
// 			expiresInMins: 100,
// 			username: "emilys",
// 			password: "emilyspass",
// 		},
// 	});
// 	const [loading, setLoading] = React.useState<boolean>(false);
// 	const onSubmit = handleSubmit(async (data) => {
// 		try {
// 			setLoading(true);
// 			const { Kind, OK, StatusCode } = await post(
// 				MAIN_ENDPOINT.Auth.Login,
// 				data,
// 			);
// 			console.log({ OK, StatusCode });
// 			if (!OK) {
// 				throw new Error();
// 			}
// 			const resp = Kind as { accessToken: string };
// 			await createCookies({
// 				name: ENV.TOKEN_KEY,
// 				data: resp.accessToken,
// 			});
// 			router.push(PATH.PRIVATE);
// 		} catch (error) {
// 			console.log({ error });
// 		}
// 	});
// 	return (
// 		<Fragment>
// 			<div className="h-screen flex justify-center items-center">
// 				<div className="w-full max-w-[540px]">
// 					<form onSubmit={onSubmit}>
// 						<div className="flex justify-between items-center mb-8">
// 							<h1 className="font-semibold text-2xl text-center">
// 								MyITS Praktikum
// 							</h1>
// 							<UseTheme />
// 						</div>
// 						<FormInput
// 							label="Username"
// 							control={control}
// 							name="username"
// 							type="text"
// 							errors={errors}
// 							rules={{ required: true }}
// 						/>
// 						<FormInput
// 							label="Password"
// 							control={control}
// 							name="password"
// 							type="password"
// 							errors={errors}
// 							rules={{ required: true }}
// 						/>
// 						<div className="h-4" />
// 						<Button variant="primaryBlue" disabled={loading} className="w-full">
// 							Submit
// 						</Button>
// 					</form>
// 				</div>
// 			</div>
// 		</Fragment>
// 	);
// };

// export default ScreenPublic;
