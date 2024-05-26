"use client"

// react
import { useState } from "react";
// nextjs
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input } from "@nextui-org/react";
// external lib
import { Icon } from "@iconify/react"
import toast from "react-hot-toast";
// assets
import BudiluhurJpg from "@/assets/images/budiluhur.jpg"
// services
import { HttpLogin } from "@/lib/services/functions/frontend/login";

export default function LoginPage({ searchParams }: any) {
    const route = useRouter();
    const callbackUrl = searchParams.callbackUrl && searchParams.callbackUrl !== process.env.BASE_URL
        // searchParams.callbackUrl !== "http://localhost:3000/"
        ? searchParams.callbackUrl
        : "/dashboard";
    console.log(callbackUrl);

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isLoading, setIsLoading]       = useState<boolean>(false)
    const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false)
    const [passwordInvalid, setPasswordInvalid] = useState<boolean>(false)

    const hadleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsernameInvalid(false)
        setPasswordInvalid(false)
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        if (username == "") setUsernameInvalid(true)
        if (password == "") setPasswordInvalid(true)
        if (username == "" || password == "") return

        setIsLoading(true);
        const res = await HttpLogin(e.currentTarget, callbackUrl);
        setIsLoading(false);

        if (res.status == true) {
            route.push(callbackUrl);
            e.currentTarget.reset();
        } else {
            if (res.message === "invalid username or password") {
                setUsernameInvalid(true)
                setPasswordInvalid(true) 
            }
            toast.error(res.message);
        }
    };

    return (
        <main className="w-screen h-screen p-10 flex justify-center items-center bg-primary-500">
            <Card className="w-screen max-w-64 bg-primary-300">
                <form onSubmit={hadleSubmit}>
                    <CardHeader className="flex justify-center">
                        <div className="w-20 p-2 bg-white rounded-full">
                            <Image
                                className="w-full"
                                src={BudiluhurJpg.src} 
                            />
                        </div>
                    </CardHeader>

                    <Divider/>

                    <CardBody className="pb-8">
                        <Input 
                            label="Username"
                            name="username"
                            type="text"
                            size="md"
                            radius="sm"
                            color={usernameInvalid ? "danger" : "default"}
                            variant="bordered"
                            isInvalid={usernameInvalid}
                            labelPlacement="outside"
                            className="mb-4 rounded-lg bg-primary-50"
                            onKeyUp={() => setUsernameInvalid(false)}
                        />
                        <Input 
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'} 
                            size="md"
                            radius="sm"
                            color={passwordInvalid ? "danger" : "default"}
                            variant="bordered"
                            isInvalid={passwordInvalid}
                            labelPlacement="outside"
                            className="rounded-lg bg-primary-50"
                            onKeyUp={() => setPasswordInvalid(false)}
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <Icon
                                            icon="mdi:eye" 
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <Icon
                                            icon="mdi:eye-off" 
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            } 
                        />
                    </CardBody>

                    <Divider/>

                    <CardFooter>
                        <Button 
                            type="submit" 
                            disabled={isLoading} 
                            radius="sm" 
                            className="w-full bg-primary-700 text-white">
                                {!isLoading ? (
                                    "Login"
                                ) : (
                                    <Icon icon="line-md:loading-twotone-loop" className="text-2xl" />
                                )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </main>
    )
}
