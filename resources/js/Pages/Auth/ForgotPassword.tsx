import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useToast } from "@/hooks/use-toast";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const { toast } = useToast();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        try {
            post(route("password.email"), {
                onFinish: () => setData("email", ""),
                onSuccess: () => {
                    toast({
                        description: "Een e-mail is verstuurd.",
                        title: "Succes!",
                    });
                },
                onError: (errors) => {
                    console.error(errors);
                    toast({
                        description: "Er is iets misgegaan.",
                        title: "Oeps!",
                        variant: "destructive",
                    });
                },
            });
        } catch (error) {
            console.error(error);
            toast({
                description: "Er is iets misgegaan.",
                title: "Oeps!",
                variant: "destructive",
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Wachtwoord vergeten" />

            <div className="w-full  flex h-screen justify-center mt-14">
                <div className="max-w-md mt-10 items-center justify-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Wachtwoord vergeten?
                    </h2>
                    <div className="mb-4 text-sm text-muted-foreground">
                        Je wachtwoord vergeten? Geen probleem. Laat ons je
                        e-mailadres weten en we sturen je een e-mail met een
                        link om je wachtwoord opnieuw in te stellen. Waarmee je
                        een nieuw wachtwoord kunt kiezen.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <div className="w-full max-w-md">
                        <form onSubmit={submit}>
                            <InputLabel
                                htmlFor="email"
                                value="E-mailadres"
                                className="mb-3"
                            />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="uw@email.nl"
                                value={data.email}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />

                            <div className="mt-4 flex flex-col  items-center justify-end">
                                <Button
                                    disabled={processing}
                                    className="w-full mb-6"
                                >
                                    Versturen
                                </Button>
                                <Link
                                    href="/login"
                                    className="flex items-center font-bold text-muted-foreground hover:scale-105 transition-all duration-300"
                                >
                                    <ArrowLeft />
                                    Terug naar inloggen
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
